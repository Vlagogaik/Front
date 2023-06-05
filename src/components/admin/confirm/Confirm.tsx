import React, {useEffect, useState} from "react";
import {iModel} from "../../../models/Model";
import {deleteBasketItem, fetchModels, updateModel} from "../../../api/ModelApi";
import {observer} from "mobx-react-lite";
import CartBasket from "../../ShopBasket/Carts/Cart/CartBasket";
import ConfirmItem from "./confirmItem/ConfirmItem";
import s from "../../ShopBasket/Carts/CartsBasket.module.css";


const Confirm = observer(() => {

    const [models, setModels] = useState<Array<iModel>>([]);

    async function updateM(model:iModel, st:string) {
        await updateModel({
            id: model.id,
            status: st,
            status_des: model.status_des
        })
        fetchModels({status: "consideration"}).then(data => setModels(data))
    }



    useEffect(() => {
        fetchModels({status: "consideration"}).then(data => setModels(data))
    }, [])

    let cartsElements = models.map(m => <ConfirmItem
        key={m.id}
        model = {m}
        artist = {m.artist}
        updateM = {updateM}
    />)


    return (
        <div className={s.carts}>
            {cartsElements}
        </div>

    );
})
export default Confirm