import { Popup, DatePickerView } from 'antd-mobile';
import { useState, forwardRef } from 'react';
import dayjs from 'dayjs'

const PopupMonth = forwardRef(({onSelect}, ref) => {
  const [visible, setVisible] = useState(false)
  const [curMonth, setCurMonth] = useState(new Date(dayjs().format("YYYY-MM")))
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
      }}>
      <DatePickerView defaultValue={curMonth} renderLabel={monthRenderLabel}
        precision='month'
        onChange={val => {
          onSelect(dayjs(val).format("YYYY-MM"))
          setCurMonth(dayjs(val).format("YYYY-MM"))
          setVisible(false)
        }}></DatePickerView>
    </Popup>
  )
})
export default PopupMonth