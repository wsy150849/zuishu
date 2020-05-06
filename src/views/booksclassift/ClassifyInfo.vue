<template>
  <div class="twoclassify">
    <bookhead :title="this.major" />
    <div class="minor-nav">
      <p v-for="item in mins" :key="item.index" @click="addroute(item)">{{item}}</p>
    </div>
    <div class="books-classify" v-for="book in books" :key="book._id">
      <router-link tag="div" :to="`/details/${book._id}`" class="books-classifttwo">
        <div class="books-img">
          <img :src="`http://statics.zhuishushenqi.com${book.cover}`" :key="book.id" alt />
        </div>
        <div class="books-text">
          <p class="book-title">{{book.title}}</p>
          <p class="book-author">{{book.author}}</p>
          <p class="book-shortIntro">{{book.shortIntro}}</p>
          <div class="books-data">
            <span class="book-late">{{book.latelyFollower}}</span>
            <span>|</span>
            <span class="book-rete">{{`${book.retentionRatio}%`}}</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import bookhead from "@/components/head.vue";
// http://api.zhuishushenqi.com/book/by-categories?gender=male&type=hot&major=玄幻&minor=东方玄幻&start=0&limit=20
export default {
  data() {
    return {
      major: "",
      mins: [],
      books: [],
      gender: ""
    };
  },
  components: {
    bookhead
  },
  methods: {
    CutOutstr() {
      this.mins = this.mins.split(",");
    },
    addroute(item = undefined?'没有数据':this.mins[0]) {
      this.$axios
        .get(
          `/api/book/by-categories?gender=${this.gender}&type=hot&major=${this.major}&minor=${item}&start=0&limit=20`
        )
        .then(res => {
          // console.log(res.data.books)
          this.books = res.data.books;
        });
    }
  },
  mounted() {
    this.major = this.$route.params.major;
    this.mins = this.$route.params.mins;
    this.gender = this.$route.params.gender;
    this.CutOutstr();
    // console.log(this.mins);
    this.addroute();
  }
};
</script>
<style lang="scss" scopet>
.twoclassify {
  width: 100%;
  height: auto;
  .minor-nav {
    width: 100%;
    height: auto;
    padding: 10px;
    overflow: hidden;
    p {
      float: left;
      padding: 5px 10px;
    }
  }
}
.books-classify {
  width: 100%;
  height: auto;
  .books-classifttwo {
    width: 100%;
    height: auto;
    padding: 20px 10px 0 10px;
    overflow: hidden;
    .books-img {
      width: 25%;
      height: 100%;
      float: left;
      img {
        width: 100%;
        height: auto;
      }
    }
    .books-text {
      margin-left: 30%;
      width: auto;
      height: 100%;
      .book-title {
        font-size: 20px;
        font-weight: bold;
      }
      .book-author {
        margin-top: 5px;
        color: #9a9a9a;
      }
      .book-shortIntro {
        margin-top: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 40px;
        line-height: 20px;
        color: #9a9a9a;
      }
    }
  }
}
.books-data {
  margin-top: 5px;
  width: 100%;
  .book-late {
    margin-right: 10px;
  }
  span {
    color: brown;
    margin-right: 10px;
  }
  .book-rete::after {
    content: "留存";
    color: black;
  }
}
</style>