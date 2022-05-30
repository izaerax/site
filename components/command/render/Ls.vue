<template lang="pug">
.ls
  .el(v-for="file of files" :key="1")
    div(:class="{'directory': file.type === 0, 'file': file.type===1}") {{ file.name }}
</template>

<script lang="ts" setup>
import { useFilesystemStore } from '~~/stores/filesystemStore';

const props = defineProps({
  args: { type: String, required: false },
})

//to avoid rerendering of el list.
const files = [...useFilesystemStore().getCurrentDir.files]

</script>

<style lang="scss" scoped>
.ls {

  .directory {
    color: $text-directory-color;
  }
  // .file {
  //   color: $text-file-color;
  // }
}
</style>