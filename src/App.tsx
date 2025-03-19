import routes from './router/index';
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import NavBar from '@/components/NavBar';
import qs from 'query-string';
import s from './App.module.less'

function App() {
  const [showNav, setShowNav] = useState(true)
  const location = useLocation()
  const { pathname } = location
  const needNav = ['/home', '/data', '/user']
  const { search } = useLocation()
  useEffect(() => {
    setShowNav(needNav.includes(pathname))
  }, [pathname])
  return (
    <Provider store={store}>
      <div className={s.app}>
        <div className={s.contanier}>
          <Routes>
            { routes.map(
              route =>
                <Route key={route.path } path={route.path} element={<route.component />}>
                </Route>
              )
            }
          </Routes>
        </div>
        <div className={s.bottomBar} >
          <NavBar showNav={showNav} tabName={qs.parse(search).tab}></NavBar>
        </div>
      </div>
    </Provider>
  )
}

export default App
