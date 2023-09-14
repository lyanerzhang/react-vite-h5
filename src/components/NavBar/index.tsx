import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import {
    BillOutline,
    HistogramOutline,
    UserOutline
} from 'antd-mobile-icons';
import PropTypes from 'prop-types'

const NavBar = ({ showNav }) => {
    // 账单 统计 我的
    const [activeKey, setActiveKey] = useState('/home');
    const navigateTo = useNavigate()
    const changeTab = (value: string) => {
        setActiveKey(value)
        navigateTo(value)
    }
    if (showNav) {
        return (
            <>
                <TabBar activeKey={activeKey} onChange={changeTab}>
                    <TabBar.Item key="/home" title="账单" icon={
                        <BillOutline />
                    }></TabBar.Item>
                    <TabBar.Item key="/data" title="统计" icon={
                        <HistogramOutline />
                    }></TabBar.Item>
                    <TabBar.Item key="/user" title="我的" icon={
                        <UserOutline />
                    }></TabBar.Item>
                </TabBar>
            </>
        )
    }
}
NavBar.propTypes = {
    showNav: PropTypes.bool
}

export default NavBar;