<template>
  <div class="detail">
    <bookhead :title="this.title" />
    <div class="book_head">
      <div class="book_img">
        <img
          :src="`http://statics.zhuishushenqi.com${this.detailstext.cover}`"
          :key="this.detailstext.id"
          alt
        />
      </div>
      <div class="book_title">
        <p class="book_name">{{this.detailstext.title}}</p>
        <p class="book_author">{{this.detailstext.author}}</p>
        <p>类型:{{this.detailstext.majorCate}}</p>
        <p>字数:{{this.detailstext.wordCount}}</p>
      </div>
    </div>
    <!-- 书籍简介 -->
    <div class="book_frame">
      <p class="lastChapter" @click="finalChapter">
        最新章节:
        <span>{{ this.detailstext.lastChapter }}</span>
      </p>
      <div class="book_longIntro">
        <p>{{ this.detailstext.longIntro }}</p>
      </div>
    </div>
    <!-- 目录 http://api.zhuishushenqi.com/mix-atoc/{bookid}?view=chapters -->
    <router-link tag="a" class="catalog" :to="`/chapter/${this.id}`">
      <p class="frame_title">目录</p>
      <span>浏览目录</span>
    </router-link>
    <!-- 书友评论 -->
    <div class="book_comment">
      <span class="comment_title" @click="MoreChapters">
        <h3 class="comment_title_text">书友评论</h3>
        <span class="icon-Class More-chapters"></span>
      </span>
      <div class="comment" v-for="items in comment" :key="items._id">
        <div class="comment_author">
          <span class="icon-Mine comment_img"></span>
          <span class="comment_nickname">{{items.author.nickname}}</span>
          <span class="comment_text">{{items.title}}</span>
        </div>
      </div>
    </div>
    <!-- 底部按钮 -->
    <div class="bottom">
      <button class="add" @click="localSet">{{isAddShelf?'已添加':'加入书架'}}</button>
      <button class="reade" @click="addreadbook">立即阅读</button>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import bookhead from "@/components/head.vue";
export default {
  data() {
    return {
      id: "",
      detailstext: "",
      title: "",
      comment: [],
      chapterlist: [],
      isAddShelf: false,
      i: 0
    };
  },
  components: {
    bookhead
  },
  methods: {
    booksdetails() {
      this.$axios.get(`/api/book/${this.id}`).then(res => {
        // console.log(res.data);
        this.detailstext = res.data;
        this.title = this.detailstext.title;
      });
      //评论接口http://api.zhuishushenqi.com/post/review/by-book?
      // book=5816b415b06d1d32157790b1&sort=updated&start=0&limit=20
      this.$axios
        .get(
          `/api/post/review/by-book?book=${this.id}&sort=updated&start=0&limit=20`
        )
        .then(res => {
          this.comment = res.data.reviews.splice(0, 3);
        });
      // 获取第一章
      this.$axios.get(`/api/mix-atoc/${this.id}?view=chapters`).then(res => {
        this.chapterlist = res.data.mixToc.chapters;
      });
    },
    finalChapter() {
      this.$router.push({
        path: "/read/",
        query: {
          link: this.chapterlist[this.chapterlist.length- 1].link,
          id: this.id
        }
      });
    },
    addreadbook() {
      if (this.isAddShelf) {
        let Idarr = JSON.parse(window.localStorage.getItem("bookshelf"));
        for (var i = 0; i < Idarr.length; i++) {
          if (Idarr[i].id === this.$route.params.id) {
            this.$router.push({
              path: "/read/",
              query: {
                link: this.chapterlist[Idarr[i].chapter].link,
                id: Idarr[i].id
              }
            });
            window.localStorage.setItem("bookshelf", JSON.stringify(Idarr));
          }
        }
      } else {
        this.$router.push({
          path: "/read/",
          query: {
            link: this.chapterlist[this.i++].link,
            id: this.$route.params.id
          }
        });
      }
    },
    localSet() {
      if (this.isAddShelf) {
        alert("已经加入了书架");
      } else {
        if (window.localStorage.getItem("bookshelf")) {
          let Idarr = JSON.parse(window.localStorage.getItem("bookshelf"));
          Idarr.push({
            id: this.$route.params.id,
            chapter: 0
          });
          window.localStorage.setItem("bookshelf", JSON.stringify(Idarr));
        } else {
          window.localStorage.setItem(
            "bookshelf",
            JSON.stringify([{ id: this.$route.params.id, chapter: 0 }])
          );
        }
        this.isAddShelf = true;
      }
    },
    MoreChapters(){
      this.$router.push({
          path: "/morechapters/",
          query: {
            id: this.$route.params.id
          }
        });
    },
    getAll() {
      if (window.localStorage.getItem("bookshelf")) {
        let Idarr = JSON.parse(window.localStorage.getItem("bookshelf"));
        for (let i = 0; i < Idarr.length; i++) {
          if (Idarr[i].id === this.$route.params.id) {
            this.isAddShelf = true;
            break;
          }
        }
      }
    }
  },
  created() {
    this.getAll();
  },
  mounted() {
    this.id = this.$route.params.id;
    this.booksdetails();
  }
};
</script>
<style lang="scss" scoped>
.detail {
  height: 100vh;
  background: #fafafa;
  .id {
    width: 100%;
    height: 20px;
    background-color: blue;
  }
  .book_head {
    width: 100%;
    height: 30vh;
    padding: 16px;
    background: url("./img/headbg.jpg") no-repeat;
    background-size: cover;
    .book_img {
      height: 100%;
      width: auto;
      float: left;
      // background-color: violet;
      img {
        height: 100%;
      }
    }
    .book_title {
      float: right;
      // background-color: pink;
      width: 50%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      height: 100%;
      text-align: right;
      .book_name {
        font-weight: 700;
        font-size: 1.5rem;
        margin: 1rem 0;
      }
      p {
        height: 1.5rem;
        line-height: 1.5rem;
      }
    }
  }
  .book_frame {
    height: auto;
    width: 100%;
    // display: inline;
    padding: 1.2rem;
    .lastChapter {
      width: 100%;
      height: auto;
      margin: 0.2rem 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      background-color: #fff;
      span {
        color: #3dbafd;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .book_longIntro {
      text-indent: 2em;
      font-family: \5fae\8f6f\96c5\9ed1;
      background-color: #fff;
      p {
        line-height: 18px;
        overflow: hidden;
        // white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
.catalog {
  display: block;
  height: 30px;
  line-height: 20px;
  overflow: hidden;
  margin: 10px;
  padding: 0 10px;
  background-color: #fff;
  .frame_title {
    float: left;
    font-size: 20px;
    line-height: 30px;
    color: #9a9a9a;
    // position: relative;
  }
  .frame_title::before {
    content: "";
    width: 3px;
    height: 30px;
    display: block;
    position: absolute;
    left: 10px;
    background-color: #00c98d;
  }
  span {
    display: block;
    height: 30px;
    line-height: 30px;
    float: right;
    color: #9a9a9a;
  }
}
.book_comment {
  width: 100%;
  height: auto;
  margin-bottom: 50px;
  .comment_title {
    width: 100%;
    display: inline-block;
    // background-color: red;
    padding: 16px 0;
    h3 {
      margin-left: 20px;
      float: left;
    }
    .More-chapters{
      margin-right: 20px;
      float: right;
    }
    .comment_title_text::before {
      content: "";
      width: 3px;
      height: 16px;
      display: block;
      position: absolute;
      left: 10px;
      background-color: #00c98d;
    }
  }
  .comment {
    width: 100%;
    height: auto;
    border-bottom: solid 1px #ccc;
    .comment_author {
      width: 100%;
      height: 80px;
      border-top: solid 1px #ccc;
      padding: 20px 0 0 16px;
      .comment_nickname {
        margin-left: 10px;
      }
      .comment_text {
        display: block;
        margin: 10px 0 0 30px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
.bottom {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  background-color: #9fc;
  button {
    width: 50%;
    font-size: 20px;
    height: 100%;
    border: 0;
    padding: 0;
    margin: 0;
  }
  .add {
    background-color: #fff;
  }
  .reade {
    background-color: #3dbafd;
    color: #fff;
  }
}
</style>