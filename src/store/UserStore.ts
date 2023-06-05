import React from "react";
import { makeAutoObservable } from "mobx";
import { iUser } from "../models/User";


class UserStore {
    _user: iUser = {} as iUser;

    constructor() {
        makeAutoObservable(this);
    }

    setUser(user: iUser) {
        this._user = { ...user };
    }

    get user() {
        return this._user
    }


}

export const UserInstance = new UserStore();
export const UserContext = React.createContext(UserInstance);

export const useUserStore = () => {
    return React.useContext(UserContext);
};

export default UserInstance;