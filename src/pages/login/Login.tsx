import React, { useState, useCallback } from 'react'

import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Box,
  Button,
  useTheme,
  Grid,
  Typography,
  Divider,
  InputAdornment,
  IconButton,
  Icon,
  LinearProgress,
  useMediaQuery,
} from '@mui/material'

import { Link } from 'react-router-dom'

import { useAuth } from '../../shared/hooks/auth'
import { useToast } from '../../shared/hooks/Toast'

import logoBlack from '../../assets/logo-black.png'
import logoWhite from '../../assets/logo-white.png'
import background from '../../assets/background.png'
import { InputText } from '../../shared/components/hook-form-components/input-text'

const loginFormValidationSchema = zod.object({
  email: zod.string().email('Digite um email válido'),
  password: zod.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

type LoginFormType = zod.infer<typeof loginFormValidationSchema>

export const Login: React.FC = () => {
  const { addToast } = useToast()

  const { signIn } = useAuth()
  const theme = useTheme()

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const methods = useForm<LoginFormType>({
    resolver: zodResolver(loginFormValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { handleSubmit, control } = methods

  const handleSubmitLogin = useCallback(
    async (data: LoginFormType) => {
      try {
        setLoading(true)

        const result = await signIn({
          email: data.email,
          password: data.password,
        })

        console.log(result?.user)

        addToast({
          type: 'success',
          title: `Bem Vindo ${result?.user.name}`,
        })
      } catch (err: any) {
        addToast({
          type: 'error',
          title: 'Erro ao logar',
          description: 'Verifique suas credenciais',
        })
      } finally {
        setLoading(false)
      }
    },
    [addToast, signIn],
  )

  const mdDown = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexDirection={mdDown ? 'column' : 'row'}
    >
      <Box
        sx={{
          display: 'flex',
          backgroundImage: `url(${background})`,
          backgroundRepeat: 'no-repeat',
          height: `${mdDown ? '35vh' : '100vh'}`,
          width: `${mdDown ? '100vw' : '50%'}`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: '0.5',
          filter: 'blur(1px)',
          position: 'relative',
          objectFit: 'cover',
        }}
      />

      <Box
        width={mdDown ? '100%' : '50%'}
        height={mdDown ? '100%' : '100vh'}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Grid container margin={2}>
          <Grid
            item
            container
            width="100%"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box
                height="100%"
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={1}
              >
                <Box
                  width="100%"
                  marginBottom={2}
                  marginTop={2}
                  display="flex"
                  flexDirection="column"
                >
                  <img
                    src={mdDown ? logoWhite : logoBlack}
                    alt="Stack 2U"
                    width={mdDown ? '180px' : '200px'}
                    style={{
                      alignSelf: 'center',
                      marginTop: mdDown ? '64px' : '0px',
                      position: `${mdDown ? 'absolute' : 'relative'}`,
                      top: '0',
                    }}
                  />

                  <Typography
                    variant="h5"
                    marginTop={mdDown ? 0 : 2}
                    textAlign="center"
                  >
                    Entre com sua conta
                  </Typography>
                  <Divider style={{ marginTop: '8px' }} />
                </Box>

                <form onSubmit={handleSubmit(handleSubmitLogin)}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <InputText
                        name="email"
                        label="Digite seu email"
                        control={control}
                        type="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputText
                        name="password"
                        label="Digite sua senha"
                        type={showPassword ? 'text' : 'password'}
                        control={control}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword((prev) => !prev)}
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
                      {loading && <LinearProgress />}
                      <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        color="primary"
                      >
                        <Typography variant="button" color="white">
                          Entrar
                        </Typography>
                      </Button>
                    </Grid>
                    <Box
                      width="100%"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      marginTop={2}
                    >
                      <Typography variant="body2" display="flex">
                        Ainda não tem cadastro ?
                        <Link
                          to="/sign-up"
                          style={{
                            marginLeft: '10px',
                          }}
                        >
                          <Typography
                            variant="body2"
                            color="primary"
                            fontWeight="bold"
                          >
                            Cadastre-se
                          </Typography>
                        </Link>
                      </Typography>
                    </Box>
                  </Grid>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
