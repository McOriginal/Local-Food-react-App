

import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import CartContext from "../store/CartContext";
import Modal from "./Util/Model";
import Input from "./Input";
import UserProgressContext from "../store/UserProgressContext";
import Button from "./Util/Buttons";


export default function Checkout(){
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);


    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item)=> totalPrice + item.quantity * item.price, 0
    );

function handleClose(){
    userProgressCtx.hideCheckout();
   
}



function handleSubmit(event){
    event.preventDefault();

 const fd = new FormData(event.target);
 const customerData = Object.fromEntries(fd.entries());

 fetch('https://local-food-react-backend.onrender.com/orders', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        order: {
            items: cartCtx.items,
            customer: customerData
        }
    })
 });
  alert("Félicitation Votre commande  a été bien validé");

}

    return (
    <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
        <form onSubmit={handleSubmit} >

            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormatter.format(cartTotal)} </p>
        
        <Input label="Full Name" type="text" id="name" />
        <Input label="Email Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        
        <div>
            <Input label="Postal Code" type="text" id="postal-code" />
            <Input label="City" type="text" id="city" />
        </div>

        <p className="modal-actions">
            <Button type="button" textOnly onClick={handleClose} >
                Close
            </Button>

            <Button onClick={handleClose}> Submit Order</Button>
        </p>
        </form>
    </Modal>
    );
}