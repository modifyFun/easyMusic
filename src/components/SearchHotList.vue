<template>
  <div class="search_hot">
    <h3>热门搜索</h3>
    <ul>
      <li v-for="(item, index) in hot" :key="index"  @click="$emit('search',item.first)">{{ item.first }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    hot: Array,
  },
};
</script>

<style scoped>
.search_hot{
    border-top: 1px solid rgb(236, 236, 236);
    padding: 16px  12px;
}
h3{
    font-size: 12px;
    color: #666;
    font-weight: normal;
    padding-bottom: 10px;
}
li {
  display: inline-block;
  font-size: 14px;
  /* line-height: 20px; */
  padding:4px 12px;
  margin-right: 6px;
  margin-bottom: 10px;
  border: 1px solid rgb(236, 236, 236);
  border-radius: 12px;
}
</style>