export interface AuthResponse {
  ok?:       boolean;
  uid?:      string;
  email?:    string;
  username?: string;
  name?:     string;
  lastName?: string;
  token?:    string;
  msg? :     string;
}

export interface Login {
  email :     string;
  password:   string;
}

export interface Usuario {
  uid?:      string;
  username?: string;
  email?:    string;
  name?:     string;
  lastName?: string;
}

export interface Registro {
  username: string;
  email:    string;
  name:     string;
  lastName: string;
  password: string;
}