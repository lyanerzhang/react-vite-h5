import Login from "../container/Login/index.tsx";
import Home from '../container/Home/index.tsx';
import Data from '../container/Data/index.tsx';
import User from '../container/User/index.tsx';
import UserInfo from '../container/UserInfo/index.tsx';
import Detail from "../container/Detail/index.tsx";

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
  },
  {
    path: "/userinfo",
    component: UserInfo
  },
  {
    path: "/detail",
    component: Detail
  }
]
export default routes;