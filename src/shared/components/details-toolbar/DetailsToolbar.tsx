import React from 'react'

import {
  Box,
  Button,
  Divider,
  Icon,
  Paper,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'

interface IDetailsToolbarProps {
  textButtonNew?: string

  showNewButton?: boolean
  showBackButton?: boolean
  showSaveButton?: boolean
  showDeleteButton?: boolean
  showSalveAndCloseButton?: boolean

  showNewButtonLoading?: boolean
  showBackButtonLoading?: boolean
  showSaveButtonLoading?: boolean
  showDeleteButtonLoading?: boolean
  showSalveAndCloseButtonLoading?: boolean

  onClickNew?: () => void
  onClickBack?: () => void
  onClickDelete?: () => void
  onClickSave?: () => void
  onClickSaveAndClose?: () => void
}

export const DetailsToolbar: React.FC<IDetailsToolbarProps> = ({
  textButtonNew = 'Novo',
  showNewButton = true,
  showBackButton = true,
  showSaveButton = true,
  showDeleteButton = true,
  showSalveAndCloseButton = false,

  showNewButtonLoading = false,
  showBackButtonLoading = false,
  showSaveButtonLoading = false,
  showDeleteButtonLoading = false,
  showSalveAndCloseButtonLoading = false,

  onClickNew,
  onClickBack,
  onClickDelete,
  onClickSave,
  onClickSaveAndClose,
}) => {
  const theme = useTheme()

  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))

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
      {showSaveButton && !showSaveButtonLoading && (
        <Button
          variant="contained"
          color="primary"
          disableElevation
          startIcon={<Icon>save</Icon>}
          onClick={onClickSave}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Salvar
          </Typography>
        </Button>
      )}

      {showSaveButtonLoading && <Skeleton width={110} height={60} />}

      {showSalveAndCloseButton &&
        !showSalveAndCloseButtonLoading &&
        !smDown &&
        !mdDown && (
          <Button
            variant="outlined"
            color="primary"
            disableElevation
            startIcon={<Icon>save</Icon>}
            onClick={onClickSaveAndClose}
          >
            <Typography
              variant="button"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              Salvar e Voltar
            </Typography>
          </Button>
        )}

      {showSalveAndCloseButtonLoading && !smDown && !mdDown && (
        <Skeleton width={180} height={60} />
      )}

      {showDeleteButton && !showDeleteButtonLoading && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>delete</Icon>}
          onClick={onClickDelete}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Apagar
          </Typography>
        </Button>
      )}

      {showDeleteButtonLoading && <Skeleton width={110} height={60} />}

      {showNewButton && !showNewButtonLoading && !smDown && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>add</Icon>}
          onClick={onClickNew}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            {textButtonNew}
          </Typography>
        </Button>
      )}

      {showNewButtonLoading && !smDown && <Skeleton width={110} height={60} />}

      {showBackButton &&
        (showDeleteButton ||
          showNewButton ||
          showSalveAndCloseButton ||
          showSaveButton) && (
          <Divider variant="middle" orientation="vertical" />
        )}

      {showBackButton && !showBackButtonLoading && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>arrow_back</Icon>}
          onClick={onClickBack}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Voltar
          </Typography>
        </Button>
      )}

      {showBackButtonLoading && <Skeleton width={110} height={60} />}
    </Box>
  )
}
