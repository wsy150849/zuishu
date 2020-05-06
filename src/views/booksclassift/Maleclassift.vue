<template>
  <div class="category-block">
    <!-- 男生分类 -->
    <div class="title">男生分类</div>
    <ul class="category-list" v-for="books in twoclassify" :key="books.index">
      <router-link tag="li" :to="`/classifyinfo/${books.major}/${books.mins}/male`" class="list">
        <span class="title-list">{{books.major}}</span>
        <span v-for="mins in books.mins" :key="mins">{{`(${mins})`}}</span>
      </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      classify: {},
      twoclassify:[]
    };
  },
  components: {
    // Nav
  },
  methods: {
    addClassify() {
      this.$axios.get("/api/cats/lv2/statistics").then(res => {
        // console.log(res.data);
        this.classify = res.data;
      });
      this.$axios.get('/api/cats/lv2').then(res=>{
        // console.log('二级分类',res.data.male)
        this.twoclassify=res.data.male.splice(0,13)
      })
    }
  },
  mounted() {
    this.addClassify();
  }
};
</script>
<style lang="scss" scopet>
.category {
  width: 100%;
  height: 100vh;
  .category-block {
    width: 100%;
    height: auto;
    overflow: hidden;
  }
}
.title {
  width: 100%;
  height: auto;
  padding: 13px 0 10px 16px;
  background-color: #ea36;
  font-weight: 700;
}
.list {
  padding-left: 2px;
  width: 40%;
  height: 80px;
  // background-color: blueviolet;
  float: left;
  margin: 5%;
  line-height: 18px;
  box-sizing: border-box;
  border: 1px solid #dedede;
  span {
    // display: block;
    width: 100%;
    height: auto;
    text-align: center;
    font-size: 10px;
    padding-top: 2px;
  }
  .title-list {
    display: block;
    font-weight: 600;
    font-size: 16px;
  }
}
</style>