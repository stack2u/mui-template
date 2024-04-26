import { useEffect, useState } from 'react'

import { Controller } from 'react-hook-form'
import { InputProps, OptionsProps } from './input-props'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
} from '@mui/material'

export const FormInputMultiCheckbox: React.FC<InputProps> = ({
  name,
  control,
  setValue,
  label,
  options,
}) => {
  const [selectedItems, setSelectedItems] = useState<any>([])

  const handleSelect = (value: any) => {
    const isPresent = selectedItems.indexOf(value)
    if (isPresent !== -1) {
      const remaining = selectedItems.filter((item: any) => item !== value)
      setSelectedItems(remaining)
    } else {
      setSelectedItems((prevItems: any) => [...prevItems, value])
    }
  }

  useEffect(() => {
    setValue(name, selectedItems)
  }, [selectedItems, name, setValue])

  return (
    <FormControl size={'small'} variant={'outlined'}>
      <FormLabel component="legend">{label}</FormLabel>

      <div>
        {options?.map((option: OptionsProps) => {
          return (
            <FormControlLabel
              control={
                <Controller
                  name={name}
                  render={({}) => {
                    return (
                      <Checkbox
                        checked={selectedItems.includes(option.value)}
                        onChange={() => handleSelect(option.value)}
                      />
                    )
                  }}
                  control={control}
                />
              }
              label={option.label}
              key={option.value}
            />
          )
        })}
      </div>
    </FormControl>
  )
}
