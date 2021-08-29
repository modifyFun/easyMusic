<template>
  <div class="search">
    <div class="search_input">
      <i>&#xe635;</i>
      <input
        type="text"
        name="search_input"
        v-model.trim="keywords"
        @keypress.enter="search"
        placeholder="搜索歌曲、歌手、专辑"
      />
      <em v-show="keywords" @click="clear">&#xed65;</em>
    </div>
    <SearchHotList v-show="!keywords" :hot="hot" @search="search" />
    <SearchSuggest
      v-show="keywords && suggests && !searched"
      :suggests="suggests"
      :keywords="keywords"
      @search="search"
    />
    <PlayList
      v-show="keywords && songs && searched"
      :playlist="songs"
      :playing="playing"
      :currentSongId="currentSongId"
      :hasNum="false"
      @change-current-song="changeCurrentSong"
    />
  </div>
</template>

<script>
import SearchHotList from "@/components/SearchHotList.vue";
import SearchSuggest from "@/components/SearchSuggest.vue";
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
      hot: [],
      suggests: [],
      songs: [],
      keywords: "",
      searched: false,
    };
  },
  watch: {
    keywords: function (keywords) {
      //获取搜索推荐
      this.axios
        .get("http://apis.netstart.cn/music/search/suggest", {
          params: {
            keywords,
          },
        })
        .then((res) => {
          this.suggests = res.data.result?.songs;
          this.searched = false;
        });
    },
  },
  created: function () {
    //获取热门搜索
    this.axios.get("http://apis.netstart.cn/music/search/hot").then((res) => {
      this.hot = res.data.result.hots;
    });
  },
  methods: {
    //清空输入栏
    clear: function () {
      this.keywords = "";
      this.searched = false;
    },
    //搜索歌曲
    search: function (keywords) {
      if (typeof keywords == "object") {
        keywords = this.keywords;
      } else {
        this.keywords = keywords;
      }

      this.axios
        .get("http://apis.netstart.cn/music/search", {
          params: {
            keywords,
          },
        })
        .then((res) => {
          this.songs = res.data.result.songs;
          this.searched = true;
        });
    },
    changeCurrentSong: function (item, songList) {
      this.$emit("change-current-song", item, songList);
    },
  },
  components: {
    SearchHotList,
    SearchSuggest,
    PlayList,
  },
};
</script>

<style lang="less" scoped>
.search {
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 100vw;
  height: calc(100vh - 40px);
  padding-bottom: 40px;
  background-color: #fff;
  overflow: auto;
  .search_input {
    font-family: "iconfont";
    display: flex;
    justify-content: center;
    margin: 16px 12px;
    height: 30px;
    background: rgb(235, 236, 236);
    border-radius: 15px;
    input {
      flex: 1;
      width: calc(100% - 24px);
      background-color: transparent;
      border: none;
      outline: none;
      font-size: 14px;
    }
    i,
    em {
      width: 30px;
      font-style: normal;
      color: rgb(201, 201, 201);
      text-align: center;
      font-size: 14px;
      line-height: 30px;
    }
  }
}
</style>>