<template>
  <li class="song_item" @click.stop="$emit('change-current-song',data)">
    <slot></slot>
    <div class="left">
      <h3>
        {{ data.name
        }}<span v-for="alias in data.alias" :key="alias">{{ alias }}</span>
      </h3>
      <div class="info">
        <em></em>
        <i v-for="artiset in data.artists" :key="artiset.id">
          {{ artiset.name }}</i
        >
        <b>{{ data.album.name }}</b>
      </div>
    </div>
    <div class="player" :class="{current:currentSongId === data.id,playing:playing}">
      <i></i>
      <i></i>
      <i></i>
      <i></i>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      require:true,
    },
    currentSongId:{
      type:Number,
    },
    playing:Boolean,
  },
  computed: {
    data: function () {
      return {
        id: this.item.song?.id ? this.item.song.id : this.item.id,
        name: this.item.song?.name ? this.item.song.name : this.item.name,
        alias: this.item.song?.alias ? this.item.song.alias : this.item.alia,
        artists: this.item.song?.artists
          ? this.item.song.artists
          : this.item.ar,
        album: this.item.song?.album ? this.item.song.album : this.item.al,
        picUrl:this.item.picUrl? this.item.picUrl:this.item.al.picUrl
      };
    },
  },
  created: function () {
    //   console.log(this.item);
  },
};
</script>

<style lang="less" scoped>
.song_item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 12px;
  border-bottom: 1px solid rgba(172, 172, 172, 0.205);
  .left {
    flex: 1;
    padding: 6px 0;
    h3 {
      font-size: 16px;
      font-weight: normal;
      line-height: 1.6em;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      span {
        color: #888;
        &::before {
          content: "(";
        }
        &::after {
          content: ")";
        }
      }
    }
    .info {
      font-size: 12px;
      color: #888;
      line-height: 1.8em;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      text-overflow: ellipsis;

      em {
        font-style: normal;
        display: inline-block;
        width: 12px;
        height: 8px;
        background: url(../assets/img/index_icon_2x.png) no-repeat;
        background-size: 166px 97px;
      }
      i {
        font-style: normal;
        &::after {
          content: "/";
          margin: 0 5px;
        }
        &:last-of-type {
          &::after {
            content: "-";
          }
        }
      }
      b {
        font-weight: normal;
      }
    }
  }
  .player {
    width: 22px;
    height: 22px;
    margin: 0 12px;
    background: url("../assets/img/index_icon_2x.png") no-repeat -24px 0;
    background-size: 166px 97px;
    display: flex;
    align-items:flex-end;
    justify-content: space-evenly;
    &.current{
      background-image: none;
      &.playing{
        i{
          animation-play-state: running;
        }
      }
      i{
        width: 2px;
        height: 80%;
        background-color: red;
        animation: 1s playing linear alternate infinite paused;
        // animation-play-state: paused;
        &:nth-child(1){
          height: 90%;
           animation-delay: 0.9s;
        }
        &:nth-child(2){
          height: 80%;
           animation-delay: 0.6s;
        }
        &:nth-child(3){
          height: 70%;
         animation-delay: 0.3s;
        }
        &:nth-child(4){
          height: 80%;
          
         
        }
      }

    }
  }
}

@keyframes playing {
    from{
      height: 80%;
    }
    to{
      height: 20%;
    }
}
</style>