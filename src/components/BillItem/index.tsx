import { useState, useEffect } from "react"
import { Card, List } from "antd-mobile"
import PropTypes from 'prop-types'
import CustomIcon from '../CustomIcon';
import dayjs from 'dayjs';
import { typeMap } from '@/utils/type';
import s from './style.module.less'
export const BillItem = ({ bill }) => {
  // 接收父组件的值
  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)
  useEffect(() => {
    const _income = bill.bills.filter(i => i.pay_type == 2).reduce((curr, item) => {
      curr += Number(item.amount)
      return curr
    }, 0)
    setIncome(_income)
    const _expense = bill.bills.filter(i => i.pay_type === 1).reduce((curr, item) => {
      curr += Number(item.amount)
      return curr
    }, 0)
    setExpense(_expense)
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
        {
          bill && bill.bills.map((item: any) => <List className={s.bill}
            key={item.id}>
            <List.Item
              title={
                <>
                  <CustomIcon
                    className={s.itemIcon}
                    type={item.type_id ? typeMap[item.type_id].icon : 1}
                  />
                  <span>{ item.type_name }</span>
                </>
              }
              extra={<span style={{ color: item.pay_type == 2 ? 'red' : '#39be77' }}>{`${item.pay_type == 1 ? '-' : '+'}${item.amount}`}</span>}
              description={<div>{dayjs(Number(item.date)).format('HH:mm')} {item.remark ? `| ${item.remark}` : ''}</div>}
              >
            </List.Item>
          </List>)
        }
      </Card>
    </div>
  )
}
BillItem.propTypes = {
  bill: PropTypes.object
};