import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Login } from './pages/auth/login'
import { SignUp } from './pages/auth/sign-up'
import { Home } from './pages/home'
import { Dashboard } from './pages/dashboard'
import { ProtectedRoute } from './components/auth/protected-route'
import { AuthProvider } from './contexts/AuthContext'
import { RecoverPassword } from './pages/auth/recover-password'
import { AppLayout } from './components/layout/app-layout'
import { Transactions } from './pages/transactions'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/recover-password" element={<RecoverPassword />}></Route>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            {/* <Route path="/metas" element={<Goals />} /> */}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
