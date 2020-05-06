<template>
  <div class="category-block">
    <!-- 女生分类 -->
    <div class="title">女生分类</div>
    <ul class="category-list" v-for="books in twoclassify" :key="books.index">
      <router-link tag="li" :to="`/classifyinfo/${books.major}/${books.mins}/female`" class="list">
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
      twoclassify:[],
      arr:[],
      arr2:[]
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
        // console.log('二级分类',res.data.female)
        this.twoclassify=res.data.female.splice(0,2);
        this.arr=res.data.female.splice(1,3);
        this.arr2=res.data.female.splice(3,2);
        this.twoclassify=this.twoclassify.concat(this.arr,this.arr2)
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
  padding-left:2px ;
  width: 40%;
  height: 80px;
  // background-color: blueviolet;
  float: left;
  margin: 5%;
  box-sizing: border-box;
  border: 1px solid #dedede;
  span {
    // display: block;
    width: 100%;
    height: auto;
    text-align: center;
    padding-top: 2px;
  }
  .title-list {
    display: block;
    font-weight: 600;
  }
}
</style>