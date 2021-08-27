<template>
  <div class="player">
    <div class="player_topbar">
      <div class="btn">v</div>
      <div class="title">
        <h3>{{ currentSong.name }}</h3>
      </div>
      <div class="share"></div>
    </div>
    <div class="song_img">
      <div class="disc" :class="{ playing: playing }">
        <img :src="currentSong.picUrl" alt="歌曲封面" />
      </div>
    </div>

    <div class="progress"></div>
    <div class="playBar">
      <div>模式</div>
      <div>上一首</div>
      <div>播放</div>
      <div>下一首</div>
      <div>列表</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentSong: {
      type: Object,
      require: true,
    },
    currentSongId: {
      type: Number,
      require: true,
    },
    prencent: {
      type: Number,
    },
    currentSongList: {
      type: Array,
    },
    playing: {
      type: Boolean,
    },
  },
};
</script>

<style lang="less" scoped>
.player {
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100vw;
  min-height: 100vh;
  background-color: #fff;
  // background-color: rgba(26, 25, 25, 0.4);
}
.player_topbar {
  display: flex;
  .btn {
  }
  .title {
    flex: 1;
    text-align: center;
  }
}
.song_img {
  margin: 50px 0;
  display: flex;
  justify-content: center;
  .disc {
    width: 60vw;
    height: 60vw;
    background: url(../assets/img/disc_default.png) no-repeat;
    background-size: 100%;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 2px 10px rgba(255, 255, 255, 0.2);
    animation: songImgAniamte 10s linear infinite paused;
    img {
      width: 70%;
      height: auto;
      border-radius: 50%;
    }
    &.playing {
      animation-play-state: running;
    }
  }
}
.playBar {
  display: flex;
}

@keyframes songImgAniamte {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>