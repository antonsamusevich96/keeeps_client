export interface IUser {
  name: string;
  surname: string;
  email: string;
  countActiveTasks: number;
  countPendingTasks: number;
}

export interface ISignInForm {
  name: string;
  password: string;
  isRemember: boolean;
}

