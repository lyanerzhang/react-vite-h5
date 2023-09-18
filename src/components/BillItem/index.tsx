import { useState, userEffect } from "react"
import { Card } from "antd-mobile"
import PropTypes from 'prop-types'
import dayjs from 'dayjs';
import s from './style.module.less'
export const BillItem = ({bill}) => {
  // 接收父组件的值
  console.log(bill)
  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)
  userEffect(() => {
    const _income = bill.bills.filter(i => i.pay_type == 2).reduce((curr, item) => {
      curr += Number(item.amount).toFixed(2)
      return curr
    }, 0)
    setIncome(_income)
  }, [bill.bills])
  return (
    <div className={s.item}>
      <Card
        title={
          <div className={s.headerDate}>
            <div className={s.date}>{bill.date}</div>
            <div className={s.money}>
              <span>
                <img src="//s.yezgea02.com/1615953405599/zhi%402x.png" alt='支' />
                <span>¥{ expense.toFixed(2) }</span>
              </span>
              <span>
                <img src="//s.yezgea02.com/1615953405599/shou%402x.png" alt="收" />
                <span>¥{ income.toFixed(2) }</span>
              </span>
            </div>
          </div>
        }>
      </Card>
    </div>
  )
}
BillItem.propTypes = {
  bill: PropTypes.object
};