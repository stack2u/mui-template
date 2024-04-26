import React from 'react'

import { Routes, Route, Navigate } from 'react-router-dom'
import { Login, ForgotPassword, ResetPassword, SignUp } from '../pages'

export const OpenRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
