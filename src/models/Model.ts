import {iUser} from "./User";


export interface iModel {
    id: number;
    name: string;
    link_photo: string;
    description: string;
    tags: Array<string>;
    price: number;
    likes: number;
    link_download: string;
    model3d: string;
    size: number;
    status: string;
    status_des: string,
    artist: iUser;
    categoryId: number;
    license: iLicense
}

export interface iLicense {
    id: number;
    name: string;
}

export interface iCategory {
    id: number;
    name: string;
}

export interface iFormat{
    id: number;
    name: string;
}

