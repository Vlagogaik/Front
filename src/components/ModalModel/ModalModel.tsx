import s from "./ModalModel.module.css"
import {iModel} from "../../models/Model";
import {NavLink} from "react-router-dom";
import CanvasModel from "../Landing/CanvasModel";
import {observer} from "mobx-react-lite";
import {useUserStore} from "../../store/UserStore";
import {createBasketItem, getBasketItems} from "../../api/ModelApi";
import React, {useEffect, useState} from "react";
import {iBasketItems} from "../../models/Basket_items";


const ModalModel = observer( ({cart}:{cart:iModel}) => {
    const tagsElement = cart.tags.map(t => <div key={t} className={s.tag}>{t}</div>);
    const userStore = useUserStore();

    const [basketItems, setBasketItems] = useState<Array<iBasketItems>>([]);
    async function fetchModels() {
        const newBasketItems = await getBasketItems(userStore.user.id);
        setBasketItems(newBasketItems)
    }

    useEffect(() => {
        fetchModels().catch(console.error)
    }, []);

    const addBasketItem = async () => {
        await createBasketItem({
            basketId: userStore.user.id,
            modelId: cart.id
        })
        fetchModels().catch(console.error)
    }

    let pathLink = "http://localhost:5001/rar/" + cart.link_download
    let path = "/user/" + cart.artist.id;



    return (
        <div className={s.modal_content} onClick={e => e.stopPropagation()} >
            <div className={s.img_dis_comm}>
                <div className={s.photo}>
                    <CanvasModel cart={cart} />
                </div>
                <div className={s.name_model}>
                    <span>{cart.name}</span>
                    <NavLink to={path} className={s.artist}>
                        <img src={cart.artist.picture} alt=""/>
                        <span>{cart.artist.username}</span>
                    </NavLink>
                </div>

                <div className={s.description}>
                    {cart.description}
                </div>
                <div className={s.tags}>
                    {tagsElement}
                </div>
            </div>

            <div className={s.payment}>
                {cart.price === 0 || cart.artist.id === userStore.user.id ?(
                    <div className={s.cart_price}>
                        <span>Бесплатно</span>
                        <a href={pathLink}><button type='submit'>Скачать</button></a>
                    </div>
                ):
                    <div className={s.cart_price}>
                        <span>{cart.price} руб</span>
                        { basketItems.filter(m=> m.idmodel.id==cart.id)[0] ?(
                                <NavLink to="/shopbasket" > <button type='submit'>перейти в корзину</button></NavLink>
                            ):
                            <button onClick={addBasketItem}>Добавить в корзину</button>
                        }
                    </div>
                }

                <div className={s.cart_info}>
                    <div className={s.rate}>
                        wip
                    </div>
                    <div className={s.license}>
                        <span className={s.zag}>Лицензия</span>
                        <span>{cart.license.name}</span>
                    </div>
                    <div className={s.formats}>
                        <span className={s.zag}>Форматы</span>
                        <br/>
                        <span>ds</span>
                    </div>
                </div>
                <div className={s.btn_swap}>
                    Перейти к видеогайду

                </div>
            </div>
        </div>
    );

})
export default ModalModel