import { Link, NavLink, useNavigate } from "react-router-dom";
// import "./header.css"
import { Menu, message } from "antd";
import {
    HomeOutlined,
    UsergroupDeleteOutlined,
    BookOutlined,
    SettingOutlined,
    LoginOutlined,
    AliwangwangOutlined
} from '@ant-design/icons';
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { logoutAPI } from "../../services/api.service";



const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);

    // Lấy path hiện tại từ URL, ví dụ: "/users"
    const path = location.pathname;

    // Lay path theo key của item trong items, được quản lý bởi current
    const [current, setCurrent] = useState('');
    const onClick = (e) => {
        // setCurrent(e.key);
    };

    const handleLogout = async () => {
        const res = await logoutAPI();
        if (res.data) {
            // clear data
            localStorage.removeItem("access_token")
            setUser({
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: ""
            });
            message.success("Logout successfully")

            // redirect user to home page
            navigate("/");
        }
    }

    const items = [
        {
            label: <Link to={"/"}>Home</Link>,
            key: '/',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to={"/users"}>User</Link>,
            key: 'users',
            icon: <UsergroupDeleteOutlined />,
        },
        {
            label: <Link to={"/books"}>Books</Link>,
            key: 'books',
            icon: <BookOutlined />,
            // children: [
            //     {
            //         type: 'group',
            //         label: 'Item 1',
            //         children: [
            //             { label: 'Option 1', key: 'setting:1' },
            //             { label: 'Option 2', key: 'setting:2' },
            //         ],
            //     },
            //     {
            //         type: 'group',
            //         label: 'Item 2',
            //         children: [
            //             { label: 'Option 3', key: 'setting:3' },
            //             { label: 'Option 4', key: 'setting:4' },
            //         ],
            //     },
            // ],
        },

        ...(!user.id ? [
            {
                label: <Link to={"/login"}>Login</Link>,
                key: 'login',
                icon: <LoginOutlined />,
            },
            {
                label: <Link to={"/register"}>Register</Link>,
                key: 'register',
                icon: <UsergroupDeleteOutlined />,
            },] : []),

        ...(user.id ? [
            {
                label: `Welcome ${user.fullName}`,
                key: 'settings',
                icon: <AliwangwangOutlined />,
                children: [
                    { label: <span onClick={() => handleLogout()}>Logout</span> },
                ],
            },] : []),
    ];
    return (

        <div style={{ display: 'flex', justifyContent: 'flex-end', borderBottom: "1px solid rgba(5, 5, 5, 0.06)" }}>
            {/* <ul> */}
            <Menu
                style={{ borderBottom: "none" }}
                onClick={onClick}
                selectedKeys={[path]} // đổi lại ko dùng current nữa
                mode="horizontal"
                items={items}
            />
            {/* </ul> */}
        </div>
    );
}

export default Header;