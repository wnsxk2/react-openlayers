// Types
export type Signup = {
  id: string;
  password: string;
  email: string;
  username: string;
  tel: string;
};

export type Login = {
  id: string;
  password: string;
};

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};
