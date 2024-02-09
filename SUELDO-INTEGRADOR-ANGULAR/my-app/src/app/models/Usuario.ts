export interface UsuarioForm {
  username: string;
  email: string;
  password: string;
  rePassword: string;
}

export interface Usuario {
  id: number;
  username: string;
  email: string;
  roles: RolUsuario[];
}

interface RolUsuario {
  id: number;
  rol: string;
}

export interface UsuarioLogin {
  id: number;
  username: string;
  email: string;
  token: string;
}

export interface RecPasswordResponse {
  message: string;
}

export interface actualizarPassword {
  currentPassword: string;
  password: string;
  rePassword: string;
}
