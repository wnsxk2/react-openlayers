export type RequestLogin = {
  id: string;
  password: string;
};

export type Tokens = {
  accessToken: string | null;
  refreshToken: string | null;
};
