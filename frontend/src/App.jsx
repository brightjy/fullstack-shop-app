import './App.css'
import { Outlet, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import LandingPage from './pages/LandingPage'
import RegisterPage from './pages/RegisterPage'
import Navbar from './layout/NavBar'
import Footer from './layout/Footer'

function Layout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* 모두 */}
        <Route index element={<LandingPage />} />
        
        {/* 로그인 안한 사람 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  )
}

export default App
