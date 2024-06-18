import { Popup, DatePickerView, Space, Button } from 'antd-mobile';
import { useState, forwardRef } from 'react';
import useLatest from '@/hooks/useLatest';
import dayjs from 'dayjs'
import s from './style.module.less';

const PopupMonth = forwardRef(({onSelect}, ref) => {
  const [visible, setVisible] = useState(false)
  // const [curMonth, setCurMonth] = useState(new Date(dayjs().format("YYYY-MM")))
  const curMonth = useLatest(new Date(dayjs().format("YYYY-MM")))
  const monthRenderLabel = (type:string, data:number) => {
    switch (type) {
      case 'year':
        return data + '年'
      case 'month':
        return data + '月'
      default:
        return data
    }
  }  
  if (ref) {
    ref.current = {
      show: () => {
        setVisible(true)
      },
      close: () => {
        setVisible(false)
      }
    }
  }
  return (
    <Popup visible={visible}
      onMaskClick={() => {
        setVisible(false)
      }}
      onClose={() => {
        setVisible(false)
      }}
      className={s.monthWrap}>
      <Space className={s.optionWrap} justify={"between"}>
        <Button shape='rectangular' fill='outline' size='small' onClick={() => {
          setVisible(false)
        }}>取消</Button>
        <Button shape='rectangular' color='primary' fill='outline' size='small' onClick={() => {
          onSelect(curMonth.current)
          setVisible(false)
        }}>确认</Button>
      </Space>
      <DatePickerView 
        defaultValue={curMonth.current}
        renderLabel={monthRenderLabel}
        precision='month'
        onChange={val => {
          curMonth.current = dayjs(val).format("YYYY-MM")
        }}>
      </DatePickerView>
    </Popup>
  )
})
export default PopupMonth