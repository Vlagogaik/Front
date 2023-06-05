import {BASKET_ROUTE, GALLERY_ROUTE, LANDING_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, USER_ROUTE} from "../utils/consts";
import ShopBasket from "./components/ShopBasket/ShopBasket";
import Landing from "./components/Landing/Landing";
import Authorization from "./components/Auth/Authorization/Authorization";
import Registration from "./components/Auth/Registration/Registration";
import Gallery from "./components/Gallery/Gallery";
import ProfileUser from "./components/ProileUser/ProfileUser";


export const authRoutes = [
    {
        path: BASKET_ROUTE,
        Component: ShopBasket
    }
]

export const publicRoutes = [
    {
        path: LANDING_ROUTE,
        Component: Landing
    },
    {
        path: LOGIN_ROUTE,
        Component: Authorization
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Registration
    },
    {
        path: USER_ROUTE,
        Component: ProfileUser
    },
    {
        path: GALLERY_ROUTE,
        Component: Gallery
    },
]