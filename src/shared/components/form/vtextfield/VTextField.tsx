import { useEffect, useState, FC } from 'react'
import { TextField, TextFieldProps } from '@mui/material'
import { useField } from '@unform/core'

import { formatDocumento, formatTelefone } from '../../../utils/masks'

type VTextFieldProps = TextFieldProps & {
  name: string
  label?: string
}

export const VTextField: FC<VTextFieldProps> = ({ name, label, ...rest }) => {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField(name)

  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    })

    if (fieldName === 'cnpj' || fieldName === 'cpf') {
      setValue(formatDocumento(value))
    }
    if (fieldName === 'phone') {
      setValue(formatTelefone(value))
    }
  }, [registerField, fieldName, value])

  return (
    <>
      <TextField
        {...rest}
        fullWidth
        label={label}
        error={!!error}
        helperText={error}
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value)
          rest.onChange?.(e)
        }}
        onKeyDown={(e) => {
          error && clearError()
          rest.onKeyDown?.(e)
        }}
      />
    </>
  )
}
