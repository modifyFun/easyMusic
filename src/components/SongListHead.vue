<template>
  <div class="songlisthead">
    <div class="mask" :style="{ backgroundImage: 'url(' + img + ')' }"></div>
    <div class="list_img">
      <img :src="img" alt="" />
    </div>
    <div class="right">
      <p>{{ name }}</p>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    img: String,
    description: String,
  },
};
</script>

<style lang="less" scoped>
.songlisthead {
  background-color: #888;
  padding: 30px 12px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  position: relative;
  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    opacity: 0.1;
    background-color: rgba(236, 236, 236, 0.2);
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: #666;
    background-size: cover;
    filter: blur(20px);
  }
  .list_img {
    position: relative;
    z-index: 10;
    img {
      width: 100px;
      height: auto;
      border-radius: 12px;
    }
  }
  .right {
    position: relative;
    z-index: 10;
    padding-left: 12px;
    flex: 1;
    p {
      font-size: 16px;
      color: #fff;
      &:nth-of-type(2) {
        padding-top: 20px;
        font-size: 14px;
        color: rgb(228, 228, 228);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    //   padding-right: 12px;
  }
}
</style>