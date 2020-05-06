<template>
  <div class="chapter">
    <bookhead :title="this.title" />
    <!-- <p>{{this.id}}</p> -->
    <!-- 章节的正序和倒序 -->
    <div class="cata_head">
      <p>{{ title }}</p>
      <div class="inversion">
        <span @click="inversion">{{ inversioFlag?'逆序':'正序' }}</span>
      </div>
    </div>
    <div class="cate_content">
      <ul class="cata_ul">
        <li v-for="(item,i) in chapterlist" :key="i" class="cata_list">
          <router-link :to=" { path: '/read/',query:{link:`${item.link}`,id:`${id}`}}" tag="div" class="cata_link txt-ellipsis">{{ item.title }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
// /read/?link=${item.link}
// http://api.zhuishushenqi.com/mix-atoc/{bookid}?view=chapters  { path: '/read/',query:{link:`${item.link}`,id:`${this.id}`}}
import bookhead from "@/components/head.vue";
export default {
  data() {
    return {
      id: "",
      title: "",
      chapterlist: [],
      inversioFlag: true
    };
  },
  components: {
    bookhead
  },
  methods: {
    addchapter() {
      this.$axios.get(`/api/mix-atoc/${this.id}?view=chapters`).then(res => {
        // console.log(res.data);
        this.chapterlist = res.data.mixToc.chapters;
        // console.log(this.chapterlist)
      });
      this.$axios.get(`/api/book/${this.id}`).then(res => {
        // console.log(res.data);
        this.title = res.data.title;
      });
    },
    inversion() {
      this.inversioFlag = !this.inversioFlag;
      this.chapterlist = this.chapterlist.reverse();
        // console.log('',this.chapterlist);
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    this.addchapter();
  }
};
</script>
<style lang="scss" scoped>
.chapter {
  width: 100%;
  height: 100vh;
  .cata_head {
    position: fixed;
    z-index: 99;
    top: 50px;
    width: 100%;
    padding: 15px;
    border-bottom: 2px red solid;
    background: url("./img/headbg.jpg") no-repeat;
    p {
      float: left;
      font-size: 18px;
    }
    .inversion {
      float: right;
      span {
        line-height: 18px;
      }
    }
  }
  .cate_content {
    position: relative;
    top: 50px;
    ul {
      width: 100%;
      height: auto;
      li {
        width: 100%;
        height: 40px;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        //   padding: 10px 20px;
        .cata_link {
          width: 100%;
          height: 100%;
          padding: 10px 20px;
        }
      }
    }
  }
}
</style>