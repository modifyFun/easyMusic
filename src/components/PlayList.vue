<template>
  <ul v-if="playlist">
    <SongListItem
      v-for="(item, index) in playlist"
      :key="index"
      :item="item"
      :playing="playing"
      :currentSongId="currentSongId"
      @change-current-song="$emit('change-current-song', $event, playlist)"
    >
      <div
        class="num"
        :class="{ light: hightlight && index < 3 }"
        v-if="hasNum"
      >
        {{ (index + 1) > 9 ? (index + 1) : "0" + (index + 1) }}
      </div>
    </SongListItem>
  </ul>
</template>

<script>
import SongListItem from "@/components/SongListItem.vue";
export default {
  props: {
    hasNum: Boolean,
    hightlight: Boolean,
    playlist: Array,
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

<style lang="less" scoped>
.num {
  padding-right: 12px;
  font-size: 16px;
  color: #888;
  &.light {
    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(3) {
      color: #df3436;
    }
  }
}
</style>