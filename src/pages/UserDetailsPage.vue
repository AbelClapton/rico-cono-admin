<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-md"> User details {{ id }} </q-card>
  </q-page>
</template>

<script setup lang="ts">
defineProps({
  id: String,
})
</script>
