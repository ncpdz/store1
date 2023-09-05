import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import './CheckOut.scss';

function CheckOut() {
  const { cart, removeFromCart, incrementQuantity, decrementQuantity } = useCart();

  // Tính tổng giá và tổng số lượng
  const totalPrice = cart.reduce((total, item) => total + item.price_value * item.quantity, 0);
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const menPrice = cart.filter((item) => item.type_name === "men").reduce((total, item) => total + item.price_value * item.quantity, 0);
  const womenPrice = cart.filter((item) => item.type_name === "women").reduce((total, item) => total + item.price_value * item.quantity, 0);
  const menQuantity = cart.filter((item) => item.type_name === "men").reduce((total, item) => total + item.quantity, 0);
  const womenQuantity = cart.filter((item) => item.type_name === "women").reduce((total, item) => total + item.quantity, 0);
  return (
    <>
      <div className="container mx-auto p-5">
        <h1 className="text-3xl font-semibold mb-5">Checkout</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="list-unstyled">
            {cart.map((item) => (
              <li key={item.id} className="border-b mb-4 pb-4">
                <div className="flex items-center">
                  <img src={item.image_url} alt={item.image_name} className="w-16 h-16 rounded-full" />
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold">{item.image_name}</h3>
                    <p className="text-lg">Price: ${item.price_value}</p>
                    <div className="flex items-center">
                      <button className="px-2 py-1 bg-blue-500 text-white rounded-md" onClick={() => decrementQuantity(item.id)}>-</button>
                      <span className="mx-2 text-xl">{item.quantity}</span>
                      <button className="px-2 py-1 bg-blue-500 text-white rounded-md" onClick={() => incrementQuantity(item.id)}>+</button>
                    </div>
                  </div>
                  <button className="ml-auto px-3 py-1 bg-red-500 text-white rounded-md" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </li>
            ))}
            <div className="totals">
            <p>women Quantity: {womenQuantity}</p>
            <p>men Quantity: {menQuantity}</p>
            <p>men Price: ${menPrice.toFixed(2)}</p>
            <p>women Price: ${womenPrice.toFixed(2)}</p>
              <p>Total Quantity: {totalQuantity}</p>
              <p>Total Price: ${totalPrice.toFixed(2)}</p>
            </div>
            <Link to="/payment" className="payment-link">Proceed to Payment</Link>
          </ul>
        )}
      </div>
    </>
  );
}

export default CheckOut;
