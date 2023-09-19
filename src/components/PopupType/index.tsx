import { Popup, Calendar, Selector } from 'antd-mobile';
import { useState, forwardRef } from 'react';
// import dayjs from 'dayjs'

const PopupType = ({ show }) => {
  console.log('typeVisible', show)
  const [visible, setVisible] = useState(show)
  setVisible(show)
  // const [curDate, setCurDate] = useState(new Date(dayjs().format("YYYY-MM-DD")))
  return (
    <Popup visible={visible}
      onMaskClick={() => {
        setVisible(false)
      }}
      onClose={() => {
        setVisible(false)
      }}>
        ces
    </Popup>
  )
}
export default PopupType