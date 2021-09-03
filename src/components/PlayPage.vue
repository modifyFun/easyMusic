<template>
  <div class="player">
    <div
      class="mask"
      :style="{ backgroundImage: 'url(' + currentSong.picUrl + ')' }"
    ></div>
    <div class="player_topbar">
      <div class="btn" @click="$emit('closePlayer')">&#xe6b1;</div>
      <div class="title">
        <h3>{{ currentSong.name }}</h3>
      </div>
      <div class="share"></div>
    </div>
    <div class="song_img">
      <div class="needle" :class="{ playing: playing }"></div>
      <div class="disc" :class="{ playing: playing }">
        <img :src="currentSong.picUrl" />
      </div>
    </div>
    <div class="progress">
      <input
        type="range"
        max="1"
        step="0.001"
        :value="progressVal"
        @change="changeProgress"
        @input="inputing = true;progressVal=$event.target.value"
      />
      <div class="bar" :style="{ width: progressVal * 100 + '%' }"></div>
    </div>
    <ul class="playBar">
      <li>&#xe66e;</li>
      <li @click="$emit('preve-song')">&#xe6dc;</li>
      <li @click="$emit('change-playing')">
        <span v-show="playing">&#xe625;</span>
        <span v-show="!playing">&#xe673;</span>
      </li>
      <li @click="$emit('next-song')">&#xed66;</li>
      <li @click.stop="$emit('listControll', true)">&#xe600;</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    currentSong: {
      type: Object,
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
  data: function () {
    return {
      inputing: false,
      progressVal: 0,
      barVal:0,
    };
  },
  watch: {
    prencent: function () {
      if (!this.inputing) {
        this.progressVal = this.prencent;
      }
    },
  },
  methods: {
    changeProgress: function (e) {
      this.$emit("change-progeress", e.target.value);
      this.inputing = false;
    },
  },
};
</script>

<style lang="less" scoped>
@top-h: 36px;
@top-btn-w: 36px;
.player {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  min-width: 100vw;
  min-height: 100vh;
  background-color: rgb(122, 122, 122);
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-size: cover;
    filter: blur(20px);
    transform: scale(1.5);
    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(100, 99, 99, 0.4);
    }
  }
}
.player_topbar {
  display: flex;
  color: #fff;

  .btn {
    width: @top-btn-w;
    height: @top-h;
    font-family: "iconfont";
    text-align: center;
    line-height: @top-h;
    font-size: 20px;
  }
  .title {
    flex: 1;
    line-height: @top-h;
    text-align: center;
    h3 {
      font-weight: normal;
    }
  }
}
.song_img {
  padding: 80px 0;
  display: flex;
  justify-content: center;
  position: relative;
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
  .needle {
    width: 30%;
    height: 30%;
    // background-color: red;
    position: absolute;
    top: 0;
    left: 50%;
    z-index: 90;
    background-image: url("../assets/img/needle-ab.png");
    background-repeat: no-repeat;
    background-size: contain;
    transition: transform 0.4s linear;
    transform: rotate(-24deg);
    transform-origin: left top;
    &.playing {
      transform: rotate(4deg);
    }
  }
}
.playBar {
  display: flex;
  justify-content: center;
  font-family: "iconfont";
  padding-top: 30px;
  li {
    margin: 0 20px;
    height: 50px;
    color: #fff;
    font-size: 20px;
    line-height: 50px;
    vertical-align: baseline;
    &:nth-child(1) {
      font-size: 28px;
    }
    &:nth-child(3) {
      width: 50px;
      height: 50px;
      font-size: 40px;
      border: 1px solid #fff;
      text-align: center;
      border-radius: 50%;
    }
    &:nth-child(5) {
      font-size: 26px;
    }
  }
}
.progress {
  width: 80%;
  height: 6px;
  margin: 0 auto;
  border-radius: 10px;
  background-color: #fff;
  position: relative;
  input {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    opacity: 0;
  }
  .bar {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #ff5722;
    width: 10%;
    height: 100%;
    border-radius: inherit;
    &::after{
      content: "";
      display: block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #ff5722;
      position: absolute;
      top: -3px;
      right: -3px;
    }
  }
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