import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Login } from './pages/auth/login'
import { SignUp } from './pages/auth/sign-up'
import { Home } from './pages/home'
import { Dashboard } from './pages/dashboard'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
