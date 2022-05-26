<template lang="pug">
.mkdir
  .error(v-for="error in errors") mkdir: {{ error }}
</template>

<script lang="ts" setup>
import { useFilesystemStore } from '~~/stores/filesystemStore';


const props = defineProps({
  args: { type: String, required: false },
})

const filesystemStore = useFilesystemStore()
const errors = []
const dirs = []

for (const name of props.args.split(' ')) {
  if (filesystemStore.getCurrentDir.files.findIndex((el) => el.name === name) >= 0) {
    errors.push(`cannot create directory '${name}': File exists`)
  } else {
    dirs.push(name)
  }
}
filesystemStore.mkdir(dirs)

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