import classes from "./Cart.module.scss"
import Modal from "../UI/Modal"
import {useContext, useState} from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import FormCheckout from "../formCheckout/formCheckout";

const Cart = props => {
    const cartCtx = useContext(CartContext)
    const [isSubmit, setIsSubmit] = useState(false);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1})
    };

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price}
                          onRemove={cartItemRemoveHandler.bind(null, item.id)}
                          onAdd={cartItemAddHandler.bind(null, item)}/>
            ))}
        </ul>
    );

    console.log(isSubmit);
    const displayMeals = () => {
        setIsSubmit(true)
    }

    let content;
    if (isSubmit) {
        content = cartItems;
    } else {
        content = <FormCheckout onClick={displayMeals}/>;
    }

    return (
        <Modal onClose={props.onHideCart}>
            {content}
            {isSubmit ?
                <>
                    <div className={classes.total}>
                        <span>Total Amount</span>
                        <span>{totalAmount}</span>
                    </div>
                    <div className={classes.actions}>
                        {hasItems &&
                        <button className={classes["button--alt"]} onClick={props.onHideCart}>Close</button>}
                        <button className={classes.button}>Order</button>
                    </div>
                </> : null}
        </Modal>
    );
};

export default Cart;
