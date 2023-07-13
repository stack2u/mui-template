import React, { useRef, useCallback, useState } from 'react'

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  useTheme,
  Grid,
  Typography,
  Divider,
  CircularProgress,
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

import * as Yup from 'yup'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import logo from '../../assets/logo.png'

import { VTextField } from '../../shared/components'
import getValidationErrors from '../../shared/utils/getValidationErrors'
import { useToast } from '../../shared/hooks/Toast'
import { forgotPassword } from '../../api/api'

interface IData {
  email: string
}

export const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const navigate = useNavigate()
  const timeToBack = useRef<NodeJS.Timeout>()

  const theme = useTheme()

  const [loading, setLoading] = useState(false)

  const handleSubmit = useCallback(
    async (data: IData) => {
      try {
        formRef.current?.setErrors({})
        setLoading(true)

        const schema = Yup.object().shape({
          email: Yup.string().email().required('Email é obrigatório'),
        })

        await schema.validate(data, { abortEarly: false })

        await forgotPassword(data.email)

        addToast({
          type: 'success',
          title: 'Verifique seu email para resetar sua senha !',
        })

        if (timeToBack.current) {
          clearTimeout(timeToBack.current)
        }

        timeToBack.current = setTimeout(() => {
          navigate('/')
        }, 2000)
      } catch (err: any) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)
        }

        addToast({
          type: 'error',
          title: 'Algo deu errado',
          description:
            'Tente novamente, verifique se o email informado está correto !',
        })
      } finally {
        setLoading(false)
      }
    },
    [addToast, navigate],
  )

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Grid container margin={2}>
        <Grid
          item
          container
          width="100%"
          spacing={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
            <Card>
              <CardContent>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  gap={1}
                >
                  <img
                    src={logo}
                    alt="Estradas Verdes"
                    width={theme.spacing(30)}
                    style={{
                      margin: 16,
                    }}
                  />

                  <Box width="100%" marginBottom={2} marginTop={2}>
                    <Divider>
                      <Typography
                        variant="subtitle1"
                        sx={{ color: 'text.secondary' }}
                      >
                        Digite seu email pra receber o token
                      </Typography>
                    </Divider>
                  </Box>
                  <Form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    style={{ width: '100%' }}
                  >
                    <VTextField
                      name="email"
                      label="Email"
                      type="email"
                      fullWidth
                    />

                    <Button
                      fullWidth
                      variant="contained"
                      type="submit"
                      style={{ marginTop: '16px' }}
                    >
                      {loading ? (
                        <CircularProgress
                          color="inherit"
                          style={{ height: '24px', width: '24px' }}
                        />
                      ) : (
                        <Typography
                          variant="button"
                          color={theme.palette.background.paper}
                        >
                          Enviar Token
                        </Typography>
                      )}
                    </Button>

                    <CardActions>
                      <Box width="100%">
                        <Box
                          width="100%"
                          display="flex"
                          justifyContent="center"
                          marginTop={2}
                        >
                          <Link
                            style={{
                              cursor: 'pointer',
                              textDecoration: 'none',
                            }}
                            to="/"
                          >
                            <Typography variant="body2" color="primary">
                              Voltar
                            </Typography>
                          </Link>
                        </Box>
                      </Box>
                    </CardActions>
                  </Form>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
