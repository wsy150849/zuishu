<template>
  <div class="ranking">
    <Nav />
    <div class="rank-fram">
      <ul>
        <router-link tag="li" :to="`/ranking/${list._id}`" v-for="list in ranklist" :key="list._id">
          <div class="rank-img">
            <img :src="`http://statics.zhuishushenqi.com${list.cover}`" alt />
          </div>
          <div class="empt"></div>
          <p>{{list.title}}</p>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
import Nav from "../views/Nav";
export default {
  data() {
    return {
      ranklist: []
    };
  },
  components: {
    Nav
  },
  methods: {
    addRank() {
      // http://api.zhuishushenqi.com/ranking
      this.$axios.get("/api/ranking").then(res => {
        // console.log(res.data.rankings);
        this.ranklist = res.data.rankings;
      });
    }
  },
  mounted() {
    this.addRank();
  }
};
</script>
<style lang="scss" scoped>
.ranking {
  width: 100%;
  height: 100vh;
  .rank-fram {
    width: 100%;
    height: auto;
    padding: 20px 20px 0 20px;
    ul {
      width: 100%;
      height: auto;
      //   background-color: #021231;
      li {
        width: 100%;
        height: 100px;
        border: 1px solid #dedede;
        margin-bottom: 20px;
        border-radius: 20px;
        position: relative;
        overflow: hidden;
        .empt{
            position: absolute;
            width: 70%;
            height: 200%;
            background-color: rgb(217, 245, 242);
            margin-left: 30%;
            top: -30px;
            z-index: -999;
            transform: rotate(20deg);
        }
        p{
            float: right;
            width: 50%;
            height: 100%;
            line-height: 100px;
            text-align: center;
        }
      }
    }
  }
}
.rank-img{
    width: 30%;
    height: 100%;
    // background-color: rgb(105, 100, 100);
    float: left;
    text-align: center;
    line-height: 135px;
    img{
        width: 50px;
        height: 50px;
    }
}
</style>