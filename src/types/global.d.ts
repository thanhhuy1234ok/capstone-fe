import { data } from "react-router-dom";
import { avatar } from "@/assets/avatar/avatar.jpg";
import { Boolean } from "./../../node_modules/sass/types/legacy/function.d";
export {};

declare global {
  interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
  }

  interface IModelPaginate<T> {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    result: T[];
  }

  interface ILogin {
    access_token: string;
    user: IUser;
  }

  interface IFetchAccount {
    user: IUser;
  }

  interface IOptionSelect {
    label: string | number;
    value: number | string;
    key?: string;
  }

  interface IUser {
    id: string | number;
    email: string;
    name: string;
    avatar: string;
    role?: {
      id: string | number;
      name: string;
    };
  }

  interface IRole {
    id: string | number;
    name: string;
    description: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
  }

  interface IUserTable {
    id: string | number;
    name: string;
    email: string;
    date_of_birth: Date;
    gender: string;
    phone: string;
    address: string;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    role?: IRole;
    major?: IMajor;
    class?: IClass;
    yearOfAdmission?: ICohort;
    scores?: IScore[];
  }

  interface IChangePassword {
    code: string;
    password: string;
    confirmPassword: string;
    email: string;
  }

  interface IDataImportProps {
    setOpenModalImport: (open: boolean) => void;
    openModalImport: boolean;
    fetchData: () => void;
    headers: string[];
    dataMapping: string[];
    templateFileUrl: string;
    uploadTitle?: string;
    apiFunction: (data: ExcelData[]) => Promise<any>;
  }

  interface IExcelData {
    fullName: string;
    email: string;
    // phone: string;
    password?: string;
  }

  interface IMajor {
    id: number | string;
    name?: string;
    code: string;
  }

  interface ICourse {
    id: number | string;
    startYear?: number;
    endYear?: number;
  }

    interface ISemester {
      id?: number | string;
      name?: string;
      startDate: Date;
      endDate: Date;
      isMainSemester?: boolean;
      order:number;
      maxCredits?: number;
      course?: ICourse;
    }

    interface ISubject {
      id?: number | string;
      name?: string;
      code: string;
      credits: number;
      price: number;
      isElective:boolean;
    }

    
  interface ICampus {
    id: number | string;
    name: string;
    location: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
  }

  interface ITotalCampus {
    totalCampuses: number;
    totalBuildings: number;
    totalRooms: number;
  }

  interface ISummaryCampus {
    campusId: number;
    campusName: string;
    totalBuildings: number;
    totalRooms: number;
    totalFloors: number;
  }

  interface IDetailCampus {
    name: string;
    buildings: IBuilding[];
  }

  interface IBuilding {
    name: string;
    floors: IFloor[];
    roomsWithoutFloor: string[];
  }
  interface IFloor {
    floor: number;
    rooms: string[];
  }
  interface IBuildingData {
    id?: number | string;
    name?: string;
    totalFloors: number;
    hasFloors: boolean;
    campusId: number | string;
    campus: ICampus;
  }
  interface IFloorData {
    id?: number | string;
    name?: string;
    floor: number;
    hasRooms: boolean;
    buildingId: number | string;
  }

    interface IRoom {
      id?: number | string;
      name?: string;
      capacity?: number;
      status?: string;
      building?: IBuildingData;
      assignments?: IAssignment[];
      equipments?: IEquipment[];
    }

    interface ISupplier {
      id?: number | string;
      name?: string;
      address?: string;
      phone?: string;
      email?: string;
      note?: string;
    }
}
