import { useState } from 'react';
import NavBar from "@/components/NavBar";
import Data from "@/container/Data";
import User from "@/container/User";
import Bill from "@/container/Bill";
import s from './style.module.less'

export default function Index() {
  const [activeKey, setActiveKey] = useState("/");
  const renderCom = () => {
    if (activeKey === "/data") {
      return <Data></Data>
    } else if (activeKey === "/user") {
      return <User></User>
    } else {
      return <Bill></Bill>
    }
  }

  return (
    <div className={s.index}>
      <div className={s.home}>
        {
          renderCom()
        }
      </div>
      <NavBar className={s.bottomBar} getCurTab={(v: string) => {
        setActiveKey(v)
      }}></NavBar>
    </div>
  )
}