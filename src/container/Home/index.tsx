import { useState, useEffect, useRef } from 'react'
import { DownOutline,EditSFill } from 'antd-mobile-icons'
import { Toast, ToastShowProps } from 'antd-mobile';
import { BillItem } from '@/components/BillItem';
import { get } from '@/utils'
import PopupDate from '@/components/PopupDate';
import PopupType from '@/components/PopupType';
import PopupAddBill from '@/components/PopupAddBill';
import dayjs from 'dayjs'
import s from './style.module.less'

const Home = () => {
  // 待开发： 下拉刷新，上拉加载下一页
  const monthRef = useRef(null) // 日期选择器
  const addRef = useRef(); // 添加账单 ref
  const [list, setList] = useState([]); // 账单列表
  const [currentTime, setCurrentTime] = useState(dayjs().format("YYYY-MM-DD"))
  const [currentType, setCurrentType] = useState("全部")
  const [currentTypeId, setCurrentTypeId] = useState("all")
  const [typeVisible, setTypeVisible] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0); // 分页总数
  const [totalExpense, setTotalExpense] = useState(0); // 总支出
  const [totalIncome, setTotalIncome] = useState(0); // 总收入

  // 选择类型
  const typeToggle = () => {
    setTypeVisible(!typeVisible)
  }
  const selectType = (type_id: string, type_name: string) => {
    setCurrentTypeId(type_id)
    setCurrentType(type_name)
  }

  // 选择日期
  const monthToggle = () => {
    monthRef.current && monthRef.current.show()
  }
  const selectMonth = (date: string) => {
    setCurrentTime(date)
  }

  // 添加账单
  const addToggle = () => {
    addRef.current && addRef.current.show()
  }

  // 请求数据
  useEffect(() => {
    get(`/bill/list?type_id=${currentTypeId}&date=${currentTime}&page=${page}&page_size=5`).then((res: any) => {
      setList(res.list)
      setTotalExpense(res.totalExpense)
      setTotalIncome(res.totalIncome)
      setTotalPage(res.total)
    }).catch((err: string | ToastShowProps) => {
      Toast.show(err)
    });
  }, [currentTypeId, currentTime, page])
  return <div className={s.home}>
    <div className={s.header}>
      <div className={s.dataWrap}>
        <span className={s.expense}>总支出：<b>¥ {totalExpense}</b></span>
        <span className={s.income}>总收入：<b>¥ {totalIncome}</b></span>
      </div>
      <div className={s.typeWrap}>
        <div className={s.left}>
          <span className={s.title} onClick={typeToggle}>{currentType} <DownOutline className={s.arrow} /></span>
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
    <div className={s.add} onClick={addToggle}>
      <EditSFill />
    </div>
    <PopupType show={typeVisible} getShow={ () => { setTypeVisible(false) } } onSelect={selectType}></PopupType>
    <PopupDate ref={monthRef} onSelect={selectMonth}></PopupDate>
    <PopupAddBill ref={addRef}></PopupAddBill>
  </div>
}

export default Home
