<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()

    onMounted(() => {
      console.log(321)
    })
    return {

    }
  }
})
</script>

<template>
  <div>APP LAYOUT</div>
  <router-view />
</template>

