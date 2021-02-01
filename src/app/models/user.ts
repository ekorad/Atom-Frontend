export interface User {
  [propName: string]: number | string | boolean;
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: string;
  locked: boolean;
  activated: boolean;
}
