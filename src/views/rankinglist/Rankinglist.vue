<template>
  <div>
    <bookhead :title="this.title" />
    <div class="books-classify" v-for="book in rankings" :key="book._id">
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
export default {
  data() {
    return {
      rankId: "",
      rankings: {},
      title: ""
    };
  },
  components: {
    bookhead
  },
  methods: {
    addRankbook() {
      this.$axios.get(`/api/ranking/${this.rankId}`).then(res => {
        // console.log(res.data.ranking.books);
        this.rankings = res.data.ranking.books;
        this.title = res.data.ranking.title;
      });
    }
  },
  mounted() {
    this.rankId = this.$route.params.rankingId;
    this.addRankbook();
  }
};
</script>