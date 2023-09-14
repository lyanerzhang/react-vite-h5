import Login from "../container/Login/index.tsx";
import Home from '../container/Home/index.tsx';
import Data from '../container/Data/index.tsx';
import User from '../container/User/index.tsx';

const routes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/data",
    component: Data
  },
  {
    path: "/user",
    component: User
  }
]
export default routes;