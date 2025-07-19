export interface SignInRequest {
  username: string;
  password: string;
}

export interface SignInResponse {
  token: string;
  id: number;
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}
