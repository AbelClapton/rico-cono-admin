<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-grey-9" elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>Quasar {{ authProviderUpperFirst }}</q-toolbar-title>

        <q-btn icon="person" round flat>
          <AuthAccountMenu />
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list class="q-pa-md">
        <q-item-label header> Menu </q-item-label>

        <q-item
          v-for="link in accesibleLinks"
          :key="link.link"
          :to="link.link"
          tag="a"
          clickable
        >
          <q-item-section v-if="link.icon" avatar>
            <q-icon :name="link.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ link.title }}</q-item-label>
            <q-item-label caption>{{ link.caption }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { getDefaultProvider } from '@vueauth/core'
import AuthAccountMenu from 'src/auth/components/AccountMenu/AccountMenu.vue'
import { useAuthState } from '@vueauth/supabase'

const leftDrawerOpen = ref(false)
const authProvider = getDefaultProvider()
const authProviderUpperFirst =
  authProvider.charAt(0).toUpperCase() + authProvider.slice(1)
const { user } = useAuthState()

const links = [
  {
    title: 'Stock',
    caption: 'Product summary',
    icon: 'inventory',
    link: '/stock',
    accessLevel: 0,
  },
  {
    title: 'Products',
    caption: 'Relation of Products',
    icon: 'inventory_2',
    link: '/products',
    accessLevel: 0,
  },
  {
    title: 'Add Product',
    caption: 'Add a product to the stock',
    icon: 'post_add',
    link: '/products/new',
    accessLevel: 0,
  },
  {
    title: 'New Sale',
    caption: 'Create a sale entry',
    icon: 'add',
    link: '/sales/new',
    accessLevel: 0,
  },
  {
    title: 'Report Waste',
    caption: 'Release products as waste',
    icon: 'remove',
    link: '/waste',
    accessLevel: 1,
  },
  {
    title: 'Re-stock',
    caption: 'Create a re-stock entry',
    icon: 'local_shipping',
    link: '/restock',
    accessLevel: 1,
  },

  {
    title: 'Users',
    caption: 'Manage users accounts',
    icon: 'people',
    link: '/users',
    accessLevel: 2,
  },
  {
    title: 'Create Account',
    caption: 'Create a new user account',
    icon: 'person_add',
    link: '/users/new',
    accessLevel: 2,
  },

  {
    title: 'Records',
    caption: 'See application logs',
    icon: 'history',
    link: '/logs',
    accessLevel: 0,
  },
  {
    title: 'Statistics',
    caption: 'See application stats',
    icon: 'query_stats',
    link: '/stats',
    accessLevel: 2,
  },
]
const accesibleLinks = computed(() => {
  return links.filter(
    (link) => link.accessLevel <= user.value?.user_metadata.role.accessLevel
  )
})

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
