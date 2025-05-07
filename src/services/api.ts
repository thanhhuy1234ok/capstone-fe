import createInstanceAxios from "services/axios.customize";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

export const LoginAPI = (username: string, password: string) => {
  const urlBackend = "/api/v1/auth/login";
  return axios.post<IBackendRes<ILogin>>(urlBackend, { username, password });
};

export const getAccountAPI = () => {
  const urlBackend = "/api/v1/auth/account";
  return axios.get<IBackendRes<IFetchAccount>>(urlBackend);
};

export const LogoutAPI = () => {
  const urlBackend = "/api/v1/auth/logout";
  return axios.post<IBackendRes<IFetchAccount>>(urlBackend);
};

export const callRetryActive = (email: any) => {
  const urlBackend = "/api/v1/auth/retry-password";
  return axios.post<IBackendRes<string>>(urlBackend, {
    email,
  });
};

export const callForgotPassword = (data: IChangePassword) => {
  const urlBackend = "/api/v1/auth/forgot-password";
  return axios.post<IBackendRes<string>>(urlBackend, {
    ...data,
  });
};


/**
 * Module User API
 */

export const getUsersAPI = (query: string) => {
  const urlBackend = `/api/v1/users?${query}`;
  return axios.get<IBackendRes<IModelPaginate<IUserTable>>>(urlBackend);
};

export const createUserAPI = (data: any) => {
  const urlBackend = "/api/v1/users";
  return axios.post<IBackendRes<IUserTable>>(urlBackend, { ...data });
};
export const updateUserAPI = (id: number, data: any) => {
  const urlBackend = `/api/v1/users/${id}`;
  return axios.patch<IBackendRes<IUserTable>>(urlBackend, { ...data });
};

export const detailUserAPI = (id: number) => {
  const urlBackend = `/api/v1/users/${id}`;
  return axios.get<IBackendRes<IUserTable>>(urlBackend);
};

export const deleteUserAPI = (id: number) => {
  const urlBackend = `/api/v1/users/${id}`;
  return axios.delete<IBackendRes<IUserTable>>(urlBackend);
};

export const callBulkCreateUser = (user: IExcelData[]) => {
  return axios.post<IBackendRes<IExcelData[]>>(
    "/api/v1/users/bulk-create",
    user
  );
};


/**
 *Module Roles API
 *
 */
export const getRolesAPI = (query: string) => {
  const urlBackend = `/api/v1/roles?${query}`;
  return axios.get<IBackendRes<IModelPaginate<IRole>>>(urlBackend);
};

export const createRoleAPI = (data: any) => {
  const urlBackend = "/api/v1/roles";
  return axios.post<IBackendRes<IRole>>(urlBackend, { ...data });
};

export const updateRolesAPI = (data: any) => {
  const urlBackend = "/api/v1/roles";
  return axios.patch<IBackendRes<IRole>>(urlBackend, { ...data });
};

export const detailRolesAPI = (id: number | string) => {
  const urlBackend = `/api/v1/roles/${id}`;
  return axios.get<IBackendRes<IRole>>(urlBackend);
};

/**
 * Module Major API
 */

export const getMajorAPI = (query: string) => {
  const urlBackend = `/api/v1/major?${query}`;
  return axios.get<IBackendRes<IModelPaginate<IMajor>>>(urlBackend);
};

export const createMajorAPI = (data: any) => {
  const urlBackend = "/api/v1/major";
  return axios.post<IBackendRes<IMajor>>(urlBackend, { ...data });
};

/**
 * Module Course API
 */
export const getCoursesAPI = (query: string) => {
  const urlBackend = `/api/v1/course?${query}`;
  return axios.get<IBackendRes<IModelPaginate<ICourse>>>(urlBackend);
};

export const createCourseAPI = (data: any) => {
  const urlBackend = "/api/v1/course";
  return axios.post<IBackendRes<ICourse>>(urlBackend, { ...data });
};

export const updateCourseAPI = (id: number, data: any) => {
  const urlBackend = `/api/v1/course/${id}`;
  return axios.patch<IBackendRes<ICourse>>(urlBackend, { ...data });
};

/**
 * Module Semester API
 */
export const getSemesterAPI = (query: string) => {
  const urlBackend = `/api/v1/semester?${query}`;
  return axios.get<IBackendRes<IModelPaginate<ISemester>>>(urlBackend);
};
export const createSemesterAPI = (data: any) => {
  const urlBackend = "/api/v1/semester";
  return axios.post<IBackendRes<ISemester>>(urlBackend, { ...data });
};

export const callUpdateSemester = (
  id: number | string,
  semester: ISemester
) => {
  return axios.patch<IBackendRes<ISemester>>(`/api/v1/semester/${id}`, {
    ...semester,
  });
};
