<template lang="pug">
.ls
  .el(v-for="file of files" :key="file.name")
    div(:class="{'directory': file.type === 0, 'file': file.type===1}") {{ file.name }}
</template>

<script lang="ts" setup>
import { useFilesystemStore } from '~~/stores/filesystemStore';


const props = defineProps({
  args: { type: String, required: false },
})

const files = useFilesystemStore().getFiles

</script>

<style lang="scss" scoped>
.ls {
  .directory {
    color: $text-directory-color;
  }
  .file {
    color: $text-file-color;
  }
}
</style>