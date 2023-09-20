import { Popup, NumberKeyboard, ToastShowProps, Toast, Input } from 'antd-mobile';
import { DownOutline } from 'antd-mobile-icons';
import { forwardRef, useRef, useState, useEffect } from 'react';
import { get, post } from '@/utils'
import { typeMap } from '@/utils/type';
import PopupDate from '@/components/PopupDate';
import CustomIcon from '../CustomIcon'
import dayjs from 'dayjs'
import s from './style.module.less';
import cx from 'classnames';

const PopupAddBill = forwardRef(({detail = {}, onReload}, ref) => {
  const dateRef = useRef(null)
  const [show, setShow] = useState(false) // 内部控制弹窗显示隐藏。
  const [payType, setPayType] = useState('expense'); // 支出或收入类型
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"))
  const [amount, setAmount] = useState("") // 账单价格
  const [expense, setExpense] = useState([]) // 支出账单类型
  const [income, setIncome] = useState([]) // 收入账单类型
  const [currentType, setCurrentType] = useState({});
  const [remark, setRemark] = useState("")

  const changeType = (type:string) => {
    setPayType(type)
  }
  const dateToggle = () => {
    dateRef.current && dateRef.current.show()
  }
  const selectDate = (date: string) => {
    setDate(date)
  }
  const handleMoney = (value: string) => {
    // 当输入的值为 '.' 且 已经存在 '.'，则不让其继续字符串相加。
    if (value == '.' && amount.includes('.')) return
    // 小数点后保留两位，当超过两位时，不让其字符串继续相加。
    if (value != '.' && amount.includes('.') && amount && amount.split('.')[1].length >= 2) return
    // amount += value
    setAmount(amount + value)
  }
  const deleteMoney = () => {
    let _amount = amount.slice(0, amount.length - 1)
    setAmount(_amount)
  }
  // 确定新增账单
  const confirmMoney = () => {
    post('/bill/add', {
      pay_type: payType,
      amount,
      date,
      type_id: currentType.id,
      type_name: currentType.name,
      remark
    }).then(res => {
      console.log('成功')
    }).catch((err: string | ToastShowProps) => {
      Toast.show(err)
    })
  }
  // 选择账单类型
  const choseType = (item) => {
    setCurrentType(item)
  }

  useEffect(() => {
    get('/bill/types').then(res => {
      setIncome(res.filter((i: { type: number; }) => i.type == 1))
      setExpense(res.filter((i: { type: number; }) => i.type == 2))
    }).catch((err: string | ToastShowProps) => {
      Toast.show(err)
    })
  }, [])

  // 通过 forwardRef 拿到外部传入的 ref，并添加属性，使得父组件可以通过 ref 控制子组件。
  if (ref) {
    ref.current = {
      show: () => {
        setShow(true);
      },
      close: () => {
        setShow(false);
      }
    }
  }
  return (
    <>
      <Popup visible={show} showCloseButton={true}
        getContainer={null}
        bodyStyle={{height: '80%'}}
        onMaskClick={() => {
          setShow(false)
        }}
        onClose={() => {
          setShow(false)
        }}>
        <div className={s.addWrap}>
          <div className={s.filter}>
            <div className={s.type}>
              <span onClick={() => changeType('expense')} className={cx({ [s.expense]: true, [s.active]: payType == 'expense' })}>支出</span>
              <span onClick={() => changeType('income')} className={cx({ [s.income]: true, [s.active]: payType == 'income' })}>收入</span>
            </div>
            <div className={s.time} onClick={() => dateToggle()}>
              {date}<DownOutline className={s.arrow} />
            </div>
          </div>
          <div className={s.money}>
            <span className={s.sufix}>¥</span>
            <span className={cx(s.amount, s.animation)}>{amount}</span>
          </div>
          <div className={s.typeWarp}>
            <div className={s.typeBody}>
              {
                (payType == 'expense' ? expense : income).map(item =>
                <div onClick={() => choseType(item)} key={item.id} className={s.typeItem}>
                  <span className={cx({[s.iconfontWrap]: true, [s.expense]: payType == 'expense', [s.income]: payType == 'income', [s.active]: currentType.id == item.id})}>
                    <CustomIcon className={s.iconfont} type={typeMap[item.id].icon} />
                  </span>
                  <span>{item.name}</span>
                </div>)
              }
            </div>
          </div>
          <div className={s.remark}>
            <Input placeholder='请输入备注' value={remark} clearable onChange={(val: string) => setRemark(val)}/>
          </div>
        </div>
        <NumberKeyboard getContainer={null} visible={show} confirmText='确定'
          customKey={'.'}
          onInput={(v: string) => handleMoney(v)}
          onDelete={() => deleteMoney() }
          onConfirm={() => confirmMoney()}
          ></NumberKeyboard>
        <PopupDate ref={dateRef} onSelect={selectDate}></PopupDate>
      </Popup>
    </>
  )
})
export default PopupAddBill;