<template>
  <div class="home">
    <Nav></Nav>
    <div class="Classic">
      <header>
        <h3>女生美文</h3>
      </header>

      <ul>
        <li v-for="books in ranking" :key="books.id">
          <!-- <router-link tag="div" to="/details"> -->
          <router-link tag="div" :to="`/details/${books._id}`">
            <img :src="`http://statics.zhuishushenqi.com${books.cover}`" :key="books.id" alt />
            <p>{{books.title}}</p>
            <p>{{books.author}}</p>
          </router-link>
          <!-- </router-link> -->
        </li>
      </ul>
    </div>
    <div class="hot-text">
      <header>
        <h3>男生热文</h3>
      </header>
      <ul>
        <li v-for="books in female" :key="books.id">
          <router-link tag="div" :to="`/details/${books._id}`">
            <img :src="`http://statics.zhuishushenqi.com${books.cover}`" :key="books.id" alt />
            <p>{{books.title}}</p>
            <p>{{books.author}}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
// import axios from 'axios'
import Nav from "../views/Nav";
export default {
  data() {
    return {
      female: [],
      ranking: [],
      title: "",
      id: "54d43437d47d13ff21cad58b"
    };
  },
  components: {
    Nav
  },
  methods: {
    addbooks() {
      this.$axios.get(`/api/ranking/${this.id}`).then(res => {
        this.ranking = res.data.ranking.books.splice(1, 4);
        // .data.ranking.books.slice(0,10)
        // console.log(this.ranking);
      });
      this.$axios.get("/api/ranking/54d42d92321052167dfb75e3").then(res => {
        this.female = res.data.ranking.books.splice(0, 8);
        // console.log(this.female);
      });
    }
  },
  mounted() {
    this.addbooks();
  },
  created() {
    
  }
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: auto;
  // background-color: red;
}
.Classic header,
.hot-text header {
  padding: 16px 0 0;
  h3 {
    padding: 0 0 0 16px;
    border-left: 3px solid #00c98d;
  }
}
.Classic ul {
  height: 200px;
  padding: 16px 0 16px 16px;
  // border-top:1px solid #ccc ;
  border-bottom: 1px solid #ccc;
}
.hot-text ul {
  height: 400px;
  padding: 16px 0 16px 8px;
  // border-top:1px solid #ccc ;
  border-bottom: 1px solid #ccc;
  li {
    float: left;
    width: 25%;
    height: 50%;
    color: black;
    padding-right: 16px;
  }
}
li {
  float: left;
  width: 25%;
  height: 100%;
  color: black;
  padding-right: 16px;
  text-align: center;
  div {
    width: 100%;
    height: 100%;
    img {
      width: auto;
      height: 60%;
      background-color: blue;
    }
    p {
      font-size: 12px;
      color: #333;
      margin: 8px 0 2px;
    }
  }
}
</style>