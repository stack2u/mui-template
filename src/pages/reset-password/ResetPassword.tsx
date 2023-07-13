import React, { useState, useRef, useCallback } from 'react'

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
  InputAdornment,
  IconButton,
  Icon,
  CircularProgress,
} from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom'

import * as Yup from 'yup'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import logo from '../../assets/logo.png'

import { VTextField } from '../../shared/components'
import getValidationErrors from '../../shared/utils/getValidationErrors'
import { resetPassword } from '../../api/api'
import { useToast } from '../../shared/hooks/Toast'

interface IData {
  password: string
  password_confirmation: string
}

export const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const navigate = useNavigate()
  const { token = '' } = useParams<'token'>()

  if (!token) {
    navigate('/')
  }

  const theme = useTheme()

  const [loading, setLoading] = useState(false)

  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = useCallback(
    async (data: IData) => {
      try {
        setLoading(true)
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha Obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), undefined],
            'As senhas precisam ser iguais',
          ),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        await resetPassword({ token, password: data.password })

        addToast({
          type: 'success',
          title: 'Senha alterada com sucesso',
        })
        navigate('/')
      } catch (err: any) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)
        }

        addToast({
          type: 'error',
          title: 'Erro ao alterar a senha, verifique seus dados',
        })
      } finally {
        setLoading(false)
      }
    },
    [addToast, navigate, token],
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
                        Altere sua senha
                      </Typography>
                    </Divider>
                  </Box>
                  <Form ref={formRef} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <VTextField
                          name="password"
                          label="Nova senha"
                          type={showPassword ? 'text' : 'password'}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() =>
                                    setShowPassword((prev) => !prev)
                                  }
                                >
                                  {showPassword ? (
                                    <Icon>visibility</Icon>
                                  ) : (
                                    <Icon>visibility_off</Icon>
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <VTextField
                          name="password_confirmation"
                          label="Confirme sua nova senha"
                          type={showPassword ? 'text' : 'password'}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() =>
                                    setShowPassword((prev) => !prev)
                                  }
                                >
                                  {showPassword ? (
                                    <Icon>visibility</Icon>
                                  ) : (
                                    <Icon>visibility_off</Icon>
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Button fullWidth variant="contained" type="submit">
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
                              Alterar Senha
                            </Typography>
                          )}
                        </Button>
                      </Grid>
                      <Grid item xs={12}>
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
                            to="/forgot-password"
                          >
                            <Typography variant="body2" color="primary">
                              Solicitar novo token
                            </Typography>
                          </Link>
                        </Box>
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
                            <Typography variant="body2" color="secondary">
                              Voltar para login
                            </Typography>
                          </Link>
                        </Box>
                      </Grid>
                    </Grid>
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
