<template>
  <ul class="playlists" v-if="playlist">
    <SongListItem
      v-for="item in playlist.tracks"
      :key="item.id"
      :item="item"
      :playing="playing"
      :currentSongId="currentSongId"
      @change-current-song="$emit('change-current-song', $event)"
    ></SongListItem>
  </ul>
</template>

<script>
import SongListItem from "@/components/SongListItem.vue";
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
    SongListItem,
  },
  methods: {
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
  },
  created: function () {
    this.getPlayListDetail(this.$route.query.id);
  },
};
</script>

<style lang="less" scoped>
</style>