import { useState, useEffect, useRef } from 'react'
import { DownOutline } from 'antd-mobile-icons'
// import { Toast, ToastShowProps, Calendar } from 'antd-mobile';
import { BillItem } from '@/components/BillItem';
// import { get } from '@/utils'
import PopupDate from '@/components/PopupDate';
import PopupType from '@/components/PopupType';
import dayjs from 'dayjs'
import s from './style.module.less'

const Home = () => {
  const [list, setList] = useState([]); // 账单列表
  const [currentTime, setCurrentTime] = useState(dayjs().format("YYYY-MM-DD"))
  const monthRef = useRef(null)
  const [typeVisible, setTypeVisible] = useState(false)

  // 选择类型
  const typeToggle = () => {
    setTypeVisible(!typeVisible)
  }

  // 选择日期
  const monthToggle = () => {
    monthRef.current && monthRef.current.show()
  }
  const selectMonth = (date) => {
    setCurrentTime(date)
  }

  // 请求数据
  // useEffect(() => {
  //   get('/bill/list', {

  //   }).then(res => {
  //     console.log(res)
  //   }).catch((err: string | ToastShowProps) => {
  //     Toast.show(err)
  //   });
  // }, [])
  return <div className={s.home}>
    <div className={s.header}>
      <div className={s.dataWrap}>
        <span className={s.expense}>总支出：<b>¥ 200</b></span>
        <span className={s.income}>总收入：<b>¥ 500</b></span>
      </div>
      <div className={s.typeWrap}>
        <div className={s.left}>
          <span className={s.title} onClick={typeToggle}>类型 <DownOutline className={s.arrow} /></span>
        </div>
        <div className={s.right}>
          <span className={s.time} onClick={monthToggle}>{currentTime} <DownOutline className={s.arrow} /></span>
        </div>
      </div>
    </div>
    <div className={s.contentWrap}>
      { list.map((item, index) => {
        return <BillItem bill={item} key={index}></BillItem>
      })}
    </div>
    <PopupType show={typeVisible}></PopupType>
    <PopupDate ref={monthRef} onSelect={selectMonth}></PopupDate>
  </div>
}

export default Home
