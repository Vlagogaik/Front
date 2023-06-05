import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode"
import {iUser} from "../models/User";
import {UserAdapter} from "./UserAdapter";
import {iModel} from "../models/Model";

export const registration = async ({mail, password, name, username}:{mail:string, password:string, name:string, username:string}):Promise<iUser>  => {
    const { data } = await $host.post('api/registration', {mail, password, role:'ADMIN', name, username})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async ({mail, password}:{mail:string, password:string}):Promise<iUser>  => {
    const { data } = await $host.post("api/login", { mail, password });
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
export async function updateUser(user:any): Promise<iUser> {
    const formData = new FormData();
    for (let key in user) {
        formData.append(key, user[key]);
    }
    const { data } = await $host.put("api/user/", formData)
    return data
}

export const check = async ():Promise<iUser> => {
    const { data } = await $authHost.get("api/auth")
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export async function getAllUsers (): Promise<iUser[]>  {
    const { data } = await $host.get('api/users')
    return UserAdapter.transformArray(data);
}

export async function getOneUser(id:string): Promise<iUser> {
    const { data } = await $host.get("api/user/"+id)
    return UserAdapter.transform(data);
}
