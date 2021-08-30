<template>
  <div class="about">
    <div class="head">
      <div class="hot_img"></div>
      <p>更新日期：{{updateTime}}</p>
    </div>
    <PlayList
        :playlist="songs"
        :playing="playing"
        :currentSongId="currentSongId"
        :hasNum="true"
        :hightlight="true"
        @change-current-song="changeCurrentSong"
      />
  </div>
</template>


<script>
import PlayList from "@/components/PlayList.vue";
export default {
   props: {
    playing: {
      type: Boolean,
      require: true,
    },
    currentSongId: {
      type: Number,
      require: true,
    },
  },
  data: function () {
    return {
      songs: [],
      tiemStack:0,
    };
  },
  computed:{
    // 时间戳转换成时间
    updateTime:function(){
      let date = new Date(this.tiemStack);
      // console.log(date.getMonth());
      return (date.getMonth()<10? "0"+(date.getMonth()+1):(date.getMonth()+1)) +"月" + (date.getDate()<10? "0"+date.getDate():date.getDate()) +"日";
    }
  },
  created: function () {
    //获取热门榜单
    this.axios
      .get("http://apis.netstart.cn/music/playlist/detail?id=3778678")
      .then((res) => {
        this.tiemStack = res.data.playlist.updateTime;
        this.songs = res.data.playlist.tracks.slice(0,99);
      });
  },
  components: {
    PlayList,
  },
  methods: {
    //点击歌单列表进行播放时，向上传递当前歌曲对象及歌单列表
    changeCurrentSong: function (item, songList) {
      this.$emit("change-current-song", item, songList);
    },
  },
};
</script>


<style lang="less" scoped>
.about {
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 100vw;
  height: calc(100vh - 40px);
  padding-bottom: 40px;
  background-color: #fff;
  overflow: auto;

  .head {
    background-image: url("../assets/img/hot_music_bg_3x.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding-left: 12px;
    height: 170px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.2);
      z-index: 1;
    }
    .hot_img {
      position: relative;
      z-index: 2;
      width: 100%;
      height: 70px;
      background-image: url("../assets/img/index_icon_2x.png");
      background-repeat: no-repeat;
      background-size: 166px 97px;
      background-position: -24px -30px;
    }
    p {
      position: relative;
      z-index: 3;
      font-size: 12px;
      color: hsla(0, 0%, 100%, 0.8);
      line-height: 20px;
    }
  }
}
</style>
