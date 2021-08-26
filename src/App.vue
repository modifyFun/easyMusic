<template>
  <div id="app">
    <ul id="nav" v-if="$route.meta.showNavBar">
      <li><router-link to="/">推荐音乐</router-link></li>
      <li><router-link to="/hot">热歌榜</router-link></li>
      <li><router-link to="/search">搜索</router-link></li>
    </ul>
    <router-view
      @change-current-song="changeCurrentSong"
      :playing="playing"
      :currentSongId="currentSong ? currentSong.id : null"
    />
    <audio
      :src="audioSource"
      controls
      autoplay
      @play="playing = true"
      @pause="playing = false"
      @timeupdate="timeupdate"
      @durationchange="durationchange"
    />
    <PlayBar :currentSong="currentSong" :playing="playing" :prencent="prencent" class="app_playBar"/>
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: hsl(210, 29%, 24%);
  padding-bottom: 40px;
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
  src: url("//at.alicdn.com/t/font_2763996_wy345d9hxh.woff2?t=1629726302213")
      format("woff2"),
    url("//at.alicdn.com/t/font_2763996_wy345d9hxh.woff?t=1629726302213")
      format("woff"),
    url("//at.alicdn.com/t/font_2763996_wy345d9hxh.ttf?t=1629726302213")
      format("truetype");
}

.app_playBar{
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
      playing: false,
      currentTime:0,
      duration:0,
    };
  },
  methods: {
    changeCurrentSong: function (item) {
      this.currentSong = item;
    },
    timeupdate:function(e){
      this.currentTime = e.target.currentTime;
    }, 
    durationchange:function(e){
      this.duration = e.target.duration;
    }, 
  },
  computed: {
    audioSource: function () {
      return `https://music.163.com/song/media/outer/url?id=${this.currentSong?.id}.mp3`;
    },
    prencent:function(){
      return this.currentTime/this.duration;
    }
  },
};
</script>

