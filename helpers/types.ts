export type User = {
  id?: number;
  name: string;
  job: string
};

export type Login = {
  email: string;
  password?: string;
}