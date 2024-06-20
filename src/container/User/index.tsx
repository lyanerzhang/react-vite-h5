import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Grid } from 'antd-mobile'
import { SetOutline, RightOutline, LockOutline, TeamOutline } from 'antd-mobile-icons'
import { get, baseFileURL } from '@/utils'
import cx from 'classnames';
import s from './style.module.less';

type UserInfo = {
  username?: string
  avatar?: string
  signature?: string
}
const Index = () => {
  const navigateTo = useNavigate()
  const [userinfo, setUserinfo] = useState<UserInfo>({})

  const getUserInfo = () => {
    get('/user/get_userinfo').then(res => {
      console.log(res)
      setUserinfo(res)
    })
  }
  useEffect(() => {
    getUserInfo()
  }, [])
  return (<>
    <div className={cx(s.user)}>
      <div className={cx(s.head)}>
        <div className={s.info}>
          <span>昵称：{userinfo.username}</span>
          <span>
            <img style={{ width: 30, height: 30, verticalAlign: '-10px' }} src="//s.yezgea02.com/1615973630132/geqian.png" alt="" />
            <b>{userinfo.signature}</b>
          </span>
        </div>
        <img className={s.avatar} style={{ width: 60, height: 60, borderRadius: 8 }} src={baseFileURL + userinfo.avatar} alt="" />
      </div>
      <div className={cx(s.content)}>
        <div className={cx(s.item)}>
          <Grid columns={12}>
            <Grid.Item span={11}>
              <div onClick={() => { navigateTo('/userinfo') }}>
                <SetOutline className={s.icon}/>
                用户信息修改
              </div>
            </Grid.Item>
            <Grid.Item>
              <div>
                <RightOutline />
              </div>
            </Grid.Item>  
          </Grid>
        </div>
        <div className={cx(s.item)}>
          <Grid columns={12}>
            <Grid.Item span={11}>
              <div>
                <LockOutline className={s.icon}/>
                重置密码
              </div>
            </Grid.Item>
            <Grid.Item>
              <div>
                <RightOutline />
              </div>
            </Grid.Item>
          </Grid>
        </div>
        <div className={cx(s.item)}>
          <Grid columns={12}>
            <Grid.Item span={11}>
              <div>
                <TeamOutline className={s.icon}/>
                关于我们
              </div>
            </Grid.Item>
            <Grid.Item>
              <div>
                <RightOutline />
              </div>
            </Grid.Item>
          </Grid>
        </div>
      </div>
      <div className={cx(s.logout)}>
        <Button block color='primary'>退出登录</Button>
      </div>
    </div>
  </>)
}

export default Index;