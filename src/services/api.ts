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