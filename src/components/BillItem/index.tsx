import { useState, useEffect } from "react"
import { Card, List, SwipeAction, Dialog, Toast, ToastShowProps } from "antd-mobile"
import PropTypes from 'prop-types'
import CustomIcon from '../CustomIcon';
import dayjs from 'dayjs';
import { typeMap } from '@/utils/type';
import { post } from '@/utils'
import s from './style.module.less'
export const BillItem = ({ bill, onDelete }) => {
  // 接收父组件的值
  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)
  let id = 0
  const rightActions = [{
    key: "delete",
    text: "删除",
    color: "danger",
    onClick: async () => {
      await Dialog.confirm({
        content: '确定要删除吗？',
        onConfirm: () => {
          handleDeleteBill()
        }
      })
    }
  }]
  const handleDeleteBill = () => {
    post(`/bill/delete?id=${id}`).then(res => {
      onDelete()
      Toast.show("删除成功")
    }).catch((err: string | ToastShowProps) => {
      Toast.show(err)
    })
  }
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
            <SwipeAction key={item} rightActions={rightActions} onAction={(action):void => {
              id = item.id
            }}>
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
                description={
                  <div>
                    {dayjs(Number(item.date)).format('HH:mm:ss')} {item.remark ? `| ${item.remark}` : ''}
                  </div>
                }
                >
              </List.Item>
            </SwipeAction>
          </List>)
        }
      </Card>
    </div>
  )
}
BillItem.propTypes = {
  bill: PropTypes.object
};