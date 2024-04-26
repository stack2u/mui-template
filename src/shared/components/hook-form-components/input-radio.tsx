import React from 'react'

import { Controller } from 'react-hook-form'
import { InputProps } from './input-props'
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material'

export const InputRadio: React.FC<InputProps> = ({
  name,
  control,
  label,
  options,
}) => {
  const GenerateRadioOptions = () => {
    if (!options?.length) {
      return <FormControlLabel value="" label="" control={<Radio />} />
    }
    return options.map((singleOption, index) => (
      <FormControlLabel
        key={index}
        value={singleOption.value}
        label={singleOption.label}
        control={<Radio />}
      />
    ))
  }

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState,
        }) => (
          <RadioGroup value={value} onChange={onChange}>
            <GenerateRadioOptions />
          </RadioGroup>
        )}
      />
    </FormControl>
  )
}
