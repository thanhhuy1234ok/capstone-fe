import { Navigate, useRoutes } from "react-router-dom";
import LayoutAdmin from "./layout.admin";
import LayoutStudent from "./layout.student";
import LayoutTeacher from "./layout.teacher";
import { useCurrentApp } from "@/context/app.context";
import path from "path";
import ManagerUserPage from "@/pages/admin/manager_user/user.manager";
import ManagerRolesPage from "@/pages/admin/manager_user/roles.manager";
import ManagerCoursePage from "@/pages/admin/manager_curriculum/course.manager";
import ManagerMajorPage from "@/pages/admin/manager_curriculum/major.manager";
import ManagerSemesterPage from "@/pages/admin/manager_curriculum/semester.manager";
import ManagerClassPage from "@/pages/admin/manager_subject_class/class.manager";
import ManagerCurriculumPage from "@/pages/admin/manager_curriculum/curriculum.manager";
import ManagerSubjectPage from "@/pages/admin/manager_curriculum/subject.manager";
import CampusPage from "@/pages/admin/manager_campus_room/manager.campus";
import DetailCampusPage from "@/pages/admin/manager_campus_room/detail.campus";
import ManagerRoomPage from "@/pages/admin/manager_campus_room/room.manager";
import ManagerFacilityPage from "@/pages/admin/manager_facility/facility.manager";
import ManagerMaintenanceHistoryPage from "@/pages/admin/manager_facility/maintenance.history.manager";
import ManagerFacilityHistoryPage from "@/pages/admin/manager_facility/facility.history.manager";
import SupplierManagerPage from "@/pages/admin/manager_facility/supplier.manager";

const LayoutSelector = () => { 
    const { isAuthenticated, user } = useCurrentApp();

    if (isAuthenticated === false) {
        return <Navigate to="/login" replace />;
    }

    const adminRoutes = {
        path: '/',
        element: <LayoutAdmin />,
        children: [
            { index: true, element: <>admin</> },

            {
                path: 'manage-user',
                children: [
                    { path: 'users', element: <ManagerUserPage /> },
                    { path: 'roles', element: <ManagerRolesPage /> },
                ],
            },

            {
                path: 'manage-curriculum',
                children: [
                    { path: 'course', element: <ManagerCoursePage /> },
                    { path: 'major', element: <ManagerMajorPage /> },
                    { path: 'semester', element: <ManagerSemesterPage /> },
                    { path: 'curriculum', element: <ManagerCurriculumPage /> },
                    { path: 'subject', element: <ManagerSubjectPage /> },
                ],
            },
            {
                path:'manager-subject-class',
                children:[
                    { path: 'class', element: <ManagerClassPage /> },
                ]
            },

            {
                path:'manage-campus-room',
                children:[
                    { path: 'buildings', element: <CampusPage /> },
                    { path: 'buildings/:id', element: <DetailCampusPage /> },
                    { path: 'classrooms', element: <ManagerRoomPage/> },
                ]
            },

            {
                path: 'manage-facility',
                children: [
                    { path: 'facility', element: <ManagerFacilityPage /> },
                    { path: 'facility-items', element: (<>items facility</>)},
                    { path: 'device_loans', element: (<>device_loans</>) },
                    { path: 'supplier', element: <SupplierManagerPage/> },
                    { path: 'facility-history', element: <ManagerFacilityHistoryPage /> },
                    { path: 'maintenance-history', element: <ManagerMaintenanceHistoryPage /> },
                    { path:'facility-status-logs', element: (<>facility-status-logs</>) },
                ]
            },
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