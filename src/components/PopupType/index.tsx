import { Popup, Selector, Toast, ToastShowProps } from 'antd-mobile';
import { useState, useEffect } from 'react';
import { get } from '@/utils'
import s from './style.module.less'

// import dayjs from 'dayjs'

const PopupType = ({ show, getShow, onSelect }) => {
  const [active, setActive] = useState("all")
  const [incomeOptions, setIncomeOptions] = useState([]);
  const [expenseOptions, setExpenseOptions] = useState([]);
  const selectType = (v, label) => {
    if (v.length) {
      setActive(v[0])
      getShow(false)
      onSelect(active, label)
    }
  }
  useEffect(() => {
    get('/bill/types').then(res => {
      const options = res.map(item => {
        return {
          value: item.id,
          label: item.name,
          type: item.type
        }
      })
      setIncomeOptions(options.filter((i: { type: number; }) => i.type == 1))
      setExpenseOptions(options.filter((i: { type: number; }) => i.type == 2))
    }).catch((err: string | ToastShowProps) => {
      Toast.show(err)
    })
  }, [])
  return (
    <Popup visible={show}
      onMaskClick={() => {
        getShow(false)
      }}
      onClose={() => {
        getShow(false)
      }}>
        <div className={s.popupType}>
          <div className={s.header}>
            请选择类型
          </div>
          <div className={s.content}>
            <Selector
              showCheckMark={false}
              options={[
                {
                  label: '全部',
                  value: 'all',
                }
              ]}
              value={[active]}
              onChange={(v, ext) => {
                selectType(v, ext.items[0].label)
              }}
            />
            <div className={s.title}>支出</div>
            <div>
              <Selector
                showCheckMark={false}
                options={expenseOptions}
                value={[active]}
                onChange={(v, ext) => {
                  selectType(v, ext.items[0].label)
                }}
              />
            </div>
            <div className={s.title}>收入</div>
            <div>
              <Selector
                showCheckMark={false}
                options={incomeOptions}
                value={[active]}
                onChange={(v, ext) => {
                  selectType(v, ext.items[0].label)
                }}
              />
            </div>
          </div>
        </div>
    </Popup>
  )
}
export default PopupType