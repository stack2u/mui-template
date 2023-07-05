import { FC, useEffect, useState } from 'react'

import {
  Select as MuiSelect,
  FormControl,
  SelectProps,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material'
import { useField } from '@unform/core'

interface IOptionProps {
  value: string
  label: string
}

type VSelectProps = SelectProps & {
  name: string
  label?: string
  options: IOptionProps[]
}

export const VSelect: FC<VSelectProps> = ({
  name,
  label,
  options,
  ...rest
}) => {
  const { fieldName, registerField, defaultValue } = useField(name)

  const [value, setValue] = useState(defaultValue || '')
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string)
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    })
  }, [fieldName, registerField, value])

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="select-label">{label}</InputLabel>
        <MuiSelect
          {...rest}
          labelId="select-label"
          id="simple-select"
          value={value}
          label={label}
          onChange={handleChange}
        >
          {options.map((option: IOptionProps) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </MuiSelect>
      </FormControl>
    </>
  )
}
