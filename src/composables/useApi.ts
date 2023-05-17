import { useClient } from '@vueauth/supabase'
import { ref } from 'vue'

export const useApi = (entity: string) => {
  const client = useClient()
  const data = ref()
  const error = ref()
  const loading = ref(false)

  const save = async (instance: unknown) => {
    loading.value = true
    const { data: responseData, error: responseError } = await client
      .from(entity)
      .insert([instance])
      .select()
    loading.value = false

    if (responseError) error.value = responseError
    else if (responseData) data.value = responseData
  }

  const remove = async (instanceId: string) => {
    loading.value = true
    const { error: responseError } = await client
      .from(entity)
      .delete()
      .eq('id', instanceId)
    loading.value = false

    if (responseError) error.value = responseError
  }

  const fetchById = async (instanceId: string) => {
    loading.value = true
    const { data: responseData, error: responseError } = await client
      .from(entity)
      .select('*')
      .eq('id', instanceId)
    loading.value = false

    if (responseError) error.value = responseError
    else if (responseData) data.value = responseData
  }

  const fetchAll = async () => {
    loading.value = true
    const { data: responseData, error: responseError } = await client
      .from(entity)
      .select('*')
    loading.value = false

    if (responseError) error.value = responseError
    else if (responseData) data.value = responseData
  }

  return { data, error, loading, save, remove, fetchAll, fetchById }
}
