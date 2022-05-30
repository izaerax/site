<template lang="pug">
.cat 
  .content(v-for="content in results") {{ content }}<br>
</template>

<script lang="ts" setup>
import { useFilesystemStore, FileType } from '~~/stores/filesystemStore';

const props = defineProps({
  args: String
})

const fsStore = useFilesystemStore()
let results = []
let file;

//foreach filename in args try to run cat command
for (const fname of props.args.trim().split(' ')) {
  file = fsStore.getCurrentDir.files.find((el) => el.name === fname)
  if (file) {
    if (file.type === FileType.FILE) {
      results.push(`${file.content}\n`)
    } else {
      results.push(`cat: ${fname}: Is a directory`);
    }
  } else {
    results.push(`cat: ${fname}: No such file or directory`);
  }
}

</script>

<style lang="scss" scoped>
.content{
  white-space: pre-line;
}
</style>