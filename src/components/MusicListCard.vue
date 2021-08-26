<template>
  <li @click="$router.push('playlists?id=' + item.id)" class="card">
    <div class="thumb">
      <img
        :src="item.picUrl + '?imageView=1&type=webp&thumbnail=370x0'"
        alt=""
      />
      <span>&#xe61e;{{ item.playCount | parseCount }}</span>
    </div>
    <p>{{ item.name }}</p>
  </li>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  filters:{
      //转换播放次数单位
      parseCount:function(value){
          if(value > 100000000){
              return (value/100000000).toFixed(1)+"亿";
          }else if(value > 10000){
               return (value/10000).toFixed(1)+"万";
          }else{
              return value;
          }
      }
  }
};
</script>

<style lang="less" scoped>
.card {
    flex-basis: 25%;
    flex-grow: 1;
    &:nth-child(2n){
        margin: 0 5px;
    }
    position: relative;
  .thumb {
    img {
        width: 100%;
        vertical-align: middle;
    }
    span {
        font-family: 'iconfont';
        color: #fff;
        font-size: 12px;
        position: absolute;
        top: 5px;
        right: 5px;
    }
  }
  p {
    font-size: 14px;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    margin:5px
  }
}
</style>>
