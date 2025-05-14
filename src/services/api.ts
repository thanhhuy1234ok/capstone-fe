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

/**
 * Module Subject API
 */
export const getSubjectAPI = (query: string) => {
  const urlBackend = `/api/v1/subject?${query}`;
  return axios.get<IBackendRes<IModelPaginate<ISubject>>>(urlBackend);
};

export const createSubjectAPI = (data: any) => {
  const urlBackend = "/api/v1/subject";
  return axios.post<IBackendRes<ISubject>>(urlBackend, { ...data });
};




/**
 * Module Campus API
 */
export const getCampusAPI = (query: string) => {
  const urlBackend = `/api/v1/campus?${query}`;
  return axios.get<IBackendRes<IModelPaginate<ICampus>>>(urlBackend);
}

export const getAllTotalCampusAPI = () => {
  const urlBackend = `/api/v1/campus/total-all-campus`;
  return axios.get<IBackendRes<ITotalCampus>>(urlBackend);
}

export const summaryCampusDetailAPI = (campusId:number) => {
  const urlBackend = `/api/v1/campus/summary?campusId=${campusId}`;
  return axios.get<IBackendRes<ISummaryCampus>>(urlBackend);
};

export const createCampusAPI = (data: any) => {
  const urlBackend = "/api/v1/campus";
  return axios.post<IBackendRes<ICampus>>(urlBackend, { ...data });
}

export const detailCampusAPI = (id: number) => {
  const urlBackend = `/api/v1/campus/campus-detail?campusId=${id}`;
  return axios.get<IBackendRes<IDetailCampus>>(urlBackend);
}

export const createBuildingAPI = (data: any) => {
  const urlBackend = "/api/v1/building";
  return axios.post<IBackendRes<IBuildingData>>(urlBackend, { ...data });
}

export const getListBuildingByCampusAPI = (id: string) => {
  const urlBackend = `/api/v1/building?campusID=${id}`;
  return axios.get<IBackendRes<IModelPaginate<IBuildingData>>>(urlBackend);
}


/**
 * Module Floor API
 */
export const getFloorAPI = (query: string) => {
  const urlBackend = `/api/v1/floor?buildingId=${query}`;
  return axios.get<IBackendRes<IModelPaginate<IFloorData>>>(urlBackend);
}

/**
 * Module Room API
 */

export const getRoomAPI = (query: string) => {
  const urlBackend = `/api/v1/room?${query}`;
  return axios.get<IBackendRes<IModelPaginate<IRoom>>>(urlBackend);
};
export const createRoomAPI = (data: any) => {
  const urlBackend = "/api/v1/room";
  return axios.post<IBackendRes<IRoom>>(urlBackend, { ...data });
};

// export const createRoomAPIV1 = (data: any) => {
//   const urlBackend = "/api/v1/room";
//   return axios.post<IBackendRes<IRoom>>(urlBackend, { ...data });
// }

export const createRoomBulkFacilityAPI = (data: any) => {
  const urlBackend = "/api/v1/room/bulk-room-facility";
  return axios.post<IBackendRes<IRoom>>(urlBackend, { ...data });
};

export const getDetailRoomAPI = (id: number) => {
  const urlBackend = `/api/v1/room/${id}`;
  return axios.get<IBackendRes<IRoom>>(urlBackend);
};

/**
 * Module Supplier API
 */

export const getSupplierAPI = (query: string) => {
  const urlBackend = `/api/v1/supplier?${query}`;
  return axios.get<IBackendRes<IModelPaginate<ISupplier>>>(urlBackend);
}

export const createSupplierAPI = (data: any) => {
  const urlBackend = "/api/v1/supplier";
  return axios.post<IBackendRes<ISupplier>>(urlBackend, { ...data });
}
