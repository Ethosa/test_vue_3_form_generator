<template>
  <main>
    <FormGenerator
      v-model="data"
      :schema="schema"
      @save="onSave"
    >
      <template #before-form>
        <h1>Заявка на участие</h1>
        <p class="subtitle">
          Заполните форму, чтобы мы связались с вами
        </p>
      </template>

      <template #after-form>
        <small class="hint">
          Нажимая «Сохранить», вы подтверждаете корректность данных
        </small>
      </template>
    </FormGenerator>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FormGenerator from '@/components/FormGenerator.vue'
import type { FormSchema } from '@/types/form'

const schema = ref<FormSchema>({
  fields: [
    {
      name: 'full_name',
      label: 'ФИО',
      type: 'input',
      props: {
        placeholder: 'Иванов Иван Иванович',
      },
    },
    {
      name: 'email',
      label: 'Email для связи',
      type: 'input',
      props: {
        type: 'email',
        placeholder: 'mail@example.com',
      },
    },
    {
      name: 'format',
      label: 'Формат участия',
      type: 'radio',
      options: [
        { label: 'Онлайн', value: 'online' },
        { label: 'Очно', value: 'offline' },
        { label: 'Пока не решил', value: 'unknown' },
      ],
    },
    {
      name: 'experience',
      label: 'Опыт в теме',
      type: 'select',
      options: [
        { label: 'Новичок', value: 'junior' },
        { label: 'Средний', value: 'middle' },
        { label: 'Продвинутый', value: 'senior' },
      ],
    },
    {
      name: 'about',
      label: 'Коротко о себе',
      type: 'textarea',
      props: {
        placeholder: 'Чем занимаетесь, почему интересно участие',
        rows: 4,
      },
    },
    {
      name: 'notifications',
      label: 'Получать уведомления о будущих событиях',
      type: 'checkbox',
    },
  ],
})

const data = ref({
  full_name: '',
  email: '',
  format: 'unknown',
  experience: 'junior',
  about: '',
  notifications: true,
})

function onSave(value: Record<string, any>) {
  console.log('form submit', value)
  alert('заявка принята')
}
</script>

<style scoped lang="scss">
main {
  width: 100%;
  max-width: 520px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.subtitle {
  color: #9ca3af;
  font-size: 14px;
}

.hint {
  display: block;
  margin-top: 12px;
  font-size: 12px;
  color: #6b7280;
}
</style>
