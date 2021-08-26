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
    <ul class="home_songlist">
      <SongListItem
        v-for="item in songList"
        :key="item.id"
        :item="item"
        :playing="playing"
        :currentSongId="currentSongId"
        @change-current-song="$emit('change-current-song', $event,songList)"
      ></SongListItem>
    </ul>
    
  </div>
</template>


<style lang="less" scoped>
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
import SongListItem from "@/components/SongListItem.vue";
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
    SongListItem,
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
};
</script>
