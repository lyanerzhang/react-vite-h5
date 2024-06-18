import { useEffect, useRef, useState } from 'react';
import { CalendarOutline } from 'antd-mobile-icons'
import { ProgressBar } from 'antd-mobile'
import { typeMap } from '@/utils/type';
import cx from 'classnames';
import dayjs from 'dayjs';
import { get } from '@/utils'
import CustomIcon from '@/components/CustomIcon'
import PopupMonth from '@/components/PopupMonth'
import s from './style.module.less';

let proportionChart = null

const Data = () => {
  const monthRef = useRef(null)
  const [curMonth, setCurMonth] = useState(dayjs().format("YYYY-MM"))

  const [totalType, setTotalType] = useState('expense'); // 收入或支出类型
  const [totalExpense, setTotalExpense] = useState(0); // 总支出
  const [totalIncome, setTotalIncome] = useState(0); // 总收入
  const [expenseData, setExpenseData] = useState([]); // 支出数据
  const [incomeData, setIncomeData] = useState([]); // 收入数据
  const [pieType, setPieType] = useState('expense');

  // 选择月份
  const monthToggle = () => {
    monthRef.current && monthRef.current.show()
  }
  const selectMonth = (date: string) => {
    setCurMonth(date)
  }

  useEffect(() => {
    getData()
  }, [curMonth]);

  // 获取数据详情
  const getData = async () => {
    const data = await get(`/bill/data?date=${curMonth}`);

    // 总收支
    setTotalExpense(data.total_expense);
    setTotalIncome(data.total_income);
    console.log(data)

    // 过滤支出和收入
    const expense_data = data.total_data.filter(item => item.pay_type == 1).sort((a, b) => b.number - a.number); // 过滤出账单类型为支出的项
    
    const income_data = data.total_data.filter(item => item.pay_type == 2).sort((a, b) => b.number - a.number); // 过滤出账单类型为收入的项
    setExpenseData(expense_data);
    setIncomeData(income_data);
    setPieChart(pieType == 'expense' ? expense_data : income_data);
  };

  // 切换收入 支出
  const changeTotalType = (type) => {
    setTotalType(type)
  }
  // 切换饼图收支类型
  const changePieType = (type) => {
    setPieType(type);
    // 重绘饼图
    setPieChart(type == 'expense' ? expenseData : incomeData);
  }
  // 绘制饼图方法
  const setPieChart = (data) => {
    if (window.echarts) {
      proportionChart = echarts.init(document.getElementById('proportion'));
      proportionChart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          // 图例
          legend: {
              data: data.map(item => item.type_name)
          },
          series: [
            {
              name: '支出',
              type: 'pie',
              radius: '55%',
              data: data.map(item => {
                return {
                  value: item.number,
                  name: item.type_name
                }
              }),
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
      })
    }
  }
  return <div className={s.data}>
    <div className={s.total}>
      <div className={s.time} onClick={() => monthToggle()}>
        <span>{curMonth}</span>
        <CalendarOutline />
      </div>
      <div className={s.title}>共支出</div>
      <div className={s.expense}>¥{totalExpense}</div>
      <div className={s.income}>共收入¥{totalIncome}</div>
    </div>
    <div className={s.structure}>
      <div className={s.head}>
        <span className={s.title}>收支构成</span>
        <div className={s.tab}>
          <span onClick={() => changeTotalType('expense')} className={cx({ [s.expense]: true, [s.active]: totalType == 'expense' })}>支出</span>
          <span onClick={() => changeTotalType('income')} className={cx({ [s.income]: true, [s.active]: totalType == 'income' })}>收入</span>
        </div>
      </div>
      <div className={s.content}>
        {
          (totalType === "expense" ? expenseData : incomeData).map(item =>
            <div key={item.type_id} className={s.item}>
              <div className={s.left}>
                <div className={s.type}>
                  <span className={cx({ [s.expense]: totalType == 'expense', [s.income]: totalType == 'income' })}>
                    <CustomIcon
                      type={item.type_id ? typeMap[item.type_id].icon : 1}
                    />
                  </span>
                  <span className={s.name}>{ item.type_name }</span>
                </div>
                <div className={s.progress}>¥{ Number(item.number).toFixed(2) || 0 }</div>
              </div>
              <div className={s.right}>
                <div className={s.percent}>
                  <ProgressBar
                    text
                    percent={Number((item.number / Number(totalType == 'expense' ? totalExpense : totalIncome)) * 100).toFixed(2)}
                  />
                </div>
              </div>
            </div>
          )
        }
      </div>
      <div className={s.proportion}>
        <div className={s.head}>
          <span className={s.title}>收支构成</span>
          <div className={s.tab}>
            <span onClick={() => changePieType('expense')} className={cx({ [s.expense]: true, [s.active]: pieType == 'expense'  })}>支出</span>
            <span onClick={() => changePieType('income')} className={cx({ [s.income]: true, [s.active]: pieType == 'income'  })}>收入</span>
          </div>
        </div>
        <div id="proportion"></div>
      </div>
    </div>
    <PopupMonth ref={monthRef} onSelect={selectMonth}></PopupMonth>
  </div>
}

export default Data
