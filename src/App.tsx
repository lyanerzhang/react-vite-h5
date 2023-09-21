import routes from './router/index';
import {
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import s from './App.module.less'

function App() {
  const [showNav, setShowNav] = useState(true)
  const location = useLocation()
  const { pathname } = location
  const needNav = ['/home', '/data', '/user']
  useEffect(() => {
    setShowNav(needNav.includes(pathname))
  }, [pathname])
  return (
    <div className={s.app}>
      <div className={s.contanier}>
        <Routes>
          { routes.map(route => <Route key={route.path } path={route.path} element={
            <route.component />
            }></Route>) }
        </Routes>
      </div>
      <div className={s.bottomBar} >
        <NavBar showNav={showNav}></NavBar>
      </div>
    </div>
  )
}

export default App
