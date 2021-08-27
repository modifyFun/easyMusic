<template>
    <div class="home">
      <HomeTitle>编辑推荐</HomeTitle>
      <ul class="home_cardlist">
        <MusicListCard
          v-for="item in personalizeds"
          :key="item.id"
          :item="item"
        ></MusicListCard>
      </ul>
      <HomeTitle>最新音乐</HomeTitle>

      <PlayList
        :playlist="songList"
        :playing="playing"
        :currentSongId="currentSongId"
        :hasNum="false"
        @change-current-song="changeCurrentSong"
      />
    </div>
</template>


<style lang="less" scoped>
.home {
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  height: calc(100vh - 40px);
  padding-bottom: 40px;
  background-color: #fff;
  overflow: auto;
}
.home_cardlist {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
}
.home_songlist {
  padding-top: 10px;
}
</style>

<script>
import HomeTitle from "@/components/HomeTitle.vue";
import MusicListCard from "@/components/MusicListCard.vue";
// import SongListItem from "@/components/SongListItem.vue";
import PlayList from "@/components/PlayList.vue";
export default {
  name: "Home",
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
      personalizeds: [],
      songList: [],
    };
  },
  components: {
    HomeTitle,
    MusicListCard,
    PlayList,
  },
  created: function () {
    // 请求获取推荐歌单数据
    this.axios
      .get("http://apis.netstart.cn/music/personalized?limit=6")
      .then((res) => {
        this.personalizeds = res.data.result;
      });

    this.axios
      .get("http://apis.netstart.cn/music/personalized/newsong")
      .then((res) => {
        this.songList = res.data.result;
      });
  },
  methods: {
    //点击歌单列表进行播放时，向上传递当前歌曲对象及歌单列表
    changeCurrentSong: function (item, songList) {
      this.$emit("change-current-song", item, songList);
    },
  },
};
</script>
