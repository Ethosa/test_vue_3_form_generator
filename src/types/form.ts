export type FieldType = 'input' | 'select' | 'checkbox' | 'textarea' | 'radio'

export interface BaseField {
  name: string
  label: string
  type: FieldType
  props?: Record<string, any>
}

export interface Option {
  label: string
  value: any
}

export interface SelectField extends BaseField {
  type: 'select'
  options: Option[]
}

export interface RadioField extends BaseField {
  type: 'radio'
  options: Option[]
}

export type FormField = BaseField | SelectField | RadioField

export interface FormSchema {
  fields: FormField[]
}
