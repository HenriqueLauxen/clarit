import { Routes, Route, Navigate } from 'react-router'
import { useState } from 'react'

import LoginPage from './pages/entry/login'

export default function AppRoutes() {
  const [email, setEmail] = useState('')

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={email ? <Navigate to="/dashboard" replace /> : <LoginPage onVerified={setEmail} />} />
      <Route path="/signup" element={<Navigate to="/login" replace />} />
      <Route
        path="/dashboard"
        element={email ? (
          <main className="mx-auto max-w-5xl px-6 py-12">
            <h1 className="font-serif text-3xl">Visão geral</h1>
            <p className="mt-2 break-all text-sm text-muted-foreground">{email}</p>
          </main>
        ) : <Navigate to="/login" replace />}
      />
    </Routes>
  )
}
