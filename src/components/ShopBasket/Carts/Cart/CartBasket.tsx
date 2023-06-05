import s from "./CartBasket.module.css"
import {iUser} from "../../../../models/User";
import {iModel} from "../../../../models/Model";
import {deleteBasketItem} from "../../../../api/ModelApi";
import {observer} from "mobx-react-lite";
const CartBasket = observer( (
    {model,artist,id_basket_item,deleteModel}:{model:iModel, artist:iUser,id_basket_item:number,deleteModel:(modelId:number)=>Promise<void>}) => {

    const tagsElement = model.tags.map(t => <div className={s.tag}>{t}</div>);





    return (
        <div className={s.cart}>
            <img className={s.immg} src={process.env.REACT_APP_API_URL + "photoModel/" + model.link_photo} alt=""/>
            <div className={s.content}>
                <div className={s.artist_and_tags}>
                    <div className={s.artist_and_delete}>
                        <div className={s.artist}>
                            <img src={artist.picture} alt=""/>
                            <span>{artist.username}</span>
                        </div>
                        <div className={s.delete}>
                            <button onClick={()=> deleteModel(id_basket_item)}>del{id_basket_item}</button>
                        </div>
                    </div>
                    <div className={s.tags}>
                        {tagsElement}
                    </div>
                </div>
                <div className={s.name_and_price}>
                    <span className={s.name}>{model.name}</span>
                    <span className={s.price}>{model.price}руб</span>
                </div>
            </div>
        </div>
    );
})
export default CartBasket