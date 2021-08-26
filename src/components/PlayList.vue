<template>
  <ul v-if="playlist">
    <SongListItem
      v-for="(item, index) in playlist.tracks"
      :key="item.id"
      :item="item"
      :playing="playing"
      :currentSongId="currentSongId"
      @change-current-song="
        $emit('change-current-song', $event, playlist.tracks)
      "
    >
      <div class="num" v-if="hasNum">{{ index + 1 }}</div>
    </SongListItem>
  </ul>
</template>

<script>
import SongListItem from "@/components/SongListItem.vue";
export default {
  props: {
    hasNum: Boolean,
    playlist:Object,
    playing: {
      type: Boolean,
      require: true,
    },
    currentSongId: {
      type: Number,
      require: true,
    },
  },
  components: {
    SongListItem,
  },
};
</script>

<style>
.num {
  width: 28px;
  font-size: 16px;

  color: #888;
}
</style>