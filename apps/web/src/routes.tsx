import { Routes, Route, Navigate } from 'react-router'
import LoginPage from './pages/login'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace/>}/>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}