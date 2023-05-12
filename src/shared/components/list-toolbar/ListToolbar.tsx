import React from 'react'

import { Box, Button, Icon, Paper, TextField, useTheme } from '@mui/material'

import { environment } from '../../environment'

interface IListToolBarProps {
  searchTextField?: string
  showTextField?: boolean
  onChangeTextField?: (newText: string) => void
  buttonText?: string
  showButton?: boolean
  onClickButton?: () => void
}

export const ListToolBar: React.FC<IListToolBarProps> = ({
  searchTextField = '',
  onChangeTextField,
  showTextField = false,
  buttonText = 'Novo',
  showButton = true,
  onClickButton,
}) => {
  const theme = useTheme()

  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      height={theme.spacing(5)}
      component={Paper}
    >
      {showTextField && (
        <TextField
          size="small"
          placeholder={environment.SEARCH_INPUT}
          value={searchTextField}
          onChange={(event) => onChangeTextField?.(event.target.value)}
        />
      )}

      <Box flex={1} display="flex" justifyContent="end">
        {showButton && (
          <Button
            variant="contained"
            color="primary"
            disableElevation
            endIcon={<Icon>add</Icon>}
            onClick={onClickButton}
          >
            {buttonText}
          </Button>
        )}
      </Box>
    </Box>
  )
}
