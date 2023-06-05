import {$authHost, $host} from "./index";
import {iCategory, iFormat, iLicense, iModel} from "../models/Model";
import {ModelAdapter} from "./ModelAdapter";
import {iBasketItems} from "../models/Basket_items";


export async function fetchLicenses(): Promise<iLicense[]> {
    const { data } = await $host.get('api/license/')
    return data
}

export async function fetchCategories(): Promise<iCategory[]> {
    const { data } = await $host.get('api/categories/')
    return data
}

export async function fetchFormats(): Promise<iFormat[]> {
    const { data } = await $host.get('api/formats/')
    return data
}

export async function fetchModels({search, status,categoryId,licenseId,formatId }:{search?:string, status?:string, categoryId?:string[],licenseId?:string[],formatId?:string }): Promise<iModel[]> {
    const { data } = await $host.get('api/model/',{
        params: { searchField:search, status: status, categoryId:categoryId, licenseId:licenseId, formatId:formatId }
    })
    return ModelAdapter.transformModelArray(data);
}

export async function updateModel(model:any): Promise<iModel> {
    const formData = new FormData();
    for (let key in model) {
        if (key === "tags") {
            for (let i = 0; i < model.tags.length; i++) {
                formData.append(key, model.tags[i]);
            }
        } else {
            formData.append(key, model[key]);
        }
    }
    const { data } = await $host.put("api/model/", formData)
    return data
}

export async function fetchUserModels(userId:string): Promise<iModel[]> {
    const { data } = await $host.get('api/user_models/'+userId)
    return ModelAdapter.transformModelArray(data);
}

export const createModel = async (model:any) => {

    const formData = new FormData();
    for (let key in model) {
        if (key === "tags") {
            for (let i = 0; i < model.tags.length; i++) {
                formData.append(key, model.tags[i]);
            }
        } else {
            formData.append(key, model[key]);
        }
    }
    const {data} = await $authHost.post('api/model', formData)
    return data
}

export const createBasketItem = async (basket_item:any) => {
    const formData = new FormData();

    for (let i in basket_item) {
        formData.append(i, basket_item[i]);
    }
    const {data} = await $host.post('api/basket_item', formData)
    return data
}

export async function getBasketItems(id:number): Promise<iBasketItems[]> {
    const { data } = await $host.get("api/basket_items/"+id)
    return ModelAdapter.transformBasketArray(data);
}

export async function deleteBasketItem(id:number): Promise<iBasketItems[]> {
    const { data } = await $host.delete("api/basket_items/"+id)
    return data
}





