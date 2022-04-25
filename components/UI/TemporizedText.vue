<template lang="pug">
div {{ temporizedText }}
</template>

<script lang="ts" setup>
import {useTemporizingStore} from '/stores/temporizedStore'
const emit = defineEmits(['finished'])
const props = defineProps({
  text: {
    type: String,
    required: true
  },
  interval: {
    type: Number,
    default: 100,
  },
})

const temporizedStore = useTemporizingStore()
const temporizedText = ref('')

let pointer = 0
let staticInterval = props.interval

/**
 * useInterval to show temporized text 
 */
const { pause, resume, isActive } = useIntervalFn(() => {
  if(pointer >= props.text.length) {
    pause()
    emit('finished')
  } else {
    temporizedText.value += props.text.charAt(pointer)
    pointer++
  }
}, staticInterval)
pause()


defineExpose({
	resume
})
</script>