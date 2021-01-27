import { Role } from "./role";

export interface User {
    id: number;
    Nome: string;
    SobreName: string;
    Email: string;
    NIF: String;
    role: Role;
    token?: string;
}
