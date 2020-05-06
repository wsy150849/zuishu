<template>
  <div class="frame">
    <div class="emty" />
    <div class="head">
      <div v-if="backVisible" class="back" @click="back">
        <span name="Back" class="icon-Back" />
      </div>
      <div v-if="mineVisible" class="Mine" @click="mine">
        <!-- <span name="Mine" class="svg_Mine u-cenInBlock" /> -->
      </div>
      <div class="head_title">
        {{ title }}
      </div>
      <div v-if="searchVisible" class="search" @click="search">
        <!-- <span name="Search" class="svg_search u-cenInBlock" /> -->
      </div>
      <div v-show="editVisible" class="edit" @click="changeEdit">
        {{ edit?'编辑':'完成' }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    backVisible: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '书籍详情'
    },
    searchVisible: {
      type: Boolean,
      default: true
    },
    mineVisible: {
      type: Boolean,
      default: false
    },
    editVisible: {
      type: Boolean,
      default: false
    },
    edit: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    search () {
      this.$router.push('/search')
    },
    changeEdit () {
      this.$emit('Onedit')
    },
    mine () {
      this.$emit('OnMine')
    }
  }
}
</script>

<style lang="scss" scoped>
.head{ width: 100%; height: 50px; line-height: 50px; background: red; font-weight: bold; font-family: KaiTi; position: fixed; top: 0; z-index: 110; box-shadow: 0 0 10px 0px;
  div{ position: absolute; }
  .head_title{height: 100%;overflow: hidden; white-space: nowrap;text-overflow: ellipsis; left: 50%; transform: translateX(-50%);color:white }
  .back,.Mine{ left: 20px; }
  .search,.edit{ right: 20px; }
  }
.head_title{ font-size: 18px; }
.svg_back,.svg_search,.svg_Mine{ width: 40px; height: 40px; }
.emty{ height: 50px; width: 100%; }
.frame{
  width: 100%;
  height: 50px;
}
</style>
