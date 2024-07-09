import './App.css'
import { Outlet, Route, Routes, useLocation } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import LandingPage from './pages/LandingPage'
import RegisterPage from './pages/RegisterPage'
import Navbar from './layout/NavBar'
import Footer from './layout/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authUser } from './store/thunkFunctions'

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
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.user?.isAuth);
  const { pathname } = useLocation();

  useEffect(() => {
    if (isAuth) {
      dispatch(authUser());
    }
  }, [isAuth, pathname, dispatch]);

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
