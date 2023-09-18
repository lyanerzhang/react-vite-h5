import { useState } from 'react'
import { DownOutline } from 'antd-mobile-icons'
import { BillItem } from '@/components/BillItem';
import s from './style.module.less'

const Home = () => {
  const [list, setList] = useState([
    {
      bills: [
        {
          amount: "25.00",
          date: "1623390740000",
          id: 911,
          pay_type: 1,
          remark: "",
          type_id: 1,
          type_name: "餐饮"
        }
      ],
      date: '2021-06-11'
    }
  ]); // 账单列表
  return <div className={s.home}>
    <div className={s.header}>
      <div className={s.dataWrap}>
        <span className={s.expense}>总支出：<b>¥ 200</b></span>
        <span className={s.income}>总收入：<b>¥ 500</b></span>
      </div>
      <div className={s.typeWrap}>
        <div className={s.left}>
          <span className={s.title}>类型 <DownOutline className={s.arrow} /></span>
        </div>
        <div className={s.right}>
          <span className={s.time}>2022-06 <DownOutline className={s.arrow} /></span>
        </div>
      </div>
    </div>
    <div className={s.contentWrap}>
      { list.map((item, index) => {
        return <BillItem bill={item} key={index}></BillItem>
      })}
    </div>
  </div>
}

export default Home
