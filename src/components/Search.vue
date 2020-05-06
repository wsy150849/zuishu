<template>
  <div class="search">
    <div class="logo">
      <img src="../assets/logo.png" alt />
    </div>
    <div class="search-text">
      <span class="text">
        <!-- <input type="text" /> -->
        <span @click="jompSearchBook" class="search-img">
            <img src="../assets/images/icon/search.png" alt />
        </span>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    jompSearchBook(){
      this.$router.push({path:'/search'})
    }
  }
};
</script>
<style lang="scss" scoped>
.search{
    width: 100%;
    height: 50px;
    background-color: #FBFAF8;
    display: flex;
    margin-top: 10px;
    .logo{
        // background-color: red;
        flex: 3;
        
        img{
            width: 120px;
            height: auto;
            margin-left: 40px;
            line-height: 50px;
        }
    }
    .search-text{
        // background-color: blue;
        flex: 7;
        margin-right: 50px;
        .text{
            float: right;
            width: 165px;
            height: 30px;
            text-align: right;
            input{
                width: 150px;
                height: 26px;
                border: 1px solid #CAB389;
                outline: none;
            }
        }
    }
}
.search-img{
    width: 30px;
    height: 30px;
    background-color: #CAB389;
    display:block;
    float: right;
    padding: 8px;
    img{
        width: 14px;
        height: 14px;
    }
}
</style>