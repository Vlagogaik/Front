
import s from "./CartsBasket.module.css"
import {iModel} from "../../../models/Model";
import CartBasket from "./Cart/CartBasket"
import React, {useEffect, useState} from "react";
import {iBasketItems} from "../../../models/Basket_items";
import {useUserStore} from "../../../store/UserStore";
import {observer} from "mobx-react-lite";
import {deleteBasketItem, getBasketItems} from "../../../api/ModelApi";


const CartsBasket = observer( () => {
    const userStore = useUserStore();
    const [basketItems, setBasketItems] = useState<Array<iBasketItems>>([]);

    async function fetchModels() {
        const newBasketItems = await getBasketItems(userStore.user.id);
        setBasketItems(newBasketItems)
    }
    async function deleteModel(modelId:number) {
        await deleteBasketItem(modelId)
        fetchModels().catch(console.error)
    }

    useEffect(() => {
        fetchModels().catch(console.error)
    }, []);

    let cartsElements = basketItems.map(m => <CartBasket
        key={m.id}
        model = {m.idmodel}
        artist = {m.idmodel.artist}
        id_basket_item = {m.id}
        deleteModel = {deleteModel}
    />)

    let price = basketItems.reduce((sum, cart) => sum + cart.idmodel.price, 0);



    return (
        <div className={s.container}>
            <div className={s.carts}>
                {cartsElements}
            </div>
            <div className={s.payment_and_btn}>
                <div className={s.payment}>
                    <div className={s.info}>
                        <h2>Информация о покупке</h2>
                        <span>После оплаты, вы сможете загрулить файлы или смотреть видеоурок со страницы товара или с вашей библиотеки покупок</span>
                    </div>
                    <div className={s.price}>
                        <span>Цена</span>
                        <span className={s.p}>{price} руб</span>
                    </div>
                </div>
                <div>
                    <button onClick={()=> testConsole()} type='submit'>Купить</button>
                </div>
            </div>
        </div>
    );

    function testConsole () {
        console.log('test')
    }
})
export default CartsBasket