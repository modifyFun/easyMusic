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
    <div class="song_img" v-show="!showLyric">
      <div class="needle" :class="{ playing: playing }"></div>
      <div class="disc" :class="{ playing: playing }" @click="showLyric = true">
        <img :src="currentSong.picUrl" />
      </div>
    </div>
    <div class="lyric" v-show="showLyric" @click="showLyric = false">
      <ul
        v-if="lyric"
        ref="lyricContent"
        :style="{ marginTop: -scrollH + 'px' }"
      >
        <li
          v-for="(l, i) in parsedLyric"
          :key="i"
          :class="{ active: lyricIndex === i }"
        >
          <p>{{ l.text }}</p>
        </li>
      </ul>
    </div>
    <div class="progress">
      <input
        type="range"
        max="1"
        step="0.001"
        :value="progressVal"
        @change="changeProgress"
        @input="
          inputing = true;
          progressVal = $event.target.value;
        "
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
    currentTime: Number,
  },
  data: function () {
    return {
      inputing: false,
      progressVal: 0,
      showLyric: false,
      barVal: 0,
      lyric: "",
      lisH: [],
      scrollH: 0,
    };
  },
  watch: {
    prencent: function () {
      if (!this.inputing) {
        this.progressVal = this.prencent;
      }
    },
    currentSong: function () {
      this.getLyric();
    },
    lyricIndex: function (index) {
      let h = this.lisH.slice(0, index).reduce(function (total, item) {
        return total + item;
      }, 0);
      console.log(h);
      h = h > 200 ? h - 200 : 0;
      h = h > 1928 ? 1928 : h;
      this.scrollH = h;
    },
    showLyric: function () {
      this.$nextTick(() => {
        var lis = this.$refs.lyricContent.querySelectorAll("li");
        this.lisH = [...lis].map((item) => item.offsetHeight);
      });
    },
  },
  created: function () {
    this.getLyric();
  },
  computed: {
    parsedLyric: function () {
      if (this.lyric) {
        return this.lyric
          .split("\n")
          .filter((s) => s)
          .map((s) => {
            let text = s.replace(/^\[\d{2}:\d{2}\.\d{2,3}\]/i, "");
            let timeStr = s.replace(text, "").replace(/(^\[|\]$)/g, "");
            let timeArr = timeStr.split(":").map((item) => Number(item));
            let time = timeArr[0] * 60 + timeArr[1];
            return { text, time };
          });
      } else {
        return [];
      }
    },
    lyricIndex: function () {
      // let i = this.parsedLyric.findIndex((item)=>{item.time > this.currentTime});
      let i = this.parsedLyric.findIndex(
        (item) => item.time > this.currentTime
      );
      let currentLyricIndex = i !== -1 ? i - 1 : this.parsedLyric.length - 1;
      return currentLyricIndex;
    },
  },
  methods: {
    changeProgress: function (e) {
      this.$emit("change-progeress", e.target.value);
      this.inputing = false;
    },
    getLyric: function () {
      this.axios
        .get("http://apis.netstart.cn/music/lyric", {
          params: {
            id: this.currentSong.id,
          },
        })
        .then((res) => {
          this.lyric = res.data.lrc.lyric;
        });
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
  margin-bottom: 20px;
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
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .disc {
    width: 70vw;
    height: 70vw;
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
.lyric {
  box-sizing: border-box;
  height: 60vh;
  line-height: 2em;
  overflow: hidden;
  ul {
    transition: all .4s linear;
    li {
      color: #bbb;
      p {
        font-size: 16px;
        text-align: center;
       
      }
      &.active {
        color: #fff;
      }
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
  height: 4px;
  margin: 50px auto 0 auto;
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
    &::after {
      content: "";
      display: block;
      width: 10px;
      height: 10px;
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