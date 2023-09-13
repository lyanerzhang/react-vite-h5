import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon, TabBar } from 'zarm';
import PropTypes from 'prop-types'

const TabIcon = Icon.createFromIconfont('//at.alicdn.com/t/c/font_4250567_4xp2j1z9vu.js');

const NavBar = ({ showNav }) => {
    // 账单 统计 我的
    const [activeKey, setActiveKey] = useState('/');
    const navigateTo = useNavigate()
    const changeTab = (value: string) => {
        setActiveKey(value)
        navigateTo(value)
    }
    return (
        <>
            <TabBar visible={showNav} activeKey={activeKey} onChange={changeTab}>
                <TabBar.Item itemKey="/" title="账单" icon={
                    <TabIcon type='icon-dingdanliebiao'></TabIcon>
                }></TabBar.Item>
                <TabBar.Item itemKey="/data" title="统计" icon={
                    <TabIcon type='icon-dashuju'></TabIcon>
                }></TabBar.Item>
                <TabBar.Item itemKey="/user" title="我的" icon={
                    <TabIcon type='icon-yonghuzhongxin'></TabIcon>
                }></TabBar.Item>
            </TabBar>
        </>
    )
}
NavBar.propTypes = {
    showNav: PropTypes.bool
}

export default NavBar;