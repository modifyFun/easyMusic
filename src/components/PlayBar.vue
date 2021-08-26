<template>
  <div class="palybar" v-if="currentSong">
    <div class="music_pic" :class="{ playing: playing }">
      <div class="img">
          <img :src="currentSong.picUrl" alt="" />
      </div>
     
    </div>
    <div class="music_title">
      {{ currentSong.name
      }}<span v-for="artiset in currentSong.artists" :key="artiset.id">{{
        artiset.name
      }}</span>
    </div>
    <div class="music_player_btn">
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
    </div>
    <div class="music_list_btn">list</div>
  </div>
</template>

<script>
export default {
  props: {
    currentSong: Object,
    playing: Boolean,
    prencent:Number,

  },
  computed:{
    progress:function(){
        return (1-this.prencent)*2*3.14*13;
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
        img{
          animation-play-state: running;
        }
        
      }
    }
    .img {
          transition:transform  .4s ease-in;
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
    margin:0 10px;
    .circle{
      transform-origin: center;
      transform:rotate(-90deg);
    }
  }
  .music_list_btn {
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