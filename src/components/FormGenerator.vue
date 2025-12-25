<template>
  <form class="form-generator" @submit.prevent="onSave">
    <slot name="before-form" />

    <template
      v-for="field in schema.fields"
      :key="field.name"
      class="form-field"
    >
      <slot
        :name="`field-${field.name}`"
        :field="field"
        :value="model[field.name]"
        :update="(v: any) => updateField(field.name, v)"
      >
        <slot
          :name="`label-${field.name}`"
          :field="field"
        >
          <label class="label">{{ field.label }}</label>
        </slot>

        <slot
          :name="`input-${field.name}`"
          :field="field"
          :value="model[field.name]"
          :update="(v: any) => updateField(field.name, v)"
        >
          <input
            v-if="field.type === 'input'"
            v-bind="field.props"
            :value="model[field.name]"
            @input="updateField(field.name, ($event.target as HTMLInputElement).value)"
          />

          <textarea
            v-else-if="field.type === 'textarea'"
            v-bind="field.props"
            :value="model[field.name]"
            @input="updateField(field.name, ($event.target as HTMLTextAreaElement).value)"
          />

          <div v-else-if="field.type === 'select'" class="select-wrapper">
            <select
              :value="model[field.name]"
              @change="updateField(field.name, ($event.target as HTMLSelectElement).value)"
            >
              <option
                v-for="opt in (field as SelectField).options"
                :key="opt.value"
                :value="opt.value"
              >
                {{ opt.label }}
              </option>
            </select>
            <span class="select-arrow"></span>
          </div>

          <label v-else-if="field.type === 'checkbox'" class="check-control">
            <input
              type="checkbox"
              :checked="model[field.name]"
              @change="updateField(field.name, ($event.target as HTMLInputElement).checked)"
            />
            <span class="check-box"></span>
            <span class="check-label">{{ field.label }}</span>
          </label>

          <!-- radio -->
          <div v-else-if="field.type === 'radio'" class="radio-group">
            <label
              v-for="opt in (field as RadioField).options"
              :key="opt.value"
              class="radio-control"
            >
              <input
                type="radio"
                :name="field.name"
                :value="opt.value"
                :checked="model[field.name] === opt.value"
                @change="updateField(field.name, opt.value)"
              />
              <span class="radio-box"></span>
              <span class="radio-label">{{ opt.label }}</span>
            </label>
          </div>
        </slot>
      </slot>
    </template>

    <slot name="form-actions">
      <div class="form-actions">
        <button type="submit">Сохранить</button>
        <button type="button" @click="onCancel">Отмена</button>
      </div>
    </slot>

    <slot name="after-form" />
  </form>
</template>


<script setup lang="ts">
import type { FormSchema, RadioField, SelectField } from '@/types/form'

defineProps<{
  schema: FormSchema
}>()

const emit = defineEmits<{
  (e: 'save', value: Record<string, any>): void
  (e: 'cancel'): void
}>()

const model = defineModel<Record<string, any>>({
  default: () => ({}),
})

function updateField(name: string, value: any) {
  model.value[name] = value
}

function onSave() {
  emit('save', model.value)
}

function onCancel() {
  emit('cancel')
}
</script>


<style scoped lang="scss">
@use '@/assets/styles/components/form-generator.scss';
</style>
