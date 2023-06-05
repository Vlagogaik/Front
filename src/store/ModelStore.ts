import {makeAutoObservable} from "mobx";
import React from "react";
import {iCategory, iFormat} from "../models/Model";

interface iLicence {
    id: number,
    name: string
}

 class ModelStore {
    _licenses: Array<iLicence> = [];
    _categories: Array<iCategory> = [];
    _formats: Array<iFormat> = [];

    constructor() {
        makeAutoObservable(this)
    }

    setLicenses(licenses:Array<iLicence>) {
        this._licenses = licenses
    }

    get licenses() {
        return this._licenses
    }

     setCategories(categories:Array<iCategory>) {
         this._categories = categories
     }

     get categories() {
         return this._categories
     }

     setFormats(formats:Array<iFormat>) {
         this._formats = formats
     }

     get formats() {
         return this._formats
     }


}
export const ModelInstance = new ModelStore();
export const ModelContext = React.createContext(ModelInstance);

export const useModelStore = () => {
    return React.useContext(ModelContext);
};

export default ModelInstance;