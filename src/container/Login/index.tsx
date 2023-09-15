import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Button, Input, Toast, ToastShowProps, Checkbox, Space } from 'antd-mobile';
import { EyeInvisibleOutline, EyeOutline} from 'antd-mobile-icons';
import cx from 'classnames';
import s from './style.module.less';
import { post } from '@/utils'

const Login = () => {
  const navigateTo = useNavigate()
  const [type, setType] = useState('login'); // 登录/注册
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const checkAgree = (_: any, value: boolean) => {
    if (value === true) {
      return Promise.resolve()
    } else {
      return Promise.reject(new Error("请勾选协议"))
    }
  }
  const onFinish = () => {
    console.log(11)
    if (type === 'lgin') {
      post('/user/login', {
        username,
        password
      }).then(() => {
        Toast.show("登录成功")
        navigateTo("/home")
      }).catch((err: string | ToastShowProps) => {
        Toast.show(err)
      });
    } else {
      post('/user/register', {
        username,
        password
      }).then(() => {
        Toast.show("注册成功")
        navigateTo("/home")
      }).catch((err: string | ToastShowProps) => {
        Toast.show(err)
      });
    }
  }
  return (
    <>
      <Card className={s.auth}>
        <div className={s.head} />
        <div className={s.tab}>
          <span className={cx({ [s.avtive]: type == 'login' })} onClick={() => setType('login')}>登录</span>
          <span className={cx({ [s.avtive]: type == 'register' })} onClick={() => setType('register')}>注册</span>
        </div>
        <div className={s.form}>
          <Form
            layout='horizontal'
            onFinish={onFinish}
            footer={
              <Button block type='submit' color='primary'>
                {type == 'login' ? '登  录' : '注  册'}
              </Button>
            }>
            <Form.Item
              name='name'
              label='账号'
              rules={[{ required: true, message: '账号不能为空' }]}
            >
              <Input value={username} placeholder='请输入账号' onChange={(val) => { setUsername(val) }} />
            </Form.Item>
            <Form.Item
              name='password'
              label='密码'
              rules={[{ required: true, message: '密码不能为空' }]}
            >
              <div className={s.password}>
                <Input value={password} placeholder='请输入密码' onChange={(val) => { setPassword(val) }} type={visible ? 'text' : 'password'} className={s.input} />
                <div className={s.eye}>
                  {!visible ? (
                    <EyeInvisibleOutline onClick={() => setVisible(true)} />
                  ) : (
                    <EyeOutline onClick={() => setVisible(false)} />
                  )}
                </div>
              </div>
            </Form.Item>
            {
              type === 'register' ? (
                <Form.Item
                  name="agree"
                  rules={[{ required: true }, { validator: checkAgree }]}>
                    <Checkbox checked={agree} onChange={(val) => {
                      setAgree(val)
                    }}>阅读并同意</Checkbox>
                </Form.Item>
              ): (<></>)
            }
          </Form>
        </div>
      </Card>
    </>
  )
}
export default Login;