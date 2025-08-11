import {
    AimOutlined,
    FileDoneOutlined,
    LeftOutlined,
    PieChartOutlined,
    RightOutlined,
    RocketOutlined,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { MenuProps } from 'rc-menu';
import { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import './layoutStyle/bodyPageStyle.scss'
import { getGoalByIdAPI } from '../../services/api.me.service';
import { ArrowRight } from 'lucide-react';

type MenuItem = Required<MenuProps>['items'][number];

const BodyPage = () => {
    const { Header, Content, Sider } = Layout;
    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[]
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
        } as MenuItem;
    }
    const [collapsed, setCollapsed] = useState(false);

    const items: MenuItem[] = [
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
        getItem(<Link to={"/analytics"}>Analytics</Link>, 'analytics', <PieChartOutlined />),
    ];

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [breadcrumbTitle, setBreadcrumbTitle] = useState<{ title: string }[]>([{ title: 'Goal' }]);
    const breadcrumbMap: Record<string, string[]> = {
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

    // const path = location.pathname;

    // Change color theme
    const switchTheme = (theme: 'primary' | 'secondary' | 'third') => {
        document.documentElement.style.setProperty(
            '--theme-current',
            getComputedStyle(document.documentElement).getPropertyValue(`--theme-${theme}`)
        );
    };

    const { idGoal } = useParams();
    let [titleGoal, setTitleGoal] = useState("");
    const getGoalById = async () => {
        try {
            const res = await getGoalByIdAPI(idGoal);
            if (res.data) {
                setTitleGoal(res.data.title)
            }
        } catch (error) {
        }
    }

    useEffect(() => {
        getGoalById();
    }, [idGoal]);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)} style={{
                background: '#fff'
            }}
                trigger={
                    <div
                        style={{
                            backgroundColor: 'var(--theme-current)',
                            color: 'rgb(169, 168, 168)',
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
                    defaultSelectedKeys={['goal']}
                    theme='light'
                    mode="inline"
                    items={items}
                    onClick={(info: { key: string }) => {
                        // console.log("check info: ", info)
                        const path = breadcrumbMap[info.key];
                        if (path) {
                            // console.log(">>> check path: ", path);
                            setBreadcrumbTitle(path.map(p => ({ title: p })))
                            // console.log(">>> check breadcrumbtitle: ", breadcrumbTitle);
                        }
                    }}
                />
            </Sider>
            <Layout style={{ background: "var(--theme-current)" }}>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <div className="themeColor">
                        <button onClick={() => switchTheme('secondary')} className="changeThemeColor secondary-theme"></button>
                        <button onClick={() => switchTheme('primary')} className="changeThemeColor primary-theme"></button>
                        <button onClick={() => switchTheme('third')} className="changeThemeColor third-theme"></button>
                    </div>
                </Header>
                <Content style={{ margin: '0 16px', }}>
                    <div className='content-header' style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between", padding: "0 2px" }}>
                        <div className='flex items-center justify-between'>
                            <Breadcrumb style={{ margin: '16px 0' }} items={breadcrumbTitle} />
                            <ArrowRight size={20} className='ml-2' />
                        </div>
                        <p>{titleGoal}</p>
                    </div>
                    {/* <div>
                        <h2 style={{ margin: "16px 0px" }}>Title of Goal</h2>
                    </div> */}
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            // background: "rgb(247 247 247)",
                            // backgroundImage: `url('https://c4.wallpaperflare.com/wallpaper/73/811/589/mac-os-x-5k-lake-river-wallpaper-preview.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundBlendMode: 'lighten',
                            // backgroundColor: 'rgba(255, 255, 255, 0.161)',
                            borderRadius: borderRadiusLG,
                            border: "1px solid #ccc",
                            position: "relative"
                            // boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
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