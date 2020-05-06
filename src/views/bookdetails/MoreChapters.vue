<template>
  <div class="more">
    <bookhead />
    <div class="comment" v-for="items in commentlist" :key="items._id">
      <div class="comment_author">
        <span class="comment_imgs">
            <img :src="`http://statics.zhuishushenqi.com${items.author.avatar}`" alt="">
        </span>
        <span class="comment_nickname">{{items.author.nickname}}</span>
        <span class="comment_text">{{items.title}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import bookhead from "@/components/head.vue";
//评论接口http://api.zhuishushenqi.com/post/review/by-book?
// book=5816b415b06d1d32157790b1&sort=updated&start=0&limit=20
export default {
  data() {
    return {
      commentlist: []
    };
  },
  components: {
    bookhead
  },
  methods: {
    getMoreChapters() {
      this.$axios
        .get(
          `/api/post/review/by-book?book=${this.$route.query.id}&sort=updated&start=0&limit=20`
        )
        .then(res => {
          this.commentlist = res.data.reviews;
        });
    }
  },
  mounted() {
    this.getMoreChapters();
  }
};
</script>
<style lang="scss" scoped>
.more {
  width: 100%;
  height: 100vh;
  .comment {
    width: 100%;
    height: auto;
    border-bottom: solid 1px #ccc;
    .comment_author {
      width: 100%;
      height: 80px;
      border-top: solid 1px #ccc;
      padding: 20px 0 0 16px;
      .comment_imgs{
        //   width: 20px;
        //   height: 20px;
        //   background-color: #4354;
          img{
              width: 20px;
              height: 20px;
              vertical-align:top;
              border-radius: 50%;
          }
      }
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
</style>