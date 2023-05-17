<template>
  <div class="text-h6">Product Details Page</div>
  <div class="text-subtitle2">Seeing product with id {{ id }}</div>
</template>

<script setup lang="ts">
defineProps({
  id: String,
})
</script>
