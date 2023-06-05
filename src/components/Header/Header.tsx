import s from "./Header.module.css"
import basket_icon from "../../public/basket.svg";
import alarm_icon from "../../public/alarm.svg";
import user_icon from "../../public/user.svg";
import {NavLink} from "react-router-dom";
import React from "react";
import mainLogo from "../../public/main_logo.png";
import {useUserStore} from "../../store/UserStore";
import { observer } from "mobx-react-lite";
import {iUser} from "../../models/User";


const Header = observer(() => {

    const userStore = useUserStore();
    const pathUser = "/user/"+userStore.user.id

    const onExitClick = () => {
        localStorage.removeItem("token")
        userStore.setUser({} as iUser)

    }

    return (
        <div className={s.header}>
            <div className={s.logo}>
                <NavLink to="/landing"><img src={mainLogo} alt=""/></NavLink>
            </div>

            <nav className={s.navbar}>
                <div className={s.item}>
                    <NavLink to="/gallery" className={NavData => NavData.isActive ? s.active : s.item}>Каталог </NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to="/shopbasket" className={NavData => NavData.isActive ? s.active : s.item}>ShopBasket </NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to="/confirm" className={NavData => NavData.isActive ? s.active : s.item}>conf </NavLink>
                </div>
            </nav>
            {!userStore.user.id ?
                <div className={s.auth_and_registration_btns}>
                    <NavLink to="/authorization" className={s.auth_btn}>
                        <div>Войти</div>
                    </NavLink>
                    <NavLink to="/registration" className={s.reg_btn}>Зарегистрироваться </NavLink>
                </div>
                :
                <div className={s.auth_panel}>
                    <NavLink to={pathUser} > <img src={user_icon} alt=""/> </NavLink>
                    <NavLink to="/shopbasket" > <img src={alarm_icon} alt=""/> </NavLink>
                    <NavLink to="/shopbasket" > <img src={basket_icon} alt=""/> </NavLink>
                    <div className={s.auth_btn} onClick={onExitClick}>Выйти</div>
                </div>
            }

        </div>
    );
})
export default Header