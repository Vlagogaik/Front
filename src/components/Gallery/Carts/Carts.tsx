import Cart from "./Cart/Cart";
import {iModel} from "../../../models/Model";
import s from "./Carts.module.css"

const Carts = ({cartsProf,models}:{cartsProf:boolean, models:Array<iModel>}) => {

    let cartsElementsMain = models.map(m=> <Cart key={m.id} cart={m} />)
    return (
        <div className={(cartsProf ? s.cartsProf: s.cartsGal)}>
            {cartsElementsMain}
       </div>

    );
}
export default Carts