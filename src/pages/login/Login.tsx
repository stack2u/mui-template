import React, { useState, useRef, useCallback } from 'react'

import {
  Box,
  Button,
  Card,
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

import { Link } from 'react-router-dom'

import * as Yup from 'yup'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import { useAuth } from '../../shared/hooks/auth'
import { useToast } from '../../shared/hooks/Toast'

import { VTextField } from '../../shared/components'

import getValidationErrors from '../../shared/utils/getValidationErrors'

import logo from '../../assets/logo.png'

interface ILoginData {
  email: string
  password: string
}

export const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()

  const { signIn } = useAuth()
  const theme = useTheme()

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = useCallback(
    async (data: ILoginData) => {
      try {
        formRef.current?.setErrors({})
        setLoading(true)

        const schema = Yup.object().shape({
          email: Yup.string().email().required('Email é obrigatório'),
          password: Yup.string().required('Senha é obrigatória'),
        })

        await schema.validate(data, { abortEarly: false })

        await signIn({ email: data.email, password: data.password })

        addToast({
          type: 'success',
          title: 'Bem Vindo (a)',
        })
      } catch (err: any) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)
        }

        addToast({
          type: 'error',
          title: 'Erro ao logar',
          description: 'Verifique suas credenciais',
        })
      } finally {
        setLoading(false)
      }
    },
    [signIn, addToast],
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
                        Entre com sua conta
                      </Typography>
                    </Divider>
                  </Box>
                  <Form ref={formRef} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <VTextField name="email" label="Email" type="email" />
                      </Grid>
                      <Grid item xs={12}>
                        <VTextField
                          name="password"
                          label="Password"
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
                        <Box
                          width="100%"
                          display="flex"
                          justifyContent="end"
                          marginRight={2}
                          marginBottom={2}
                        >
                          <Link
                            style={{
                              cursor: 'pointer',
                              textDecoration: 'none',
                            }}
                            to="/forgot-password"
                          >
                            <Typography variant="body2" color="primary">
                              Esqueci minha senha
                            </Typography>
                          </Link>
                        </Box>
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
                              Entrar
                            </Typography>
                          )}
                        </Button>
                      </Grid>
                      <Box
                        width="100%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        marginTop={2}
                      >
                        <Typography variant="body2">
                          Ainda não possui uma conta ?
                        </Typography>
                        <Link
                          style={{
                            cursor: 'pointer',
                            textDecoration: 'none',
                            marginLeft: '16px',
                          }}
                          to="/register"
                        >
                          <Typography variant="body2" color="primary">
                            Cadastre-se
                          </Typography>
                        </Link>
                      </Box>
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
