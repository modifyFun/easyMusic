<template>
  <!-- <ul class="playlists" v-if="playlist">
    <SongListItem
      v-for="(item,index) in playlist.tracks"
      :key="item.id"
      :item="item"
      :playing="playing"
      :currentSongId="currentSongId"
      @change-current-song="$emit('change-current-song', $event,playlist.tracks)"
    >
    <div class="num">{{index+1}}</div>
    </SongListItem>
  </ul> -->
<PlayList
      :playlist="playlist"
      :playing="playing"
      :currentSongId="currentSongId"
      :hasNum="true"
      @change-current-song="changeCurrentSong"
    />
</template>

<script>
import PlayList from "@/components/PlayList.vue";
export default {
  props: {
    playing: {
      type: Boolean,
      require: true,
    },
    currentSongId: {
      type: Number,
      require: true,
    },
  },
  data: function () {
    return {
      id: "",
      playlist: null,
    };
  },
  components: {
    PlayList,
  },
  methods: {
    //获取歌单详情
    getPlayListDetail: function (id) {
      this.axios
        .get("http://apis.netstart.cn/music/playlist/detail", {
          params: {
            id,
          },
        })
        .then((res) => {
          this.playlist = res.data.playlist;
          // console.log(this.playlist.tracks);
        });
    },
    //点击歌单列表进行播放时，向上传递当前歌曲对象及歌单列表
    changeCurrentSong:function(item, songList){
      this.$emit('change-current-song', item, songList);
    }
  },
  created: function () {
    this.getPlayListDetail(this.$route.query.id);
  },
};
</script>

<style lang="less" scoped>

// .num{
//   width: 28px;
//   font-size: 16px;
  
//   color: #888;
// }
</style>