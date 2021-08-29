<template>
  <div class="suggests">
    <p>搜索："{{ keywords }}"</p>
    <ul>
      <li v-for="item in suggests" :key="item.id" @click="$emit('search',item.name)">
        <i>&#xe635;</i><span>{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    keywords: String,
    suggests: Array,
  },
};
</script>

<style lang="less" scoped>
.suggests {

  
  p {
      font-size: 16px;
      color: #507daf;
      line-height: 50px;
      border-top: 1px solid rgb(236, 236, 236);
      border-bottom: 1px solid rgb(236, 236, 236);
      padding: 0 12px;
  }
  li {
    display: flex;
    line-height: 45px;
    padding: 0 12px;
    i {
      font-family: "iconfont";
      font-style: normal;
      color: rgb(201, 201, 201);
      padding-right: 12px;
    }
    span {
      flex: 1;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>