<template>
  <div class="container" v-if="currentSong" @click.stop="">
    <div class="palybar" @click.stop="openPlayer" v-show="!showPlayer">
      <div class="music_pic" :class="{ playing: playing }">
        <div class="img">
          <img
            :src="
              currentSong.picUrl
                ? currentSong.picUrl
                : '/img/disc_default.ba7c53e2.png'
            "
            alt=""
          />
        </div>
      </div>
      <div class="music_title">
        {{ currentSong.name
        }}<span v-for="artiset in currentSong.artists" :key="artiset.id">{{
          artiset.name
        }}</span>
      </div>
      <div class="music_player_btn" @click.stop="play">
        <svg width="30" height="30">
          <circle
            fill="transparent"
            cx="15"
            cy="15"
            r="13"
            stroke-width="1.3"
            stroke="#ccc"
          ></circle>
          <circle
            class="circle"
            fill="transparent"
            cx="15"
            cy="15"
            r="13"
            stroke-width="1.3"
            stroke="#000"
            stroke-linecap="round"
            stroke-dasharray="81.64"
            :stroke-dashoffset="progress"
          ></circle>
        </svg>

        <span class="paused" v-show="!playing">&#xe673;</span>
        <span class="playing" v-show="playing">&#xe625;</span>
      </div>

      <div class="music_list_btn" @click.stop="listControll">&#xe600;</div>

      <!-- <transition
        name="music_list_btn"
        enter-active-class="animate__animated  animate__fadeIn"
        leave-active-class="animate__animated  animate__fadeOut"
      >
        <div class="mask" v-show="isShowList" @click.stop="listControll"></div>
      </transition> -->

      <!-- <transition
        name="music_list"
        enter-active-class="animate__animated  animate__fadeInUp"
        leave-active-class="animate__animated  animate__fadeOutDownBig"
      >
        <div class="list" v-show="isShowList" @click.stop="">
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
      </transition> -->
    </div>

    <transition
      name="music_list_btn"
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
      <div class="list" v-show="isShowList" @click.stop="">
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
    <PlayPage
      v-show="showPlayer"
      :currentSong="currentSong"
      :prencent="prencent"
      :currentSongList="currentSongList"
      :playing="playing"
      @closePlayer="closePlayer"
      @change-playing="play"
      @listControll="listControll"
    />
  </div>
</template>

<script>
import PlayList from "@/components/PlayList.vue";
import PlayPage from "@/components/PlayPage.vue";
export default {
  props: {
    currentSong: Object,
    currentSongList: Array,
    playing: Boolean,
    prencent: Number,
  },
  data: function () {
    return {
      isShowList: false,
      showPlayer: false,
      // canClick: true,
    };
  },
  computed: {
    progress: function () {
      return (1 - this.prencent) * 2 * 3.14 * 13;
    },
  },
  methods: {
    play: function () {
      this.$emit("change-playing");
    },
    listControll: function () {
      // if (this.canClick) {//弹出歌单时防抖，只有在动画结束后才能在指向歌单的弹出和缩回
        // console.log(this.canClick);
        this.isShowList = !this.isShowList;
        // this.canClick = false;
        // console.log( "start" );

      // }
    },
    // canClickMask:function(){  //歌单弹出收缩动画结束后，设置允许点击切换歌单显示状态
    //   this.canClick = true;
    //   console.log( "end" );
    // },
    changeCurrentSong: function (item, songList) {
      this.$emit("change-current-song", item, songList);
    },
    openPlayer: function () {
      // this.$router.push("/player");
      this.showPlayer = true;
    },
    closePlayer: function () {
      this.showPlayer = false;
    },
  },
  components: {
    PlayList,
    PlayPage,
  },
};
</script>

<style lang="less" scoped>
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

@keyframes imgAnimate {
  from {
    transform: rotate(0deg);
    transform-origin: center;
  }
  to {
    transform: rotate(360deg);
    transform-origin: center;
  }
}
</style>