export interface OptionsProps {
  label: string
  value: string
}

export interface InputProps {
  name: string
  control: any
  label: string
  setValue?: any
  variant?: 'outlined' | 'filled' | 'standard'
  options?: OptionsProps[]
  rest?: any
}
