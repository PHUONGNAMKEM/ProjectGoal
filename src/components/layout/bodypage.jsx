import {
    AimOutlined,
    BookOutlined,
    CaretLeftOutlined,
    CaretRightOutlined,
    DesktopOutlined,
    FileDoneOutlined,
    FileOutlined,
    HomeOutlined,
    LeftOutlined,
    PieChartOutlined,
    RadarChartOutlined,
    RightOutlined,
    RocketOutlined,
    SettingOutlined,
    TeamOutlined,
    UsergroupDeleteOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const BodyPage = () => {
    const { Header, Content, Footer, Sider } = Layout;
    function getItem(label, key, icon, children) {
        return {
            key,
            icon,
            children,
            label,
        };
    }
    const [collapsed, setCollapsed] = useState(false);

    const items = [
        getItem(<Link to={"/goal"}>Goal</Link>, 'goal', <AimOutlined />),
        getItem(<Link to={"/tasks"}>Tasks</Link>, 'tasks', <FileDoneOutlined />),
        getItem('User', 'user', <UserOutlined />, [
            getItem('Tom', 'u1'),
            getItem('Bill', 'u2'),
            getItem('Alex', 'u3'),
        ]),
        getItem('Performance', 'performance', <RocketOutlined />, [
            getItem('Team 1', 'p1'),
            getItem('Team 2', 'p2')
        ]),
        getItem('Settings', 'settings', <SettingOutlined />),
        getItem('Analytics', 'analytics', <PieChartOutlined />),
    ];

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [breadcrumbTitle, setBreadcrumbTitle] = useState([{ title: 'Task' }]);
    const breadcrumbMap = {
        goal: ['Goal'],
        tasks: ['Tasks'],
        user: ['User'],
        u1: ['User', 'Tom'],
        u2: ['User', 'Bill'],
        u3: ['User', 'Alex'],
        performance: ['Performance'],
        p1: ['Performance', 'Team 1'],
        p2: ['Performance', 'Team 2'],
        settings: ['Settings'],
        analytics: ['Analytics'],
    };

    const path = location.pathname;

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)} style={{
                background: '#fff'
            }}
                trigger={
                    <div
                        style={{
                            backgroundColor: '#4eb8f7',
                            color: '#fff',
                            height: 48,
                            lineHeight: '48px',
                            textAlign: 'center',
                            cursor: 'pointer',
                        }}
                    >
                        {collapsed ? <LeftOutlined /> : <RightOutlined />}
                    </div>
                }
            >
                <div className="demo-logo-vertical" />
                {/* có thể gán theme được cho menu -> light/dark */}
                <Menu
                    defaultSelectedKeys={['tasks']}
                    theme='light'
                    mode="inline"
                    items={items}
                    onClick={({ key }) => {
                        const path = breadcrumbMap[key];
                        if (path) {
                            setBreadcrumbTitle(path.map(p => ({ title: p })))
                            console.log(">>> check breadcrumbtitle: ", breadcrumbTitle);
                        }
                    }}

                />
            </Sider>
            <Layout style={{ background: "#f0f6ff" }}>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '0 16px', }}>
                    <Breadcrumb style={{ margin: '16px 0' }} items={breadcrumbTitle} />
                    {/* <div>
                        <h2 style={{ margin: "16px 0px" }}>Title of Goal</h2>
                    </div> */}
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: "#fff",
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}

export default BodyPage;