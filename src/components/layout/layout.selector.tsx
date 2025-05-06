import { Navigate, useRoutes } from "react-router-dom";
import LayoutAdmin from "./layout.admin";
import LayoutStudent from "./layout.student";
import LayoutTeacher from "./layout.teacher";
import { useCurrentApp } from "@/context/app.context";
import path from "path";
import ManagerUserPage from "@/pages/admin/manager_user/user.manager";
import ManagerRolesPage from "@/pages/admin/manager_user/roles.manager";

const LayoutSelector = () => { 
    const { isAuthenticated, user } = useCurrentApp();

    if (isAuthenticated === false) {
        return <Navigate to="/login" replace />;
    }

    const adminRoutes = {
        element: <LayoutAdmin />,
        children: [
            { path: '/', element: (<>admin</>) },
            { path: 'manage-user/users', element: <ManagerUserPage/>},
            { path: 'manage-user/roles', element: <ManagerRolesPage/> },
        ],
    }

    const userRoutes = {
        element: <LayoutStudent />,
        children: [
            { path: '/', element: (<>user</>) },
            { path: '/users', element: (<>user profile</>) },
           
        ],
    };

    const teacherRoutes = {
        element: <LayoutTeacher />,
        children: [
            { path: '/', element: (<>teacher</>) },
        ]
    }

    const getRoutesByRole = (role: string) => {
        switch (role) {
            case 'admin':
                return adminRoutes;
            case 'teacher':
                return teacherRoutes;
            default:
                return userRoutes;
        }
    };



    const baseRoutes = getRoutesByRole(user?.role?.name.toLowerCase() || "");

    const element = useRoutes([baseRoutes]);
    return element;
}
export default LayoutSelector;