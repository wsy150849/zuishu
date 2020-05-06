<template>
  <div class="category">
    <Nav />
    <Male/>
    <Female/>
  </div>
</template>
<script>
import Nav from "../views/Nav";
import Male from "../views/booksclassift/Maleclassift"
import Female from "../views/booksclassift/Female"
export default {
  data() {
    return {
      classify: {}
    };
  },
  components: {
    Nav,
    Male,
    Female
  },
  methods: {
    addClassify() {
      this.$axios.get("/api/cats/lv2/statistics").then(res => {
        // console.log(res.data);
        this.classify = res.data;
      });
    }
  },
  mounted() {
    this.addClassify();
  }
};
</script>
