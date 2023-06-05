import s from "./Cart.module.css"
import {useState} from "react";
import ModalModel from "../../../ModalModel/ModalModel";
import {iModel} from "../../../../models/Model";
import {observer} from "mobx-react-lite";
const Cart = observer( ({cart}:{cart:iModel}) => {

    const [modalActive, setModalActive] = useState(false)

    function changeCartDisplay(status:boolean) {
        setModalActive(status);
        document.body.style.overflow=status?"hidden":"auto";
    }

    return (
        <div>
            <div onClick={()=> changeCartDisplay(true)}  className={s.cart}>
                <img className={s.immg} src={process.env.REACT_APP_API_URL + "photoModel/" + cart.link_photo} alt=""/>
                <div className={s.name_and_price}>
                    <span className={s.name}>{cart.name}</span>
                    <span className={s.name}>{cart.artist.id}</span>
                    <span className={s.price}>{cart.price}руб</span>
                </div>
            </div>
            {modalActive &&
                <div className={s.modal} onClick={() => changeCartDisplay(false)}>
                    <ModalModel cart={cart} ></ModalModel>
                </div>
            }
        </div>
    );

})
export default Cart