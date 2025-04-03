import { ChangeEvent, FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch } from "../../../store/store";
import { clearCart, removeFromCart, updateQuantity } from "../cartSlice";
import {
  selectCartItemCount,
  selectCartItems,
  selectCartTotalPrice,
} from "../selectors";
import { formatCurrency } from "../utils";
import { EmptyBasket } from "./EmptyBasket";
import { CardInput } from "./CardInput";

export const Basket: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector(selectCartItems);
  const itemCount = useSelector(selectCartItemCount);
  const totalPrice = useSelector(selectCartTotalPrice);

  const [cardNumber, setCardNumber] = useState("");
  const [error, setError] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const handleCheckout = () => {
    if (isValid && items.length > 0) {
      setOrderCompleted(true);
      dispatch(clearCart());
    }
  };

  const handleCardNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setIsValid(false);

    const string = event.target.value;

    if (/^\d+$/.test(string) || string === "") {
      setCardNumber(string);
    }

    if (string.length > 16) {
      setError(true);
    } else if (string.length === 16) {
      setIsValid(true);
    }
  };

  return (
    <div className="max-w-[900px] mx-auto py-4 bg-gray-100 p-6 rounded-md">
      <div className="text-right px-4 mb-4">
        <span className="font-bold">Total items:</span>
        <span className="ml-2 bg-purple-600 text-white px-2 py-1 rounded">
          {itemCount}
        </span>
      </div>

      {items.length === 0 && !orderCompleted ? (
        <EmptyBasket />
      ) : orderCompleted ? (
        <div className="text-center py-10 text-blue-500 font-bold text-xl">
          Thanks for your order!
        </div>
      ) : (
        <div className="bg-gray-100 rounded-md">
          <div className="grid grid-cols-5 bg-white py-3 mb-2">
            <div className="text-blue-500 font-bold pl-4">Product name</div>
            <div className="text-blue-500 font-bold text-center">Quantity</div>
            <div className="text-blue-500 font-bold text-center">
              Unit price
            </div>
            <div className="text-blue-500 font-bold text-center">
              Total price
            </div>
            <div className=""></div>
          </div>

          {items.map((item) => (
            <div
              key={`${item.sku}-${item.quantity}`}
              className="grid grid-cols-5 py-3 mb-2 bg-white"
            >
              <div className="pl-4">{item.name}</div>
              <div className="flex justify-center items-center">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={item.quantity}
                    readOnly
                    className="w-16 border border-gray-300 rounded px-2 py-1 text-center cursor-default pointer-events-none focus:outline-none"
                  />
                  <div className="absolute right-1 flex flex-col h-full justify-center">
                    <button
                      className="h-4 flex items-center justify-center w-4 mb-0.5 text-xs hover:text-blue-600"
                      onClick={() => {
                        if (item.quantity < item.basketLimit) {
                          dispatch(
                            updateQuantity({
                              sku: item.sku,
                              quantity: item.quantity + 1,
                            })
                          );
                        }
                      }}
                    >
                      <span>▲</span>
                    </button>
                    <button
                      className="h-4 flex items-center justify-center w-4 mt-0.5 text-xs hover:text-blue-600"
                      onClick={() => {
                        if (item.quantity > 1) {
                          dispatch(
                            updateQuantity({
                              sku: item.sku,
                              quantity: item.quantity - 1,
                            })
                          );
                        }
                      }}
                    >
                      <span>▼</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-center">{formatCurrency(item.price)}</div>
              <div className="text-center">
                {formatCurrency(item.price * item.quantity)}
              </div>
              <div className="text-center">
                <button
                  onClick={() => dispatch(removeFromCart(item.sku))}
                  className="px-3 py-1 bg-blue-600 rounded text-white"
                >
                  Remove all
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-4 mb-6">
            <span className="text-blue-500 font-bold mr-3">
              Basket Total Cost:
            </span>
            <span className="font-bold">{formatCurrency(totalPrice)}</span>
          </div>

          <CardInput
            cardNumber={cardNumber}
            error={error}
            onChange={handleCardNumberChange}
          />
        </div>
      )}

      <div className="flex justify-between mt-5">
        <Link to="/" className="px-4 py-2 bg-purple-600 rounded text-white">
          Continue shopping
        </Link>

        <button
          onClick={handleCheckout}
          disabled={!isValid || items.length === 0}
          className="px-4 py-2 bg-blue-600 rounded text-white disabled:opacity-70"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
