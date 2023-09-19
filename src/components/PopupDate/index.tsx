import { Popup, Calendar } from 'antd-mobile';
import { useState, forwardRef } from 'react';
import dayjs from 'dayjs'

const PopupDate = forwardRef(({onSelect}, ref) => {
  const [visible, setVisible] = useState(false)
  const [curDate, setCurDate] = useState(new Date(dayjs().format("YYYY-MM-DD")))
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
      <Calendar selectionMode='single' defaultValue={curDate} onChange={val => {
        onSelect(dayjs(val).format("YYYY-MM-DD"))
        setCurDate(dayjs(val).format("YYYY-MM-DD"))
        setVisible(false)
      }}></Calendar>
    </Popup>
  )
})
export default PopupDate