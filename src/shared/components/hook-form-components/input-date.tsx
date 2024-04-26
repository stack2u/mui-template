import { DatePicker } from '@mui/lab'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { Controller } from 'react-hook-form'
import { InputProps } from './input-props'

const DATE_FORMAT = 'dd-MMM-yyyy'

export const InputDate = ({ name, control, label }: InputProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState, formState }) => (
          <DatePicker
            fullWidth
            variant="inline"
            defaultValue={new Date()}
            id={`date-${Math.random()}`}
            label={label}
            refuse={/[^[a-zA-Z0-9-]*$]+/gi}
            autoOk
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            format={DATE_FORMAT}
            {...field}
          />
        )}
      />
    </LocalizationProvider>
  )
}
