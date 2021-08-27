<template>
  <div class="playlists">
    <PlayList
      v-if="playlists"
      :playlist="playlists.tracks"
      :playing="playing"
      :currentSongId="currentSongId"
      :hasNum="true"
      @change-current-song="changeCurrentSong"
    />
  </div>
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
      playlists: null,
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
          this.playlists = res.data.playlist;
          // console.log(this.playlist.tracks);
        });
    },
    //点击歌单列表进行播放时，向上传递当前歌曲对象及歌单列表
    changeCurrentSong: function (item, songList) {
      this.$emit("change-current-song", item, songList);
    },
  },
  created: function () {
    this.getPlayListDetail(this.$route.query.id);
  },
};
</script>

<style lang="less" scoped>
.playlists {
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  padding-bottom: 40px;
  overflow: auto;
  background-color: #fff;
}
// .num{
//   width: 28px;
//   font-size: 16px;

//   color: #888;
// }
</style>