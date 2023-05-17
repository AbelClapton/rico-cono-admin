<template>
  <div class="text-h6">Product Edit Page</div>
  <div class="text-subtitle2">Editing product with id {{ id }}</div>
</template>

<script setup lang="ts">
defineProps({
  id: String,
})
</script>
