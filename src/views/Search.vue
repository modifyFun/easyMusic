<template>
  <div class="search" @scroll="lazyLoad">
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
    <SearchHotList v-show="!keywords" :hot="hot" @search="clickSearch" />
    <SearchHistory  v-show="!keywords" :history="history" @click-search="clickSearch" @del-histroy="delHistroy"/>
    <SearchSuggest
      v-show="keywords && suggests && !searched"
      :suggests="suggests"
      :keywords="keywords"
      @search="clickSearch"
    />

    <PlayList
      v-show="keywords && songs && searched"
      :playlist="songs"
      :playing="playing"
      :currentSongId="currentSongId"
      :hasNum="false"
      @change-current-song="changeCurrentSong"
    />
    <p v-if="keywords && songs && searched && !hasMore" class="end">你看到我的底线了</p>
  </div>
</template>

<script>
import SearchHotList from "@/components/SearchHotList.vue";
import SearchSuggest from "@/components/SearchSuggest.vue";
import SearchHistory from "@/components/SearchHistory.vue";
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
      searching: false,
      hasMore: true,
      isClickSearch:false,
      page: 0,
      history: JSON.parse(window.localStorage.getItem("history")) || [],
    };
  },
  watch: {
    keywords: function (keywords) {
     
      if(this.isClickSearch){
        this.isClickSearch = false;
        return ;
      }
      this.searched = false;
      //获取搜索推荐
      this.axios
        .get("http://apis.netstart.cn/music/search/suggest", {
          params: {
            keywords,
          },
        })
        .then((res) => {
          this.songs = [];
          this.page = 0;
          this.suggests = res.data.result?.songs;
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

      this.songs = [];
      this.page = 0;
    },
    clickSearch: function (keywords) {
      this.keywords = keywords;
      this.isClickSearch = true;
      this.search(this.keywords);
    },
    //搜索歌曲
    search: function (keywords) {
      if (typeof keywords == "object") {
        //按回车搜索时，keywords会变成事件对象
        keywords = this.keywords;
      }

      this.history= [...new Set([...this.history, keywords])];
      window.localStorage.setItem("history", JSON.stringify(this.history));

      //发送搜索请求
      this.axios
        .get("http://apis.netstart.cn/music/search", {
          params: {
            keywords,
            limit: 30,
            offset: this.page * 30,
          },
        })
        .then((res) => {
          this.songs.push(...res.data.result.songs);
          this.hasMore = res.data.result.hasMore;
          this.searched = true; //搜索完成修改完成标志
          this.searching = false;
          this.page++;
        });
    },
    lazyLoad: function (event) {
      if (
        event.target.scrollHeight -
          event.target.offsetHeight -
          event.target.scrollTop <
          20 &&
        !this.searching &&
        this.searched &&
        this.hasMore
      ) {
        this.searching = true;
        this.search(this.keywords);
      }
    },
    changeCurrentSong: function (item, songList) {
      this.$emit("change-current-song", item, songList);
    },
    delHistroy:function(val){
      console.log(val);

      let historySet = new Set([...this.history]);
      if(historySet.delete(val)){
        this.history = [...historySet];
      }
       window.localStorage.setItem("history", JSON.stringify(this.history));
      //  this.history= [...new Set([...this.history]).delete(val)];
      //  console.log(this.history);
      // window.localStorage.setItem("history", JSON.stringify(this.history));
    }
  },
  components: {
    SearchHotList,
    SearchSuggest,
    SearchHistory,
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
      -webkit-tap-highlight-color: transparent;
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
  .end {
    text-align: center;
    
    font-size: 12px;
    line-height: 40px;
    color: rgb(201, 201, 201);
  }
}
</style>>