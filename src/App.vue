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
        :enter-active-class="'animate__animated ' + $route.meta.animateIn"
        :leave-active-class="'animate__animated ' + $route.meta.animateOut"
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
      @ended="ended"
    />
    <Player
      :currentSong="currentSong"
      :playing="playing"
      :prencent="prencent"
      :currentSongList="currentSongList"
      @change-playing="changePlaying"
      @change-current-song="changeCurrentSong"
      @preve-song="preveSong"
      @next-song="nextSong"
       @change-progeress="changeProgeress"
      class="app_playBar"
    />
  </div>
</template>

<style lang="less">
.animate__animated {
  animation-duration: 0.4s;
}

@font-face {
  font-family: 'iconfont';  /* Project id 2763996 */
  src: url('//at.alicdn.com/t/font_2763996_3zpdgpdwwfw.woff2?t=1630403361511') format('woff2'),
       url('//at.alicdn.com/t/font_2763996_3zpdgpdwwfw.woff?t=1630403361511') format('woff'),
       url('//at.alicdn.com/t/font_2763996_3zpdgpdwwfw.ttf?t=1630403361511') format('truetype');
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

audio {
  height: 0;
}
.app_router {
  position: relative;
}
.app_playBar {
  position: fixed;
  left: 0;
  bottom: -1px;
  z-index: 1000;
  background-color: #fff;
}
</style>

<script>
import Player from "@/components/Player.vue";
export default {
  components: {
    Player,
  },
  data: function () {
    return {
      currentSong: null,
      currentSongList: null,
      index: 0,
      playing: false,
      currentTime: 0,
      duration: 0,
    };
  },
  methods: {
    changeCurrentSong: function (item, songList) {
      //改变当前音乐
      this.currentSongList = songList || this.currentSongList;
      this.currentSong = item;
      for (let i = 0; i < this.currentSongList.length; i++) {
        if (this.currentSongList[i].id == this.currentSong.id) {
          this.index = i;
        }
      }
    },
    timeupdate: function (e) {
      //播放歌曲时，歌曲播放时间
      this.currentTime = e.target.currentTime;
    },
    durationchange: function (e) {
      //更换歌曲时歌曲时间改变
      this.duration = e.target.duration;
    },
    changePlaying: function () {
      !this.playing ? this.$refs.audio.play() : this.$refs.audio.pause();
    },
    preveSong: function () {//上一曲
      this.index--;
      if (this.index < 0) {
        this.index = this.currentSongList.length - 1;
      }
      this.currentSong = this.fromatSong(this.currentSongList[this.index]);
    },
    nextSong: function () {
      this.index++;
      if (this.index > this.currentSongList.length - 1) {
        this.index = 0;
      }
     this.currentSong = this.fromatSong(this.currentSongList[this.index]);
    },
    ended:function(){//播放完后切歌
       this.nextSong();
    },
    changeProgeress:function(prencent){ //拖动进度条改变歌曲进度
      this.$refs.audio.currentTime = this.duration*prencent;
    },
    fromatSong:function(item){ //格式化歌曲对象
       return {
        id: item.song?.id ? item.song.id : item.id,
        name: item.song?.name ? item.song.name : item.name,
        alias: item.song?.alias ? item.song.alias : item.alia,
        artists: item.song?.artists? item.song.artists: item.ar?item.ar:item.artists,
        album: item.song?.album ? item.song.album : item.al? item.al:item.album,
        picUrl:item.picUrl? item.picUrl:item.al?.picUrl? item.al.picUrl:item.picUrl
      };
    }
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

