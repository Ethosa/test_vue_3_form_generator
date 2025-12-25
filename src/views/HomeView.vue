<template>
  <main>
    <FormGenerator
      v-model="data"
      :schema="schema"
    >
      <template #before-form>
        <h1>
          Регистрация
        </h1>
      </template>
    </FormGenerator>
  </main>
</template>


<script setup lang="ts">
import FormGenerator from '@/components/FormGenerator.vue'
import type { FormSchema } from '@/types/form'
import { ref } from 'vue'


const schema = ref<FormSchema>({
  fields: [
    {
      name: 'username',
      label: 'Имя пользователя',
      type: 'input',
      props: {
        placeholder: 'Юзернейм'
      }
    },
    {
      name: 'password',
      label: 'Пароль',
      type: 'input',
      props: {
        placeholder: '*****',
        type: 'password',
        autocomplete: 'new-password'
      }
    },
    {
      name: 'city',
      label: 'Москва',
      type: 'select',
      options: [
        { label: 'Москва', value: 'moscow' },
        { label: 'Санкт Петербург', value: 'petersburg' },
        { label: 'Красноярск', value: 'krasnoyarsk' },
      ]
    },
    {
      name: 'sex',
      label: 'Пол',
      type: 'radio',
      options: [
        { label: 'Муж', value: 'man' },
        { label: 'Жен', value: 'woman' },
      ]
    },
    {
      name: 'privacy_policy',
      label: 'Принимаю политику конфиденциальности',
      type: 'checkbox'
    },
  ]
})

const data = ref({
  username: '',
  password: '',
  sex: 'man',
  city: 'moscow',
  privacy_policy: false,
})

</script>


<style lang="scss" scoped>
main {
  width: 50%;
  max-width: 520px;
  display: flex;
  flex-direction: column;
}
</style>
