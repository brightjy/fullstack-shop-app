import './App.css'
import { Outlet, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import LandingPage from './pages/LandingPage'
import RegisterPage from './pages/RegisterPage'
import Navbar from './layout/NavBar'
import Footer from './layout/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Layout() {
  return (
    <div className='flex flex-col h-screen justify-between'>
      <ToastContainer
        position='bottom-right'
        theme='light'
        pauseOnHover
        autoClose={1500}
      />
      <Navbar />
      <main className='mb-auto w-10/12 max-w-4xl mx-auto'>
        <Outlet/>
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
