export interface IUser {
  name: string;
  email: string;
  role: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface IGenericResponse {
  status: string;
  message: string;
}

export interface IGetmeResponse {
  status: string;
  user: IUser;
}
