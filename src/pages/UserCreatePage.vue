<template>
  <q-page :class="$q.screen.gt.sm ? 'q-pa-md' : ''">
    <q-form @submit="onSubmit">
      <q-card class="q-pa-md">
        <div :class="$q.screen.gt.sm ? 'grid' : 'q-gutter-y-md'">
          <div class="q-pb-md">
            <!-- Contact Information -->
            <div class="q-pa-sm">
              <div class="text-h6">Contact Information</div>
              <q-separator class="q-mt-md" style="width: 80%" />
              <div class="q-mt-md" style="max-width: 300px">
                <div
                  :class="
                    $q.screen.gt.sm
                      ? 'q-gutter-y-md q-mt-md'
                      : 'q-gutter-y-sm q-mt-sm'
                  "
                >
                  <q-input
                    filled
                    dense
                    v-model="account.ci"
                    label="Social ID *"
                    lazy-rules
                    :rules="[required]"
                  />
                  <q-input
                    filled
                    dense
                    v-model="account.name"
                    label="Name *"
                    lazy-rules
                    :rules="[required]"
                  />
                  <q-input
                    class="q-pb-md"
                    filled
                    dense
                    v-model="account.lastname"
                    label="Last Name"
                    lazy-rules
                  />
                  <q-input
                    filled
                    dense
                    v-model="credentials.email"
                    type="email"
                    label="E-mail *"
                    lazy-rules
                    :rules="[email]"
                  >
                    <template #prepend>
                      <q-icon name="email" />
                    </template>
                  </q-input>
                  <q-input
                    filled
                    dense
                    v-model="account.phone"
                    label="Personal Number"
                  >
                    <template #prepend>
                      <q-icon name="phone" />
                    </template>
                  </q-input>
                </div>
              </div>
            </div>
          </div>
          <!-- End of Contact information -->

          <!-- Account privileges -->
          <div>
            <div class="q-pa-sm">
              <div class="text-h6">Account Privileges</div>
              <q-separator class="q-mt-md" style="width: 80%" />

              <div class="q-mt-md" style="max-width: 300px">
                <div class="q-mt-md">
                  <q-select
                    filled
                    dense
                    v-model="account.role"
                    :options="roles"
                    label="Role *"
                    option-label="name"
                    option-value="id"
                    lazy-rules
                    :rules="[(val) => val || 'Must select a role']"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- End of Account privileges -->

          <!-- Account Credentials -->
          <div class="">
            <div class="q-pa-sm">
              <div class="text-h6">Credentials</div>
              <q-separator class="q-mt-md" style="width: 80%" />

              <div class="q-mt-md" style="max-width: 300px">
                <div class="q-gutter-y-md q-mt-md">
                  <q-input
                    filled
                    dense
                    v-model="credentials.password"
                    :type="credentials.showPassword ? 'text' : 'password'"
                    label="Password *"
                    :rules="[required]"
                  >
                    <template #append>
                      <q-icon
                        :name="
                          credentials.showPassword
                            ? 'visibility'
                            : 'visibility_off'
                        "
                        style="cursor: pointer"
                        @click="togglePassword"
                      />
                    </template>
                  </q-input>
                  <q-input
                    filled
                    dense
                    v-model="credentials.passwordConfirm"
                    :type="credentials.showPassword ? 'text' : 'password'"
                    label="Confirm password *"
                    :rules="[
                      required,
                      (val) =>
                        match(
                          val,
                          credentials.password,
                          'Passwords must be the same'
                        ),
                    ]"
                  >
                    <template #append>
                      <q-icon
                        :name="
                          credentials.showPassword
                            ? 'visibility'
                            : 'visibility_off'
                        "
                        style="cursor: pointer"
                        @click="togglePassword"
                      />
                    </template>
                  </q-input>
                </div>
              </div>
            </div>
          </div>
          <!-- End of Account Credentials -->
        </div>

        <q-separator class="q-mt-md" />

        <div class="q-pt-sm q-gutter-x-sm" align="right">
          <q-btn
            label="discard"
            flat
            color="negative"
            @click="onDiscard"
          ></q-btn>
          <q-btn label="submit" color="primary" type="submit"></q-btn>
        </div>
      </q-card>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { useClient } from '@vueauth/supabase'
import { useQuasar } from 'quasar'
import { useValidators } from 'src/composables/useValidators'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const { required, email, match } = useValidators()
const router = useRouter()
const client = useClient()

const account = ref({
  name: '',
  lastname: '',
  ci: '',
  phone: '',
  role: null,
})
const credentials = ref({
  email: '',
  password: '',
  passwordConfirm: '',
  showPassword: false,
})
const roles = [
  { id: 1, name: 'Dependent', accessLevel: 0 },
  { id: 2, name: 'Manager', accessLevel: 1 },
  { id: 3, name: 'Admin', accessLevel: 2 },
]

const togglePassword = () => {
  credentials.value.showPassword = !credentials.value.showPassword
}

const onSubmit = async () => {
  const notify = $q.notify({ type: 'ongoing', message: 'Processing' })
  const { error } = await client.auth.api.createUser({
    email: credentials.value.email,
    password: credentials.value.password,
    user_metadata: account.value,
  })
  if (error) notify({ type: 'negative', message: error.message })
  else notify({ type: 'positive', message: 'User was created' })
}

const onDiscard = () => {
  router.back()
}
</script>

<style lang="sass">
.grid
  width: 80%
  display: grid
  grid-template-columns: 1fr 1fr
  grid-template-rows: auto

  > div:first-child
    grid-row-end: span 2
</style>
