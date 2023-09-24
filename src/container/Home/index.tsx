import { useState, useEffect, useRef } from 'react'
import { DownOutline,EditSFill } from 'antd-mobile-icons'
import { Toast, ToastShowProps, InfiniteScroll } from 'antd-mobile';
import { BillItem } from '@/components/BillItem';
import { get } from '@/utils'
import PopupMonth from '@/components/PopupMonth';
import PopupType from '@/components/PopupType';
import PopupAddBill from '@/components/PopupAddBill';
import dayjs from 'dayjs'
import s from './style.module.less'

const Home = () => {
  // 待开发： 下拉刷新，上拉加载下一页
  const monthRef = useRef(null) // 日期选择器
  const addRef = useRef(); // 添加账单 ref
  const [list, setList] = useState([]); // 账单列表
  const [currentMonth, setCurrentMonth] = useState(dayjs().format("YYYY-MM"))
  const [currentType, setCurrentType] = useState("全部")
  const [currentTypeId, setCurrentTypeId] = useState("all")
  const [typeVisible, setTypeVisible] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0); // 分页总数
  const [totalExpense, setTotalExpense] = useState(0); // 总支出
  const [totalIncome, setTotalIncome] = useState(0); // 总收入
  const [hasMore, setHasMore] = useState(true)

  // 选择类型
  const typeToggle = () => {
    setTypeVisible(!typeVisible)
  }
  const selectType = (type_id: string, type_name: string) => {
    setPage(1);
    setCurrentTypeId(type_id)
    setCurrentType(type_name)
  }

  // 选择日期
  const monthToggle = () => {
    monthRef.current && monthRef.current.show()
  }
  const selectMonth = (date: string) => {
    setPage(1);
    setCurrentMonth(date)
  }

  // 添加账单
  const addToggle = () => {
    addRef.current && addRef.current.show()
  }

  // 加载更多
  async function loadMore() {
    console.log("loadmore")
    if (page >= totalPage) {
      setHasMore(false)
    }
    await getBill()
    setPage(page + 1)
  }

  // 获取账单
  const getBill = () => {
    return new Promise((resolve, reject) => {
      get(`/bill/list?type_id=${currentTypeId}&date=${currentMonth}&page=${page}&page_size=5`).then((res: any) => {
        if (page == 1) {
          setList(res.list)
        } else {
          setList(list.concat(res.list))
        }
        setTotalExpense(res.totalExpense)
        setTotalIncome(res.totalIncome)
        setTotalPage(res.total)
        resolve(res.list.length)
      }).catch((err: string | ToastShowProps) => {
        Toast.show(err)
        reject(false)
      });
    })
  }

  const useUpdateEffect = (fn: { (): Promise<unknown>; (): void; }, inputs: any[]) => {
    const didMountRef = useRef(false);
    useEffect(() => {
      if (didMountRef.current) fn();
      else didMountRef.current = true;
    }, inputs);
  };
  useUpdateEffect(getBill, [currentTypeId, currentMonth])
  // 请求数据
  // useEffect(() => {
  //   getBill()
  //   console.log(222)
  // }, [currentTypeId, currentMonth])
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
          <span className={s.time} onClick={monthToggle}>{currentMonth} <DownOutline className={s.arrow} /></span>
        </div>
      </div>
    </div>
    <div className={s.contentWrap}>
      { list.map((item, index) => {
        return <BillItem bill={item} key={index} onDelete={getBill}></BillItem>
      })}
    </div>
    <div className={s.add} onClick={addToggle}>
      <EditSFill />
    </div>
    <InfiniteScroll loadMore={loadMore} hasMore={hasMore}></InfiniteScroll>
    <PopupType show={typeVisible} getShow={ () => { setTypeVisible(false) } } onSelect={selectType}></PopupType>
    <PopupMonth ref={monthRef} onSelect={selectMonth}></PopupMonth>
    <PopupAddBill ref={addRef} onAdd={getBill}></PopupAddBill>
  </div>
}

export default Home
