import { ref } from 'vue'
import { QTableProps } from 'quasar'

export const useSelection = (type: QTableProps['selection'] = 'multiple') => {
  const selected = ref<unknown[]>([])
  const selection = ref(type)
  const isSelecting = ref(false)

  // selection state methods
  const startSelection = (item: unknown) => {
    isSelecting.value = true
    selected.value.push(item)
  }
  const endSelection = () => {
    selected.value = []
    isSelecting.value = false
  }
  const toggleSelection = () => {
    isSelecting.value = !isSelecting.value
  }

  // selected items state methods
  const toggleRowSelection = (item: unknown) => {
    const index = selected.value.indexOf(item)
    index >= 0 ? selected.value.splice(index, 1) : startSelection(item)
    if (selected.value.length === 0) endSelection()
  }

  return {
    selected,
    selection,
    isSelecting,
    startSelection,
    endSelection,
    toggleSelection,
    toggleRowSelection,
  }
}
