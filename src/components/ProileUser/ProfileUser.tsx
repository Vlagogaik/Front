import {NavLink, useLocation, useNavigate, useParams} from "react-router-dom";
import {iModel} from "../../models/Model";
import {iUser} from "../../models/User";
import React, {useEffect, useState} from "react";
import s from "./ProfileUser.module.css"
import find_icon from "../../public/find.png";
import {getOneUser, updateUser} from "../../api/UserApi";
import {createModel, fetchUserModels} from "../../api/ModelApi";
import Carts from "../Gallery/Carts/Carts";
import {useUserStore} from "../../store/UserStore";
import {observer} from "mobx-react-lite";


const ProfileUser = observer( () => {
    let { id } = useParams();
    let navigate = useNavigate()

    const userStore = useUserStore();

    const [userToShow, setUserToShow] = useState<iUser>({} as iUser)
    const [modelsUserToShow, setModelsUserToShow] = useState<iModel[]>([]);

    const uName = userToShow.username

    const [username, setUsername] = useState<string>();
    const [about, setAbout] = useState<string>();
    const [te, setTe] = useState<boolean>(false);

    const updateU = async (bool:boolean) => {
        await updateUser({
            id: userToShow.id,
            username: username,
            about: about
        })
        setTe(bool)
        if (id) {
            fetchUser(id).catch(console.error)
        } else {
            navigate('/landing')
        }
    }


    const ttClick = (bool:boolean) => {
        setTe(bool)
    }

    async function fetchUser(userId:string) {
        const newUser = await getOneUser(userId);
        setUserToShow(newUser)
        setUsername(newUser.username)
        setAbout(newUser.about)
    }
    async function fetchModelsByUser(userId:string) {
        const models = await fetchUserModels(userId);
        setModelsUserToShow(models)
    }


    useEffect(() => {
        if (id) {
            fetchUser(id).catch(console.error)
            fetchModelsByUser(id).catch(console.error)
        } else {
            navigate('/landing')
        }

    }, []);


    return (
        <div>
            <div className={s.bg_profile}></div>
            <div className={s.content}>
                <div className={s.cars_filters}>
                    <div className={s.search_block}>
                        <img src={find_icon} className={s.find_icon} alt=""/>
                        <input name="name" className={s.input_search}  />
                    </div>
                    <Carts cartsProf={true} models = {modelsUserToShow} ></Carts>
                </div>
                <div className={s.profile_info}>
                    <div className={s.user_block}>
                        <img src={userToShow.picture} alt=""/>
                        {te? (
                            <input value={username} onChange={e => setUsername(e.target.value)} name='name' type='text' placeholder='Название'/>
                        ):(
                            <div>{userToShow.username}</div>
                        )}
                        <div className={s.about}>
                            <h2>Обо мне</h2>
                            {te? (
                                <input value={about} onChange={e => setAbout(e.target.value)} name='name' type='text' placeholder='Название'/>
                            ):(
                                <span>{userToShow.about}</span>
                            )}

                        </div>
                    </div>
                    {userStore.user.id == userToShow.id &&(
                        <div>
                            <NavLink to="/add"><button>Добавить модель</button></NavLink>
                            {te? (
                                <button onClick={()=> updateU(false)}>Сохранить</button>
                            ):(
                                <button onClick={()=> ttClick(true)}>Редактировать профиль</button>
                            )}


                        </div>
                    )}
                </div>
            </div>
            {/*<img src={users[idUser].picture} alt=""/>*/}
            {/*<span>{users[idUser].name}</span>*/}
            {/*{idUser}*/}
        </div>
    );
})
export default ProfileUser