import classes from "./Cart.module.scss"
import Modal from "../UI/Modal"
import {useContext, useState} from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";


const Cart = props => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext)

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1})
    };

    const orderHandler = () => {
        setIsCheckout(true)
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true)
        await fetch('https://react-http-5023f-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true)
        cartCtx.clearCart();
    }

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price}
                          onRemove={cartItemRemoveHandler.bind(null, item.id)}
                          onAdd={cartItemAddHandler.bind(null, item)}/>
            ))}
        </ul>
    );


    const modalActions = <div className={classes.actions}>
        {hasItems &&
        <button className={classes["button--alt"]} onClick={props.onHideCart}>Close</button>}
        <button className={classes.button} onClick={orderHandler}>Order</button>
    </div>


    const cartModalContent =
        <>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onHideCart}/>}
            {!isCheckout && modalActions}
        </>

    const isSubmittingModalContent = <p>Sending order data...</p>

    const didSubmitModalContent =
        <>
            <p>Successfully sent the order !</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onHideCart}>Close</button>
            </div>
        </>

    return (
        <Modal onClose={props.onHideCart}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );
};

export default Cart;
