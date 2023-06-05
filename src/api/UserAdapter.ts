
import {iUser} from "../models/User";



export class UserAdapter {
    static transform(userItem: any): iUser {
        return {
            id: userItem.id,
            name: userItem.name,
            mail: userItem.mail,
            username: userItem.username,
            picture: userItem.picture,
            role: userItem.role,
            likes: userItem.likes,
            about: userItem.about
        };
    }
    static transformArray(data: any): iUser[] {
        return data.map((item: any) => this.transform(item))
    }

}