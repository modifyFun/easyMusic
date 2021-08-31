<template>
  <ul>
    <li v-for="h in history" :key="h" @click="$emit('click-search', h)">
      <i>&#xe6b2;</i>
      <span>{{ h }} <em @click.stop="$emit('del-histroy', h)">&#xe612;</em></span>
    </li>
  </ul>
</template>

<script>
export default {
  props: { history: Array },
};
</script>

<style lang="less" scoped>
li {
  
  display: flex;
  font-family: "iconfont";
  i{
      font-style: normal;
      padding:12px;
      color: #ddd;
  }
  span{
      font-size: 14px;
      padding:12px;
      flex: 1;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      em{
        font-style: normal;
      }
  }
}
</style>