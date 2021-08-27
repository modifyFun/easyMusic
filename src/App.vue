<template>
  <div id="app">
    <ul id="nav" v-if="$route.meta.showNavBar">
      <li><router-link to="/">推荐音乐</router-link></li>
      <li><router-link to="/hot">热歌榜</router-link></li>
      <li><router-link to="/search">搜索</router-link></li>
    </ul>
    <section class="app_router">
      <transition
        name="app_router"
        :enter-active-class="'animate__animated '+$route.meta.animateIn"
        :leave-active-class="'animate__animated '+$route.meta.animateOut"
      >
        <router-view
          @change-current-song="changeCurrentSong"
          :playing="playing"
          :currentSong="currentSong"
          :prencent="prencent"
          :currentSongList="currentSongList"
          :currentSongId="currentSong ? currentSong.id : null"
        />
      </transition>
    </section>
    <audio
      ref="audio"
      :src="audioSource"
      controls
      autoplay
      @play="playing = true"
      @pause="playing = false"
      @timeupdate="timeupdate"
      @durationchange="durationchange"
    />
    <PlayBar
      :currentSong="currentSong"
      :playing="playing"
      :prencent="prencent"
      :currentSongList="currentSongList"
      @change-playing="changePlaying"
      @change-current-song="changeCurrentSong"
      class="app_playBar"
    />
  </div>
</template>

<style lang="less">

.animate__animated {
  animation-duration: 0.3s;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

#nav {
  display: flex;
  border-bottom: 2px solid #eee;
  li {
    flex: 1;
    text-align: center;
    a {
      font-size: 15px;
      display: inline-block;
      padding: 10px;
      font-weight: bold;
      color: #2c3e50;
      margin-bottom: -2px;
      font-weight: normal;

      &.router-link-exact-active {
        color: rgb(221, 0, 27);
        border-bottom: 2px solid rgb(221, 0, 27);
      }
    }
  }
}
@font-face {
  font-family: "iconfont"; /* Project id 2763996 */
  src: url("//at.alicdn.com/t/font_2763996_skzk8fc3nd.woff2?t=1629947647946")
      format("woff2"),
    url("//at.alicdn.com/t/font_2763996_skzk8fc3nd.woff?t=1629947647946")
      format("woff"),
    url("//at.alicdn.com/t/font_2763996_skzk8fc3nd.ttf?t=1629947647946")
      format("truetype");
}
audio{
  height: 0;
}
.app_router{
  position: relative;
}
.app_playBar {
  position: fixed;
  left: 0;
  bottom: -1px;
  background-color: #fff;
}
</style>

<script>
import PlayBar from "@/components/PlayBar.vue";
export default {
  components: {
    PlayBar,
  },
  data: function () {
    return {
      currentSong: null,
      currentSongList: null,
      playing: false,
      currentTime: 0,
      duration: 0,
    };
  },
  methods: {
    changeCurrentSong: function (item, songList) {
      this.currentSongList = songList || this.currentSongList;
      this.currentSong = item;
    },
    timeupdate: function (e) {
      this.currentTime = e.target.currentTime;
    },
    durationchange: function (e) {
      this.duration = e.target.duration;
    },
    changePlaying: function () {
      !this.playing ? this.$refs.audio.play() : this.$refs.audio.pause();
    },
  },
  computed: {
    audioSource: function () {
      return `https://music.163.com/song/media/outer/url?id=${this.currentSong?.id}.mp3`;
    },
    prencent: function () {
      return this.currentTime / this.duration;
    },
  },
};
</script>

