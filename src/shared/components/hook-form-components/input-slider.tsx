import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'

import { InputProps } from './input-props'
import { FormLabel, Slider } from '@mui/material'

export const InputSlider = ({ name, control, setValue, label }: InputProps) => {
  const [sliderValue, setSliderValue] = useState<number>(30)

  useEffect(() => {
    if (sliderValue) setValue(name, sliderValue)
  }, [sliderValue, name, setValue])

  const handleChange = (event: any, newValue: number | number[]) => {
    setSliderValue(newValue as number)
  }

  return (
    <>
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState, formState }) => (
          <Slider
            value={sliderValue}
            onChange={handleChange}
            valueLabelDisplay="auto"
            min={0}
            max={100}
            step={1}
          />
        )}
      />
    </>
  )
}
