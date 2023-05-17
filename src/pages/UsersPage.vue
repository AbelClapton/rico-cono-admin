<template>
  <q-page :class="$q.screen.gt.sm ? 'q-pa-md' : ''">
    <q-table
      flat
      bordered
      title="Users"
      :columns="cols"
      :rows="users"
      :filter="filter"
      v-model:selected="selected"
      :selection="selection"
      :pagination="{
        rowsPerPage: 10,
      }"
      row-key="id"
      style="height: 100%"
      @row-contextmenu="(evt, row) => console.log(row)"
    >
      <template #top-left v-if="selection === 'multiple'">
        <div class="q-gutter-x-md">
          <q-btn label="Cancel" flat @click="onCancelSelect"></q-btn>
          <q-btn
            label="Delete"
            color="negative"
            :disable="!selected.length"
            @click="deleteUsers"
          ></q-btn>
        </div>
      </template>

      <template #top-right>
        <q-input dense debounce="300" v-model="filter" placeholder="Search">
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:header-selection="props">
        <q-checkbox v-model="props.selected" />
      </template>

      <template #body-selection="props">
        <q-checkbox v-model="props.selected" />
      </template>

      <template #body-cell-name="props">
        <td key="name" :props="props" class="sticky-column">
          <q-item
            clickable
            :to="{
              name: 'user.details',
              params: { id: props.row.id },
            }"
            class="flex items-center justify-start q-pa-none"
          >
            <span class="q-mr-sm">{{ props.row.name }}</span>
            <q-icon name="open_in_new" size="xs" />
          </q-item>
        </td>
      </template>

      <template #body-cell-actions="props">
        <q-td key="actions" :props="props">
          <q-btn flat round dense icon="more_horiz">
            <q-menu auto-close>
              <q-list style="min-width: 100px">
                <q-item
                  clickable
                  :to="{
                    name: 'user.edit',
                    params: { id: props.row.id },
                  }"
                >
                  <q-item-section avatar>
                    <q-icon name="edit" />
                  </q-item-section>
                  <q-item-section>Edit</q-item-section>
                </q-item>

                <q-item clickable @click="onSelect(props.row)">
                  <q-item-section avatar>
                    <q-icon name="check_box" />
                  </q-item-section>
                  <q-item-section>Select</q-item-section>
                </q-item>

                <q-separator />

                <q-item clickable>
                  <q-item-section avatar>
                    <q-icon name="email" />
                  </q-item-section>
                  <q-item-section>Send Password Recovery</q-item-section>
                </q-item>

                <q-item clickable>
                  <q-item-section avatar>
                    <q-icon name="email" />
                  </q-item-section>
                  <q-item-section>Send Magic Link</q-item-section>
                </q-item>

                <q-separator />

                <q-item
                  clickable
                  class="bg-red-1 text-red-9"
                  @click="deleteUser(props.row)"
                >
                  <q-item-section avatar>
                    <q-icon name="delete" />
                  </q-item-section>
                  <q-item-section>Delete</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="isDialogVisible" persistent>
      <q-card>
        <q-item>
          <q-item-section avatar>
            <q-avatar icon="delete" color="negative" text-color="white" />
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <div class="text-h5 q-mt-sm q-mb-xs">Confirm delete</div>
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-card-section>
          <div class="q-px-md">
            <p>
              Are you sure you want to delete the selected
              {{ deletingUser ? '' : selected.length }} user?
            </p>
            <p>This action cannot be undone.</p>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup @click="cancelDelete" />
          <q-btn
            label="Delete"
            color="primary"
            v-close-popup
            @click="confirmDelete"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { useClient } from '@vueauth/supabase'
import { useQuasar } from 'quasar'
import { ref, onMounted, Ref } from 'vue'

const $q = useQuasar()
const client = useClient()
const filter = ref('')
const users = ref([])
const cols = ref([
  {
    name: 'name',
    label: 'Name',
    field: 'name',
    align: 'true',
    headerClasses: 'text-left sticky-column',
  },
  {
    name: 'lastname',
    label: 'Lastname',
    field: 'lastname',
    align: 'true',
    headerClasses: 'text-left',
  },
  {
    name: 'email',
    label: 'E-mail',
    field: 'email',
    align: 'true',
    headerClasses: 'text-left',
  },
  {
    name: 'roleId',
    label: 'Role',
    field: (row) => row.role.name,
    format: (val) => val.charAt(0).toUpperCase() + val.slice(1),
  },
  {
    name: 'ci',
    label: 'Social ID',
    field: 'ci',
  },
  {
    name: 'phone',
    label: 'Phone',
    field: 'phone',
  },
  {
    name: 'actions',
    label: '',
    align: 'center',
  },
])

// #region selection
const selection: Ref<'none' | 'single' | 'multiple' | undefined> = ref('none')
const selected = ref([])
const onSelect = (user: never) => {
  selection.value = 'multiple'
  selected.value.push(user)
}
const onCancelSelect = () => {
  selection.value = 'none'
  selected.value = []
}
// #endregion

// #region user delete
const isDialogVisible = ref(false)
const isDeleteConfirmed = ref(false)
const deletingUser = ref()

const requestConfirmation = () => {
  if (isDeleteConfirmed.value) return true
  isDialogVisible.value = true
}

const deleteUser = async (user: null) => {
  if (user) deletingUser.value = user
  if (!requestConfirmation()) return

  const { error } = await client.auth.api.deleteUser(user.id)

  error
    ? $q.notify({ type: 'negative', message: error.message })
    : $q.notify({ type: 'positive', message: 'User deleted' })
}

const deleteUsers = async () => {
  if (!requestConfirmation()) return

  for (const { id } of selected.value) {
    const { error } = await client.auth.api.deleteUser(id)

    error
      ? $q.notify({ type: 'negative', message: error.message })
      : $q.notify({ type: 'positive', message: `User ${id} deleted` })
  }
}

const confirmDelete = async () => {
  isDeleteConfirmed.value = true

  deletingUser.value
    ? await deleteUser(deletingUser.value)
    : await deleteUsers()
}

const cancelDelete = () => {
  selected.value = []
}
// #endregion

onMounted(async () => {
  const { data, error } = await client.from('users').select('*, role:roles(*)')
  if (error) $q.notify({ type: 'negative', message: error.message })
  if (data) users.value = data
})
</script>

<style lang="sass" scoped>
.sticky-column
  background-color: #ddd !important
  position: sticky !important
  left: 0
  z-index: 1

.user-row
  cursor: pointer
</style>
