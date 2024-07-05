import { useState, useCallback, useRef } from 'react'

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
  LinearProgress,
  useMediaQuery,
} from '@mui/material'

import { Link, useNavigate } from 'react-router-dom'

import { useToast } from '../../shared/hooks/Toast'

import logoBlack from '../../assets/logo-black.png'
import logoWhite from '../../assets/logo-white.png'
import background from '../../assets/background.png'

import { InputText } from '../../shared/components/hook-form-components/input-text'
import { forgotPassword } from '../../api/api'

const forgotPasswordValidationSchema = zod.object({
  email: zod.string().email('Digite um email válido'),
})

type ForgotPasswordFormType = zod.infer<typeof forgotPasswordValidationSchema>

export const ForgotPassword: React.FC = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const timeToBack = useRef<NodeJS.Timeout>()

  const { addToast } = useToast()

  const [loading, setLoading] = useState(false)

  const methods = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(forgotPasswordValidationSchema),
    defaultValues: {
      email: '',
    },
  })

  const { handleSubmit, control } = methods

  const handleSubmitForgotPassword = useCallback(
    async (data: ForgotPasswordFormType) => {
      try {
        setLoading(true)

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
                    alt="Coollbarber"
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
                    Esqueceu sua senha ?
                  </Typography>
                  <Divider style={{ marginTop: '8px' }} />
                </Box>

                <form onSubmit={handleSubmit(handleSubmitForgotPassword)}>
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
