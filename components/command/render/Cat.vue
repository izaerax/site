<template lang="pug">
.cat 
  .content(v-for="content in results") {{ content }}<br>
  input(v-if="!args")
</template>

<script lang="ts" setup>
import { useFilesystemStore, FileType } from '~~/stores/filesystemStore';

const props = defineProps({
  args: {type: String, required: false}
})

const fsStore = useFilesystemStore()
let results = []
let file;

// for each filename in args try to run cat command
for (const fname of props.args?.trim().split(' ')) {
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

input, textarea {
  flex-grow: 1;
  border-width: 0px;
  color: $text-primary-color;
  background-color: rgba(0,0,0,0);
  padding-left: 9px;
}
*:focus {
  border-width: 0px;
  outline: none;
  outline-style: none;
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
}
</style>