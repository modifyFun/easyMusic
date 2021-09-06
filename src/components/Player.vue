<template>
  <div class="container" v-if="currentSong" @click.stop="">
    <PlayBar
      :currentSong="currentSong"
      :playing="playing"
      :progress="progress"
      @openPlayPage="openPlayPage"
      @listControll="listControll"
      @change-playing="changePlaying"
      v-show="!showPlayPage"
    />

    <transition
      name="music_list_mask"
      enter-active-class="animate__animated  animate__fadeIn"
      leave-active-class="animate__animated  animate__fadeOut"
    >
      <div
        class="mask"
        v-show="isShowList"
        @click.stop="isShowList = false"
      ></div>
    </transition>
    <transition
      name="music_list"
      enter-active-class="animate__animated  animate__fadeInUp"
      leave-active-class="animate__animated  animate__fadeOutDownBig"
    >
      <div class="list" v-show="isShowList">
        <div class="list-content">
          <PlayList
            :playlist="currentSongList"
            :playing="playing"
            :currentSongId="currentSong.id"
            :hasNum="false"
            @change-current-song="changeCurrentSong"
          />
        </div>
      </div>
    </transition>
     <transition
      name="PalyPage"
      enter-active-class="animate__animated  animate__slideInUp"
      leave-active-class="animate__animated  animate__slideOutDown"
    >

    <PlayPage
      v-show="showPlayPage"
      :currentSong="currentSong"
      :prencent="prencent"
      :currentSongList="currentSongList"
      :playing="playing"
      :currentTime="currentTime"
      @closePlayer="closePlayer"
      @change-playing="changePlaying"
      @listControll="listControll"
      @preve-song="$emit('preve-song')"
      @next-song="$emit('next-song')"
      @change-progeress="$emit('change-progeress',$event)"
    />
     </transition>
  </div>
</template>

<script>
import PlayList from "@/components/PlayList.vue";
import PlayBar from "@/components/PlayBar.vue";
import PlayPage from "@/components/PlayPage.vue";
export default {
  props: {
    currentSong: Object,
    currentSongList: Array,
    playing: Boolean,
    prencent: Number,
    currentTime:Number
  },
  data: function () {
    return {
      isShowList: false,
      showPlayPage: false,
      // canClick: true,
    };
  },
  computed: {
    progress: function () {
      return (1 - this.prencent) * 2 * 3.14 * 13;
    },
  },
  methods: {
    changePlaying: function () {
      this.$emit("change-playing");
    },
    listControll: function (val) {
      this.isShowList = val;
    },
    // canClickMask:function(){  //歌单弹出收缩动画结束后，设置允许点击切换歌单显示状态
    //   this.canClick = true;
    //   console.log( "end" );
    // },
    changeCurrentSong: function (item, songList) {
      this.$emit("change-current-song", item, songList);
    },
    openPlayPage: function () {
      // this.$router.push("/player");
      this.showPlayPage = true;
    },
    closePlayer: function () {
      this.showPlayPage = false;
    },
  },
  components: {
    PlayList,
    PlayPage,
    PlayBar,
  },
};
</script>

<style lang="less" scoped>
.animate__animated {
  animation-duration: .4s;
}
.container {
  width: 100vw;
}
.palybar {
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  box-shadow: 0 -2px 10px 1px rgba(218, 215, 215, 0.2);
  .music_pic {
    width: 36px;
    height: 36px;

    &.playing {
      .img {
        transform: translateY(-6px);

        img {
          animation-play-state: running;
        }
      }
    }
    .img {
      transition: transform 0.4s ease-in;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;

      img {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        overflow: hidden;
        animation: 10s imgAnimate linear infinite paused;
      }
    }
  }
  .music_title {
    font-size: 16px;
    padding: 0 10px;
    flex: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    span {
      font-size: 12px;
      color: #888;
      &::before {
        content: " - ";
      }
      &::after {
        content: "/";
      }
      &:last-of-type {
        &::after {
          content: "";
        }
      }
    }
  }
  .music_player_btn {
    width: 30px;
    height: 30px;
    margin: 0 10px;
    position: relative;
    .circle {
      transform-origin: center;
      transform: rotate(-90deg);
    }
    span {
      position: absolute;
      top: 50%;
      left: 50%;
      font-family: "iconfont";
      font-size: 20px;
      &.paused {
        transform: translate(-40%, -50%);
      }
      &.playing {
        transform: translate(-50%, -50%);
      }
    }
  }
  .music_list_btn {
    font-size: 26px;
    font-family: "iconfont";
  }
  // .mask {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   width: 100vw;
  //   height: 100vh;
  //   background-color: rgba(0, 0, 0, 0.2);
  // }
  // .list {
  //   position: fixed;
  //   bottom: 20px;
  //   left: 50%;
  //   margin-left: -47%;
  //   width: 94%;
  //   height: 50%;
  //   padding: 10px 0;
  //   overflow: hidden;
  //   border-radius: 16px;
  //   background-color: #fff;
  //   .list-content {
  //     width: 100%;
  //     height: 100%;
  //     overflow-y: auto;
  //   }
  // }
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 90;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
}
.list {
  position: fixed;
  bottom: 20px;
  left: 50%;
  z-index: 100;
  margin-left: -47%;
  width: 94%;
  height: 50%;
  padding: 10px 0;
  overflow: hidden;
  border-radius: 16px;
  background-color: #fff;
  .list-content {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
}
// .fade-enter-active,
// .fade-leave-active {
//   transition: all 0.8s;
// }
// .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
//   // transform: translateY(100%);
//   opacity: 0;
//   margin-bottom: -100%;
// }


</style>