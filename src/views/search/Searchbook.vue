<template>
  <div class="search-book">
    <bookhead :title="this.title" />
    <!-- 搜索框 -->
    <div class="search_ipt">
      <input v-model="text" type="search" placeholder="请输入您想要搜索的书名" />
      <div class="svg" @click="GetSearch">
        <span name="Search" class="icon-Search"></span>
      </div>
    </div>
    <!-- 显示栏 -->
    <ul class="search_list">
      <li v-for="(item,i) in searchbook" :key="i">
        <router-link :to="`/details/${item._id}`" class="list_link">
          <div class="list_img">
            <img
              :src="`http://statics.zhuishushenqi.com${item.cover}`"
              :key="item.id"
              class="u-imgAuto"
            />
          </div>
          <div class="list_info">
            <p class="list_title">{{ item.title }}</p>
            <p class="list_author">{{ item.author }}</p>
            <p class="list_shortIntro">{{ item.shortIntro }}</p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import bookhead from "@/components/head.vue";
export default {
  components: {
    bookhead
  },
  data() {
    return {
      title: "搜索",
      text: "",
      searchbook: []
    };
  },
  methods: {
    GetSearch() {
      this.$axios.get(`/api/book/fuzzy-search?query=${this.text}`).then(res => {
        console.log(res.data.books);
        this.searchbook = res.data.books;
      });
    }
  },
  mounted() {
    // this.addSearchBook();
  }
};
</script>
<style lang="scss" scoped>
.search-book {
  width: 100%;
  height: 100vh;
}
.search_ipt {
  width: 100%;
  height: 40px;
  padding: 10px 10px 0 10px;
  position: relative;
  input {
    width: 100%;
    height: 100%;
    border: 0;
    padding: 0;
    outline: none;
    font-size: 20px;
    text-indent: 12px;
    background-color: #eee;
    border-radius: 15px;
  }
  input::-webkit-search-cancel-button {
    display: none;
  }
  .svg {
    width: 30px;
    height: 30px;
    font-size: 20px;
    position: absolute;
    top: 10px;
    right: 20px;
    // background-color: #eee;
    color: #000;
    span {
      width: 100%;
      height: 100%;
      display: block;
      line-height: 30px;
      text-align: center;
    }
  }
}
.search_list {
  width: 100%;
  height: auto;
  margin-top: 10px;
  padding: 10px;
  li {
    width: 100%;
    height: 150px;
    margin-bottom: 10px;
    .list_link {
      width: 100%;
      height: 100%;
      display: block;
      display: flex;
      text-decoration: none;
      color: #000;
      .list_img {
        height: 100%;
        width: 105px;
        .u-imgAuto {
          width: auto;
          max-width: 100%;
          height: 100%;
          vertical-align: middle;
        }
      }
      .list_info {
        flex: 1;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        padding: 6px;
        line-height: 24px;
        .list_title {
          font-size: 18px;
          font-weight: 700;
        }
        .list_shortIntro {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
        }
      }
    }
  }
}
</style>