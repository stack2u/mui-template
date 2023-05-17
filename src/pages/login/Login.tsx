import React, { useState } from 'react'

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  useTheme,
  Grid,
  TextField,
  Typography,
  Divider,
  InputAdornment,
  IconButton,
  Icon,
  Link,
} from '@mui/material'

import GoogleIcon from '@mui/icons-material/Google'
import FacebookIcon from '@mui/icons-material/Facebook'

import logo from '../../assets/logo.png'

import { useAuth } from '../../shared/hooks/auth'

export const Login: React.FC = () => {
  const { signIn } = useAuth()
  const theme = useTheme()

  const [showPassword, setShowPassword] = useState(false)

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
                  <Avatar
                    sx={{
                      height: theme.spacing(30),
                      width: theme.spacing(30),
                    }}
                    alt="Remy Sharp"
                    src={logo}
                  />

                  <Typography variant="h6" align="center">
                    Entre com sua conta
                  </Typography>

                  <Box
                    width="100%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      disableElevation
                      fullWidth
                    >
                      <GoogleIcon style={{ color: '#db4a39' }} />
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      disableElevation
                      fullWidth
                    >
                      <FacebookIcon style={{ color: '#3b5998' }} />
                    </Button>
                  </Box>

                  <Box width="100%">
                    <Divider>
                      <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary' }}
                      >
                        OU
                      </Typography>
                    </Divider>
                  </Box>

                  <TextField fullWidth label="Email" type="email" />
                  <TextField
                    fullWidth
                    label="Password"
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
                </Box>
              </CardContent>
              <CardActions>
                <Box width="100%">
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
                      }}
                      onClick={() => {
                        console.log('ok')
                      }}
                      underline="none"
                    >
                      <Typography variant="body2" color="primary">
                        Esqueci minha senha
                      </Typography>
                    </Link>
                  </Box>
                  <Box width="100%" display="flex" justifyContent="center">
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => signIn({ email: 'x', password: 'x' })}
                    >
                      Entrar
                    </Button>
                  </Box>
                  <Box
                    width="100%"
                    display="flex"
                    justifyContent="center"
                    marginTop={2}
                  >
                    <Typography variant="body2">
                      Ainda não possui uma conta ?{' '}
                      <Link
                        style={{
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          console.log('ok')
                        }}
                        underline="none"
                      >
                        Cadastre-se
                      </Link>
                    </Typography>
                  </Box>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
