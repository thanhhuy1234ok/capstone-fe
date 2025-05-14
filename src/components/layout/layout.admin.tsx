import React, { act, useEffect, useState } from 'react';
import {
    AppstoreOutlined,
    ExceptionOutlined,
    HeartTwoTone,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Dropdown, Space, Avatar } from 'antd';
import { Outlet, redirect, useLocation, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import type { MenuProps } from 'antd';
import avatar from '@/assets/avatar/avatar.jpg'
import { LogoutAPI } from '@/services/api';
import { useCurrentApp } from '@/context/app.context';
type MenuItem = Required<MenuProps>['items'][number];

const { Content, Footer, Sider } = Layout;


const LayoutAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState('');
    const {
        user, setUser, setIsAuthenticated, isAuthenticated,
    } = useCurrentApp();
    const navigate = useNavigate();

    const location = useLocation();

    const items: MenuItem[] = [
        {
            label: <Link to="/">Dashboard</Link>,
            key: "/",
            icon: <AppstoreOutlined />,
        },
        {
            label: "Quản lý người dùng",
            key: "/manage-user",
            icon: <ExceptionOutlined />,
            children: [
                {
                    label: <Link to="/manage-user/users">Người dùng</Link>,
                    key: "/manage-user/users", 
                    icon: <ExceptionOutlined />,
                },
                {
                    label: <Link to="/manage-user/roles">Phân quyền</Link>,
                    key: "/manage-user/roles",
                    icon: <ExceptionOutlined />,
                },
            ],
        },
        {
            label: "Quản lý Chương trình Đào tạo",
            key: "/manage-curriculum",
            icon: <ExceptionOutlined />,
            children: [
                {
                    label: <Link to="/manage-curriculum/course">Khóa học</Link>,
                    key: "/manage-curriculum/course",
                    icon: <ExceptionOutlined />,
                },
                {
                    label: <Link to="/manage-curriculum/major">Chuyên ngành</Link>,
                    key: "/manage-curriculum/major",
                    icon: <ExceptionOutlined />,
                },
                {
                    label: <Link to="/manage-curriculum/semester">Kỳ học</Link>,
                    key: "/manage-curriculum/semester",
                    icon: <ExceptionOutlined />,
                },
                {
                    label: <Link to="/manage-curriculum/curriculum">Lộ trình học chuyên nghành</Link>,
                    key: "/manage-curriculum/curriculum",
                    icon: <ExceptionOutlined />,
                },
                {
                    label: <Link to="/manage-curriculum/subject">Môn học</Link>,
                    key: "/manage-curriculum/subject",
                    icon: <ExceptionOutlined />,
                },

            ],
        },
        {
            label: "Quản lý Môn học và lớp học",
            key: "/manage-subject",
            icon: <ExceptionOutlined />,
            children: [
                {
                    label: <Link to="/manage-subject/class">Lớp học</Link>,
                    key: "/manage-curriculum/class",
                    icon: <ExceptionOutlined />,
                },
                {
                    label: <Link to="/manage-subject/users">Lịch học</Link>,
                    key: "/manage-subject/users",
                    icon: <ExceptionOutlined />,
                },
            ],
        },
        {
            label: "Quản lý Cơ sở & Phòng học",
            key: "/manage-campus-room",
            icon: <ExceptionOutlined />,
            children: [
                {
                    label: <Link to="/manage-campus-room/buildings">Cơ sở và Tòa nhà</Link>,
                    key: "/manage-campus-room/buildings",
                    icon: <ExceptionOutlined />,
                },
                {
                    label: <Link to="/manage-campus-room/classrooms">Phòng học</Link>,
                    key: "/manage-campus-room/classrooms",
                    icon: <ExceptionOutlined />,
                },
            ],
        },
        {
            label: "Quản lý Cơ sở vật chất",
            key: "/manage-facility",
            icon: <ExceptionOutlined />,
            children: [
                {
                    label: <Link to="/manage-facility/facility">Quản lý Thiết bị</Link>,
                    key: "/manage-facility/facility",
                    icon: <ExceptionOutlined />,
                },
                {
                    label: <Link to="/manage-facility/facility-items">Quản lý từng thiết bị cụ thể</Link>,
                    key: "/manage-facility/facility-items",
                    icon: <ExceptionOutlined />,
                },
                {
                    label: <Link to="/manage-facility/device_loans">Quản lý mượn/trả thiết bị</Link>,
                    key: "/manage-facility/device_loans",
                    icon: <ExceptionOutlined />,
                },
                {
                    label: <Link to="/manage-facility/supplier">Nhà cung cấp</Link>,
                    key: "/manage-facility/supplier",
                    icon: <ExceptionOutlined />,
                },
                {
                    label: <Link to="/manage-facility/facility-history">Lịch sử bố trí thiết bị</Link>,
                    key: "/manage-facility/facility-history",
                    icon: <ExceptionOutlined />,
                },
                {
                    label: <Link to="/manage-facility/maintenance-history">Lịch sử bảo trì</Link>,
                    key: "/manage-facility/maintenance-history",
                    icon: <ExceptionOutlined />,
                },
                {
                    label: <Link to="/manage-facility/facility-status-logs">Lịch sử thay đổi trạng thái</Link>,
                    key: "/manage-facility/facility-status-logs",
                    icon: <ExceptionOutlined />,
                },

            ],

        },
        {
            label: "Quản lý người cán bộ giảng viên",
            key: "/manage-teacher",
            icon: <ExceptionOutlined />,
            children: [
                {
                    label: <Link to="/manage-teacher/roles">Lịch sử chấm công</Link>,
                    key: "/manage-teacher/roles",
                    icon: <ExceptionOutlined />,
                },
                {
                    label: <Link to="/manage-teacher/salary">Tính lương giảng viên</Link>,
                    key: "/manage-teacher/salary",
                    icon: <ExceptionOutlined />,
                },
            ],
        },

    ];

    useEffect(() => {
        const matchedKey = findActiveKey(items, location.pathname);
        setActiveMenu(matchedKey || '/');
    }, [location]);

    const findActiveKey = (items: MenuItem[] = [], path: string): string | undefined => {
        for (const item of items) {
            if (!item || typeof item !== 'object') continue;

            if ('key' in item && item.key === path) {
                return item.key;
            }

            if ('children' in item && Array.isArray(item.children)) {
                const found = findActiveKey(item.children as MenuItem[], path);
                if (found) return found;
            }
        }
        return undefined;
    };

    const handleLogout = async () => {
        const res = await LogoutAPI();
        if (res.data) {
            setUser(null);
            setIsAuthenticated(false);
            localStorage.removeItem("access_token");
            navigate("/login");
        }
    }

    const handleProfile = () => {
        navigate("/admin/profile");
    }


    const itemsDropdown = [
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={handleProfile}
            >Quản lý tài khoản</label>,
            key: 'account',
        },
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={() => handleLogout()}
            >Đăng xuất</label>,
            key: 'logout',
        },

    ];

    // const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user?.avatar}`;
    const urlAvatar = user?.avatar
        ? `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user.avatar}`
        : avatar;

    if (isAuthenticated === false) {
        return (
            <Outlet />
        )
    }

    return (
        <>
            <Layout
                style={{ minHeight: '100vh' }}
                className="layout-admin"
            >
                <Sider
                    theme='light'
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                    width={300} 
                    >
                    <div style={{ height: 32, margin: 16, textAlign: 'center', }}>
                        Admin
                    </div>
                    <Menu
                        defaultSelectedKeys={[activeMenu]}
                        selectedKeys={[activeMenu]}
                        mode="inline"
                        items={items}
                        onClick={(e) => setActiveMenu(e.key)}
                    />
                </Sider>
                <Layout>
                    <div className='admin-header' style={{
                        height: "50px",
                        borderBottom: "1px solid #ebebeb",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0 15px",

                    }}>
                        <span>
                            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                onClick: () => setCollapsed(!collapsed),
                            })}
                        </span>
                        <Dropdown menu={{ items: itemsDropdown }} trigger={['click']}>
                            <Space style={{ cursor: "pointer" }}>
                                <Avatar src={urlAvatar} />
                                {user?.email}
                            </Space>
                        </Dropdown>
                    </div>
                    <Content style={{ padding: '15px' }}>
                        <Outlet />
                    </Content>
                    <Footer style={{ padding: 0, textAlign: "center" }}>
                        © {new Date().getFullYear()} University Management System – Developed by School university with <HeartTwoTone twoToneColor="#eb2f96" />
                    </Footer>
                </Layout>
            </Layout>
        </>
    );
};

export default LayoutAdmin;