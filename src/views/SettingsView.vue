<template>
  <main>
    <FormGenerator
      v-model="data"
      :schema="schema"
      @save="onSave"
    >
      <template #before-form>
        <h1>Настройки профиля</h1>
        <p class="subtitle">
          Управление внешним видом и поведением аккаунта
        </p>
      </template>

      <template #label-nickname="{ field }">
        <label class="label custom-label">
          {{ field.label }}
          <span class="hint">публичное имя</span>
        </label>
      </template>

      <template #input-nickname="{ value, update }">
        <input
          class="nickname-input"
          type="text"
          :value="value"
          placeholder="Как вас показывать другим"
          @input="update(($event.target as HTMLInputElement).value)"
        />
      </template>

      <template #field-theme="{ value, update }">
        <div class="theme-selector">
          <span class="label">Тема интерфейса</span>

          <button
            v-for="opt in themes"
            :key="opt.value"
            type="button"
            :class="['theme-btn', { active: value === opt.value }]"
            @click="update(opt.value)"
          >
            {{ opt.label }}
          </button>
        </div>
      </template>

      <template #form-actions>
        <div class="form-actions custom-actions">
          <button type="button" class="ghost" @click="reset">
            Сбросить
          </button>
          <button type="submit" class="primary">
            Применить
          </button>
        </div>
      </template>

      <template #after-form>
        <small class="footer">
          Изменения применяются сразу после сохранения
        </small>
      </template>
    </FormGenerator>
  </main>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import FormGenerator from '@/components/FormGenerator.vue'
import type { FormSchema } from '@/types/form'

const themes = [
  { label: 'Тёмная', value: 'dark' },
  { label: 'Светлая', value: 'light' },
  { label: 'Системная', value: 'system' },
]

const schema = ref<FormSchema>({
  fields: [
    {
      name: 'nickname',
      label: 'Никнейм',
      type: 'input',
    },
    {
      name: 'email_notifications',
      label: 'Email-уведомления',
      type: 'checkbox',
    },
    {
      name: 'theme',
      label: 'Тема',
      type: 'radio',
      options: [],
    },
  ],
})

const data = ref({
  nickname: '',
  email_notifications: true,
  theme: 'dark',
})

function onSave(value: Record<string, any>) {
  console.log('settings saved', value)
}

function reset() {
  data.value = {
    nickname: '',
    email_notifications: true,
    theme: 'dark',
  }
}
</script>


<style lang="scss">
main {
  max-width: 520px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.subtitle {
  font-size: 14px;
  color: #9ca3af;
}

.custom-label {
  display: flex;
  flex-direction: column;
}

.hint {
  font-size: 11px;
  color: #6b7280;
  font-weight: 400;
}

.nickname-input {
  width: 100%;
}

.theme-selector {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.theme-btn {
  padding: 10px;
  border-radius: 8px;
  background: #2f2f2f;
  border: 1px solid #3a3a3a;
  cursor: pointer;
  color: #f8f9f2;
}

.theme-btn.active {
  border-color: #6366f1;
  background: #3636aa;
}

.custom-actions {
  justify-content: space-between;
}

button.primary {
  background: #6366f1;
}

button.ghost {
  background: transparent;
  border: 1px solid #3a3a3a;
}

.footer {
  font-size: 12px;
  color: #6b7280;
}
</style>
