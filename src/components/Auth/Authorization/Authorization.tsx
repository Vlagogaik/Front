import s from "./Authorization.module.css"
import {NavLink} from "react-router-dom";
import mainLogo from "../../../public/main_logo.png";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom"
import {login, registration} from "../../../api/UserApi";
import {useUserStore} from "../../../store/UserStore";



const Authorization = () => {
    const navigate = useNavigate()
    const userStore = useUserStore();

    const [mail, setMail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const signIn = async ()=> {
        try {
            const user = await login({mail, password})
            userStore.setUser(user)
            navigate('/landing')
        } catch (e:any) {
            alert(e.response.data.message)
        }
    }

    useEffect(() => {
        if (userStore._user.id) {
            navigate('/landing')
        }
    }, [userStore._user.id]);
    
    return (
        <div>
            <div className={s.logo}>
                <NavLink to="/landing"><img src={mainLogo} alt=""/></NavLink>
            </div>
            <div className={s.img_block}></div>
            <div className={s.auth_content}>
                <h2>Пожалуйста войдите</h2>
                <div className={s.authorization_block}>
                    <input value={mail} onChange={e=> setMail(e.target.value)} name='email' type='text' placeholder='mail'/>
                    <input value={password} onChange={e=> setPassword(e.target.value)} name='password' type='password' placeholder='pass'/>
                    <div className={s.btns}>
                        <button onClick={()=> signIn()} type='submit'>Войти</button>
                        <div className={s.recover_block}>
                            <span>Забыли свой пароль?</span>
                            <br/>
                            <span>Восстановить</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default Authorization