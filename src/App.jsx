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
import { Goals } from './pages/goals'
import { MonthlyBudget } from './pages/monthly-budget'
import { Reports } from './pages/reports'
import { SettingsPage } from './pages/settings'
import { CategoryDetails } from './pages/category-details'
import { FinancialCalendar } from './pages/financial-calendar'
import { AccountsPayableReceivable } from './pages/accounts-payable-receivable'
import { ThemeProvider } from './components/theme/theme-provider'
import { PublicRouteWrapper } from './components/theme/public-route-wrapper'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRouteWrapper>
                <Home />
              </PublicRouteWrapper>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <PublicRouteWrapper>
                <Login />
              </PublicRouteWrapper>
            }
          ></Route>
          <Route
            path="/sign-up"
            element={
              <PublicRouteWrapper>
                <SignUp />
              </PublicRouteWrapper>
            }
          ></Route>
          <Route
            path="/recover-password"
            element={
              <PublicRouteWrapper>
                <RecoverPassword />
              </PublicRouteWrapper>
            }
          ></Route>
          <Route
            element={
              <ProtectedRoute>
                <ThemeProvider>
                  <AppLayout />
                </ThemeProvider>
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/accounts" element={<AccountsPayableReceivable />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/monthly-budget" element={<MonthlyBudget />} />
            <Route path="/financial-calendar" element={<FinancialCalendar />} />
            <Route
              path="/categories/:categoryName"
              element={<CategoryDetails />}
            />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
