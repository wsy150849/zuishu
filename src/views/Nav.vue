<template>
    <div>
<Search />
    <nav>
      <router-link tag="li" to="/" exact>首页</router-link>
      <router-link tag="li" to="/categroy">分类</router-link>
      <!-- <router-link tag="li" to="/selection">精选</router-link> -->
      <router-link tag="li" to="/rank">排行榜</router-link>
      <router-link tag="li" to="/booklist">书架</router-link>
    </nav>
    <main>
      <keep-alive>
        <router-view />
      </keep-alive>
    </main>
    </div>
</template>
<script>
import Search from "../components/Search";
export default {
    components: {
    Search
  }
}
</script>
<style scoped>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

.router-link-exact-active {
  opacity: .5;
  color: #fff;
  font-weight: 400;
}
/* ============= */
nav {
  width: 100%;
  height: 50px;
  background-color: red;
}
li {
  list-style: none;
  line-height: 50px;
  width: 25%;
  text-align: center;
  color: #ffffff;
  float: left;
}
</style>