<template>
  <div class="read">
    <bookhead v-if="this.show" :title="this.title" />
    <div @click="chagechaptershow" ref="mian" class="mian">
      <div class="left"></div>
      <p @click="addshow">{{this.chapter}}</p>
      <div class="right"></div>
    </div>
    <div v-show="this.show" class="footer">
      <ul class="change-chapter">
        <li @click="lastChapter">上一章</li>
        <li @click="nextChapter">下一章</li>
      </ul>
      <div class="change-set-up" v-show="this.setUpBool">
        <div class="changeFontSize">
          <button class="reduce" @click="reducefontsize">-</button>
          <button class="add" @click="addfontsize">+</button>
        </div>
        <div class="changebgc">
          <span>皮肤</span>
          <ul>
            <li>
              <span class="bgc-a" @click="setbgc(`#f4f4f4`)"></span>
            </li>
            <li>
              <span class="bgc-b" @click="setbgc(`#f5dce4`)"></span>
            </li>
            <li>
              <span class="bgc-c" @click="setbgc(`#d5efd2`)"></span>
            </li>
            <li>
              <span class="bgc-d" @click="setbgc(`#14be7d`)"></span>
            </li>
            <li>
              <span class="bgc-e" @click="setbgc(`#ccc`)"></span>
            </li>
          </ul>
        </div>
      </div>
      <ul class="set-up">
        <li @click="addchaptershow">目录</li>
        <li @click="addbool">{{this.bool?'夜间':'白天'}}</li>
        <li @click="addSetUpBool">设置</li>
      </ul>
    </div>
    <!-- 目录 -->
    <div v-if="this.chaptershow" class="book-chapter">
      <span>章节目录</span>
      <ul v-for="(item,i) in chapterlist" :key="i">
        <li @click="routepush(item.link)">{{ item.title }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
//http://chapter2.zhuishushenqi.com/chapter/{link}
//http://book.xbiquge.com/getBooks.aspx?method=content  => link
//&bookId=856513&chapterFile=U_856513_201909101121439669_9842_2.txt => &bookId=bookId&chapterFile=chapterFile
import bookhead from "@/components/head.vue";
export default {
  data() {
    return {
      id: "",
      bool: true,
      show: false,
      chaptershow: false,
      title: "",
      chapter: "",
      chapterlist: [],
      i: 0,
      fontSize: 1,
      setUpBool:false
    };
  },
  components: {
    bookhead
  },
  methods: {
    lastChapter() {
      let Idarr = JSON.parse(window.localStorage.getItem("bookshelf"));
      for (var i = 0; i < Idarr.length; i++) {
        if (Idarr[i].id === this.$route.query.id) {
          // console.log("id", this.$route.query.id);
          if (Idarr[i].chapter > 0) {
            Idarr[i].chapter--;
            this.$router.replace({
              path: "/read/",
              query: {
                link: this.chapterlist[Idarr[i].chapter].link,
                id: this.$route.query.id
              }
            });
          } else {
            Idarr[i].chapter = 0;
            console.log(Idarr[i].chapter);

            alert("已经是第一章了");
            this.$router.replace({
              path: "/read/",
              query: {
                link: this.chapterlist[Idarr[i].chapter].link,
                id: this.$route.query.id
              }
            });
          }
          window.localStorage.setItem("bookshelf", JSON.stringify(Idarr));
        }
      }
      if (this.i > 0) {
        this.$router.replace({
          path: "/read/",
          query: {
            link: this.chapterlist[(this.i -= 1)].link,
            id: this.$route.query.id
          }
        });
      } else {
        alert("已经是第一章了");
      }
    },
    nextChapter() {
      let Idarr = JSON.parse(window.localStorage.getItem("bookshelf"));
      for (var i = 0; i < Idarr.length; i++) {
        if (Idarr[i].id === this.$route.query.id) {
          if (Idarr[i].chapter < this.chapterlist.length) {
            Idarr[i].chapter++;
          } else {
            alert("已经是最后一章了");
          }
          this.$router.replace({
            path: "/read/",
            query: {
              link: this.chapterlist[Idarr[i].chapter].link,
              id: this.$route.query.id
            }
          });
          window.localStorage.setItem("bookshelf", JSON.stringify(Idarr));
        } else {
          // this.$router.push({
          //   path: "/read/",
          //   query: {
          //     link: this.chapterlist[this.i++].link,
          //     id: this.$route.query.id
          //   }
          // });
        }
      }
      this.$router.replace({
        path: "/read/",
        query: {
          link: this.chapterlist[(this.i += 1)].link,
          id: this.$route.query.id
        }
      });
    },
    addRead() {
      const url = `/chapter/${this.$route.query.link}`;
      this.$axios
        .get(url)
        .then(res => {
          this.title = res.data.chapter.title;
          this.chapter = res.data.chapter.body;
        })
        .catch(err => {
          console.log(err);
        });
      this.$axios
        .get(`/api/mix-atoc/${this.$route.query.id}?view=chapters`)
        .then(res => {
          this.chapterlist = res.data.mixToc.chapters;
        });
    },
    addbool() {
      this.bool = !this.bool;
      if (this.bool) {
        this.$refs.mian.style.backgroundColor = "#fff";
        this.$refs.mian.style.color = "black";
      } else {
        this.$refs.mian.style.color = "#fff";
        this.$refs.mian.style.backgroundColor = "black";
      }
    },
    reducefontsize() {
      if (this.fontSize > -4) {
        this.fontSize--;
        this.$refs.mian.style.fontSize = `${16 + this.fontSize}px`;
      }else{
        alert('已经是最小字体')
      }
    },
    addfontsize() {
      if (this.fontSize < 4) {
        this.fontSize++;
        this.$refs.mian.style.fontSize = `${16 + this.fontSize}px`;
      }else{
        alert('已经是最大字体')
      }
    },
    setbgc(index) {
      this.$refs.mian.style.backgroundColor = `${index}`;
    },
    addSetUpBool(){
      this.setUpBool=!this.setUpBool
    },
    addshow() {
      this.show = !this.show;
    },
    addchaptershow() {
      this.chaptershow = !this.chaptershow;
    },
    chagechaptershow() {
      if (this.chaptershow) {
        this.chaptershow = !this.chaptershow;
      }
    },
    routepush(index) {
      if (index === this.$route.query.link) {
        alert("已经在当前章节了");
      } else {
        this.$router.replace({
          path: "/read/",
          query: {
            link: index,
            id: this.$route.query.id
          }
        });
      }
    }
  },
  mounted() {
    this.addRead();
    this.id = this.$route.query.id;
  }
};
</script>
<style lang="scss" scoped>
.read {
  width: 100%;
  height: 100vh;
}
//mian
.mian {
  width: 100%;
  height: 100%;
  //   background-color: #ccc;
  position: relative;
  .left {
    position: absolute;
    width: 30%;
    height: 100%;
    //   background-color: #eee;
  }
  p {
    width: 100%;
    height: 100%;
    padding: 20px;
    text-indent: 2em;
  }
  .right {
    position: absolute;
    top: 0;
    right: 0;
    width: 30%;
    height: 100%;
    //   background-color: #eee;
  }
}

//footer
.change-set-up {
  width: 100%;
  height: 100px;
  background-color: #333;
  border: 1px solid #eee;
  box-sizing: border-box;
  .changeFontSize {
    width: 100%;
    height: 50px;

    button {
      border: 1px solid #fff;
      padding: 0;
      margin: 0;
      width: 48px;
      height: 23px;
      border-radius: 12.5px;
      background-color: #333;
      color: blanchedalmond;
    }
    .reduce {
      margin: 12.5px 0 12.5px 20%;
      float: left;
    }
    .add {
      margin: 12.5px 20% 12.5px 0;
      float: right;
    }
  }
  .changebgc {
    width: 100%;
    height: 50px;
    display: flex;
    color: blanchedalmond;
    span {
      flex: 1;
      height: 50px;
      text-align: center;
      line-height: 50px;
    }
    ul {
      flex: 4;
      // background-color: #fff;
      display: flex;
      li {
        flex: 1;
        height: 100%;
        text-align: center;
        padding: 5px;
        span {
          width: 40px;
          height: 40px;
          display: inline-block;
          // background-color: pink;
          border: 1px solid #fff;
          border-radius: 50%;
          box-sizing: border-box;
        }
      }
    }
  }
}
.bgc-a {
  background-color: #f4f4f4;
}
.bgc-b {
  background-color: #f5dce4;
}
.bgc-c {
  background-color: #d5efd2;
}
.bgc-d {
  background-color: #14be7d;
}
.bgc-e {
  background-color: #ccc;
}
.book-chapter {
  width: 70%;
  height: 100%;
  background-color: #fff;
  position: fixed;
  top: 0;
  z-index: 999;
  //   bottom: 100px;
  left: 0;
  overflow-y: auto;
  span {
    width: 100%;
    height: 30px;
    border-bottom: 1px solid #ccc;
    text-align: center;
    line-height: 30px;
    display: block;
  }
  ul {
    width: 100%;
    height: 30px;
    padding: 0 20px;
    li {
      width: 100%;
      height: 30px;
      border-bottom: 1px solid #ccc;
      line-height: 30px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
.footer {
  width: 100%;
  height: auto;
  background-color: #333;
  position: fixed;
  bottom: 0;
  .change-chapter {
    width: 100%;
    height: 50px;
    li {
      width: 50%;
      height: 50px;
      float: left;
      font-size: 20px;
      color: blanchedalmond;
      line-height: 50px;
      text-align: center;
    }
  }
  .set-up {
    width: 100%;
    height: 50px;
    li {
      width: 33.333333%;
      height: 50px;
      float: left;
      font-size: 20px;
      color: blanchedalmond;
      line-height: 50px;
      text-align: center;
    }
  }
}
</style>