import { useState, useCallback } from 'react'

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
import { Link, useNavigate, useParams } from 'react-router-dom'

import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import logo from '../../assets/logo.png'

import { resetPassword } from '../../api/api'
import { useToast } from '../../shared/hooks/Toast'
import { InputText } from '../../shared/components/hook-form-components/input-text'

interface IData {
  password: string
  password_confirmation: string
}

const resetPasswordValidationSchema = zod.object({
  password_confirmation: zod
    .string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres'),
  password: zod.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

type ResetPasswordFormType = zod.infer<typeof resetPasswordValidationSchema>

export const ResetPassword: React.FC = () => {
  const { addToast } = useToast()
  const navigate = useNavigate()
  const { token = '' } = useParams<'token'>()

  if (!token) {
    navigate('/')
  }

  const methods = useForm<ResetPasswordFormType>({
    resolver: zodResolver(resetPasswordValidationSchema),
    defaultValues: {
      password_confirmation: '',
      password: '',
    },
  })

  const { handleSubmit, control } = methods

  const theme = useTheme()

  const [loading, setLoading] = useState(false)

  const [showPassword, setShowPassword] = useState(false)

  const handleSubmitResetPassword = useCallback(
    async (data: IData) => {
      try {
        setLoading(true)

        await resetPassword({ token, password: data.password })

        addToast({
          type: 'success',
          title: 'Senha alterada com sucesso',
        })
        navigate('/')
      } catch (err: any) {
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
                    alt="Coollbarber"
                    width={theme.spacing(30)}
                    style={{
                      margin: 16,
                    }}
                  />

                  <Box width="100%" marginBottom={2} marginTop={2}>
                    <Divider>
                      <Typography variant="subtitle1">
                        Altere sua senha
                      </Typography>
                    </Divider>
                  </Box>
                  <form onSubmit={handleSubmit(handleSubmitResetPassword)}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <InputText
                          name="password"
                          label="Digite sua nova senha"
                          control={control}
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
                        <InputText
                          name="password_confirmation"
                          label="Confirme sua nova senha"
                          control={control}
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
                            <Typography variant="button">
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
                  </form>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
