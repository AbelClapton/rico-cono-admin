<template>
  <q-page :class="$q.screen.gt.sm ? 'q-pa-md' : ''">
    <q-table
      flat
      bordered
      dense
      separator="cell"
      :rows="rows"
      :columns="columns"
      :filter="filter"
      :fullscreen="fullscreen.isActive"
      row-key="name"
      v-model:selected="selected"
      binary-state-sort
      :selection="selection"
      style="max-height: 100vh"
    >
      <template #top-left>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template #top-right>
        <q-btn
          v-if="fullscreen.isCapable"
          flat
          round
          dense
          :icon="fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
          @click="fullscreen.toggle()"
        />
      </template>

      <!-- #region header slot -->
      <template #header="props">
        <q-tr
          class="sticky-header"
          :class="$q.screen.lt.sm ? 'one-sticky-column' : 'two-sticky-columns'"
          :props="props"
        >
          <q-th v-if="!$q.screen.lt.sm" style="padding: 0">
            <q-checkbox v-model="props.selected" />
          </q-th>
          <q-th
            v-for="{ name, label } of props.cols"
            :key="name"
            :props="props"
          >
            {{ label }}
          </q-th>
        </q-tr>
      </template>
      <!-- #endregion header slot -->

      <!-- #region body slot -->
      <template #body="props">
        <q-tr
          :props="props"
          :class="$q.screen.lt.sm ? 'one-sticky-column' : 'two-sticky-columns'"
          @click="onRowClick(props.row)"
          v-touch-hold="() => toggleRowSelection(props.row)"
        >
          <q-td v-if="!$q.screen.lt.sm" class="text-center" style="padding: 0">
            <q-checkbox v-model="props.selected" />
          </q-td>
          <q-td v-for="{ field } of props.cols" :key="field" :props="props">
            {{ props.row[field] }}
          </q-td>
        </q-tr>
      </template>
      <!-- #endregion body slot -->
    </q-table>

    <!-- #region floating action button -->
    <q-page-sticky
      v-if="$q.screen.lt.sm"
      position="bottom-right"
      :offset="[15, 15]"
    >
      <q-fab
        direction="up"
        color="primary"
        icon="menu"
        vertical-actions-align="right"
      >
        <q-fab-action
          icon="check_box"
          label="Select"
          external-label
          label-position="left"
          color="primary"
          outline
        />
        <q-fab-action
          icon="filter_alt"
          label="Filter"
          external-label
          label-position="left"
          color="primary"
          outline
        />
        <q-fab-action
          icon="add"
          label="Add"
          external-label
          label-position="left"
          color="primary"
          outline
        />
      </q-fab>
    </q-page-sticky>
    <!-- #endregion floating action button -->
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QTable, QTableProps, useQuasar } from 'quasar'
import { useSelection } from 'src/composables/useSelection'

const { selected, selection, isSelecting, toggleRowSelection } = useSelection()

// #region table props
const filter = ref('')
const { fullscreen } = useQuasar()
const columns = ref<QTableProps['columns']>([
  {
    name: 'name',
    required: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: 'name',
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'calories',
    align: 'center',
    label: 'Calories',
    field: 'calories',
    sortable: true,
  },
  {
    name: 'fat',
    label: 'Fat (g)',
    field: 'fat',
    sortable: true,
  },
  {
    name: 'carbs',
    label: 'Carbs (g)',
    field: 'carbs',
  },
  {
    name: 'protein',
    label: 'Protein (g)',
    field: 'protein',
  },
  {
    name: 'sodium',
    label: 'Sodium (mg)',
    field: 'sodium',
  },
  {
    name: 'calcium',
    label: 'Calcium (%)',
    field: 'calcium',
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: 'iron',
    label: 'Iron (%)',
    field: 'iron',
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
])
type StockItem = {
  name: string
  calories: number
  fat: number
  carbs: number
  protein: number
  sodium: number
  calcium: string
  iron: string
}
const rows = ref<StockItem[]>([
  {
    calories: 159,
    name: 'Frozen Yogurt',
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%',
  },
  {
    calories: 237,
    name: 'Ice cream sandwich',
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%',
  },
  {
    calories: 262,
    name: 'Eclair',
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%',
  },
  {
    calories: 305,
    name: 'Cupcake',
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%',
  },
  {
    calories: 356,
    name: 'Gingerbread',
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: '7%',
    iron: '16%',
  },
  {
    calories: 375,
    name: 'Jelly bean',
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: '0%',
    iron: '0%',
  },
  {
    calories: 392,
    name: 'Lollipop',
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: '0%',
    iron: '2%',
  },
  {
    calories: 408,
    name: 'Honeycomb',
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: '0%',
    iron: '45%',
  },
  {
    calories: 452,
    name: 'Donut',
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%',
  },
  {
    calories: 518,
    name: 'KitKat',
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%',
  },
])
// #endregion table props

const onRowClick = (item: StockItem) => {
  isSelecting.value ? toggleRowSelection(item) : console.log(item)
}
</script>

<style lang="sass" scoped>
.sticky-header
  background-color: #fff
  position: sticky
  top: 0
  z-index: 2

.one-sticky-column
  th:first-child,
  td:first-child
    background-color: #fff
    position: sticky
    left: 0
    z-index: 1

.two-sticky-columns
  th:nth-child(-n + 2),
  td:nth-child(-n + 2)
    background-color: #fff
    position: sticky
    left: 0
    z-index: 1

  th:nth-child(2),
  td:nth-child(2)
    left: 40px

.sticky-header
  .one-sticky-column
    th:first-child,
    td:first-child
      z-index: 3

  .two-sticky-columns
    th:nth-child(-n + 2),
    td:nth-child(-n + 2)
      z-index: 3
</style>
