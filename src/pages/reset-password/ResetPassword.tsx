import { useState, useCallback } from 'react'

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
  useMediaQuery,
  LinearProgress,
} from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import logoBlack from '../../assets/logo-black.png'
import logoWhite from '../../assets/logo-white.png'
import background from '../../assets/background.png'

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
        <Grid container margin={2} width="100%">
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
                    Altere sua senha
                  </Typography>
                  <Divider style={{ marginTop: '8px' }} />
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
                      <InputText
                        name="password_confirmation"
                        label="Confirme sua nova senha"
                        control={control}
                        type={showPassword ? 'text' : 'password'}
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
                      {loading && <LinearProgress />}
                      <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        disabled={loading}
                      >
                        <Typography variant="button" color="white">
                          Enviar reset
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
                        Voltar para
                        <Link
                          to="/"
                          style={{
                            marginLeft: '10px',
                          }}
                        >
                          <Typography
                            variant="body2"
                            color="primary"
                            fontWeight="bold"
                          >
                            Login
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
