import { Controller } from 'react-hook-form'
import { InputProps } from './input-props'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

export const FormInputDropdown: React.FC<InputProps> = ({
  name,
  control,
  label,
  options,
}) => {
  const generateSingleOptions = () => {
    return options?.map((option: any) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      )
    })
  }

  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Select onChange={onChange} value={value}>
            {generateSingleOptions()}
          </Select>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  )
}
