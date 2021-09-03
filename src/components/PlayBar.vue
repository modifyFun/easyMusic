<template>
  <div class="palybar" @click.stop="$emit('openPlayPage')">
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
    <div class="music_player_btn" @click.stop="$emit('change-playing')">
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

    <div class="music_list_btn" @click.stop="$emit('listControll',true)">
      &#xe600;
    </div>

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
</template>

<script>
export default {
  props: {
    currentSong: Object,
    currentSongList: Array,
    playing: Boolean,
    progress:Number,
  },
  watch:{
    currentSong:function(){
      if(!this.currentSong.picUrl){
        this.axios
          .get("http://apis.netstart.cn/music/song/detail", {
            params: {
              ids: this.currentSong.id,
            },
          })
          .then((res) => {
           this.currentSong.picUrl = res.data.songs[0].al.picUrl;
            this.$emit("change-current-song", this.data);
          });
      }
    }
  }
};
</script>

<style lang="less" scoped>

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
}

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