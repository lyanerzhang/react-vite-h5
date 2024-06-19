import { Button } from 'antd-mobile'
import cx from 'classnames';
import s from './style.module.less';

const Index = () => {
  return (<>
    <div className={cx(s.user)}>
      <div className={cx(s.head)}>
        <div className={s.info}>
          <span>昵称：测试</span>
          <span>
            <img style={{ width: 30, height: 30, verticalAlign: '-10px' }} src="//s.yezgea02.com/1615973630132/geqian.png" alt="" />
            <b>个性签名</b>
          </span>
        </div>
        <img className={s.avatar} style={{ width: 60, height: 60, borderRadius: 8 }} src={'//s.yezgea02.com/1624959897466/avatar.jpeg'} alt="" />
      </div>
      <div className={cx(s.content)}>
        <p
          hasArrow
          title="用户信息修改"
          onClick={() => navigateTo('/userinfo')}
          icon={<img style={{ width: 20, verticalAlign: '-7px' }} src="//s.yezgea02.com/1615974766264/gxqm.png" alt="" />}
        />
        <p
          hasArrow
          title="重制密码"
          onClick={() => navigateTo('/account')}
          icon={<img style={{ width: 20, verticalAlign: '-7px' }} src="//s.yezgea02.com/1615974766264/zhaq.png" alt="" />}
        />
        <p
          hasArrow
          title="关于我们"
          onClick={() => navigateTo('/about')}
          icon={<img style={{ width: 20, verticalAlign: '-7px' }} src="//s.yezgea02.com/1615975178434/lianxi.png" alt="" />}
        />
      </div>
      <div className={cx(s.logout)}>
        <Button block color='primary'>退出登录</Button>
      </div>
    </div>
  </>)
}

export default Index;