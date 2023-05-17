<template>
  <q-page padding class="row q-gutter-md">
    <q-card class="col q-px-md">
      <h6><b>Data:</b> {{ users }}</h6>
      <h6><b>Error:</b> {{ usersError }}</h6>
      <q-btn
        color="primary"
        label="Fetch All"
        @click="fetchAllUsers"
        :loading="usersLoading"
      ></q-btn>
    </q-card>
  </q-page>
</template>

<script setup>
import { useApi } from 'src/composables/useApi'
const {
  data: users,
  loading: usersLoading,
  error: usersError,
  fetchAll: fetchAllUsers,
} = useApi('users')
</script>
