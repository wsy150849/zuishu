<template>
  <div class="bookslist">
    <Nav v-show="inversioFlag" />
    <!-- 编辑 -->
    <div
      class="edit"
      :class="inversioFlag===false?'fixed':''"
      @click="inversion"
    >{{ inversioFlag?'编辑':'完成'}}</div>

    <ul class="bookshelf">
      <li v-for="(item,i) in bookarr" :key="i">
        <div class="bookimg" @click="getlist(item.id)">
          <img :src="`http://statics.zhuishushenqi.com${item.cover}`" alt />
        </div>
        <p>{{item.title}}</p>
        <div @click="deleteBook(i)" :class="inversioFlag?'':'delate'">
          <div class="circular" :class="bookarr[i].bool?'active':''"></div>
        </div>
      </li>
    </ul>

    <!-- 删除和全选 -->
    <div v-show="!inversioFlag" class="editBtn">
      <button @click="AllElection">全选</button>
      <button class="delete-btn" @click="del">删除</button>
    </div>
  </div>
</template>
<script>
import Nav from "../views/Nav";
export default {
  data() {
    return {
      inversioFlag: true,
      linklist: [],
      bookarr: [],
      id: "",
      title: "",
      cover: "",
      chapters: []
    };
  },
  components: {
    Nav
  },
  methods: {
    inversion() {
      this.inversioFlag = !this.inversioFlag;
    },
    deleteBook(index) {
      this.bookarr[index].bool = !this.bookarr[index].bool;
    },
    getlist(index) {
      this.$axios.get(`/api/mix-atoc/${index}?view=chapters`).then(res => {
        // console.log(res.data.mixToc.chapters);
        this.linklist = res.data.mixToc.chapters;
        let Idarr = JSON.parse(window.localStorage.getItem("bookshelf"));
        for (var i = 0; i < Idarr.length; i++) {
          if (Idarr[i].id === index) {
            console.log("id", index);
            this.$router.push({
              path: "/read/",
              query: {
                link: this.linklist[Idarr[i].chapter].link,
                id: index
              }
            });
          }
        }
      });
    },
    getBook() {
      if (window.localStorage.getItem("bookshelf")) {
        let Idarr = JSON.parse(window.localStorage.getItem("bookshelf")); //http://api.zhuishushenqi.com/book/{bookid}
        let bookdata = [];
        for (let i = 0; i < Idarr.length; i++) {
          this.$axios.get(`/api/book/${Idarr[i].id}`).then(res => {
            // this.id = res.data._id;
            // this.title = res.data.title;
            // this.cover = res.data.cover;
            bookdata.push({
              id: res.data._id,
              title: res.data.title,
              cover: res.data.cover,
              chapter: Idarr[i].chapter,
              bool: false
            });
          }); //http://api.zhuishushenqi.com/mix-atoc/{bookid}?view=chapters
          this.$axios
            .get(`/api/mix-atoc/${Idarr[i].id}?view=chapters`)
            .then(res => {
              // console.log(res.data.mixToc.chapters[0]);
              // console.log(res)
              this.chapters.push(res.data.mixToc.chapters[0]);
              // console.log(this.chapters)
            });
          // bookdata.push({
          //   id: this.id,
          //   title: this.title,
          //   cover: this.cover,
          //   chapters: this.chapters,
          //   bool:false
          // });
          // console.log(bookdata);
          this.bookarr = bookdata;
        }
      } else {
        console.log("还没有添加书");
      }
    },
    del() {
      for (const x in this.bookarr) {
        if (this.bookarr[x].bool) {
          this.bookarr.splice(x, 1);
          console.log("b", this.bookarr);
        }
      }
      window.localStorage.setItem("bookshelf", JSON.stringify(this.bookarr));
    },
    AllElection() {
      for (const y in this.bookarr) {
        this.bookarr[y].bool = true;
      }
    }
  },
  mounted() {
    this.getBook();
  }
};
</script>
<style lang="scss" scoped>
.bookslist {
  width: 100%;
  height: 100vh;
  .bookshelf {
    width: 100%;
    height: 100%;
    padding-bottom: 20px;
    // background-color: #e0e;
    li {
      width: 33.33%;
      height: 150px;
      // background-color: #ccc;
      float: left;
      margin-top: 20px;
      position: relative;
      .bookimg {
        width: 100%;
        height: 120px;
        // background-color: #fff;
        text-align: center;
        img {
          height: 120px;
          width: auto;
        }
      }
      p {
        padding: 10px 10px 0 10px;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .delate {
        width: 80%;
        height: 80%;
        position: absolute;
        top: 0;
        left: 10%;
        background-color: #606060;
        opacity: 0.7;
        .circular {
          width: 20px;
          height: 20px;
          border: black 1px solid;
          border-radius: 50%;
          float: right;
          opacity: 1;
        }
      }
    }
  }
}
.edit {
  width: 100%;
  height: 60px;
  padding: 20px;
  font-size: 20px;
  text-align: center;
  background-color: #d7d7d7;
}

//btn样式
.fixed {
  // position: fixed;
  top: 0;
}
.editBtn {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  box-shadow: 0px 1px 5px 0px black;
  button {
    width: 50%;
    height: 100%;
    padding: 0;
    margin: 0;
    border: 0;
    font-size: 20px;
    line-height: 100%;
    text-align: center;
  }
  .delete-btn {
    color: brown;
  }
}

//
.active {
  background-color: red;
}
</style>