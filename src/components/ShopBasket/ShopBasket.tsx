import s from "./ShopBasket.module.css"
import CartsBasket from "./Carts/CartsBasket";

const ShopBasket = () => {




    return (
        <div>
            <div >
                <div className={s.carts}>
                    <CartsBasket></CartsBasket>
                </div>
            </div>
        </div>
    );
}
export default ShopBasket