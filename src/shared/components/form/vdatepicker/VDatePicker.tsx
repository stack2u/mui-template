import React, { useRef, useState, useEffect } from 'react'

import { useField } from '@unform/core'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

interface IProps {
  name: string
  label: string
}

export const VDatePicker: React.FC<IProps> = ({ name, label, ...rest }) => {
  const datepickerRef = useRef(null)

  const { fieldName, registerField, defaultValue } = useField(name)

  const [value, setValue] = useState(defaultValue || null)

  const handleChange = (newDate: any) => {
    setValue(newDate.$d)
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datepickerRef.current,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
      clearValue: (ref: any) => {
        ref.clear()
      },
    })
  }, [fieldName, registerField, value, defaultValue])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        ref={datepickerRef}
        label={label}
        sx={{ width: '100%' }}
        onChange={handleChange}
        value={value}
        {...rest}
      />
    </LocalizationProvider>
  )
}
