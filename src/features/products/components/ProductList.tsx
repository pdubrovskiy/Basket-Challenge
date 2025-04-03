import { FC } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../cart/cartSlice";
import {
  selectCartItems,
  selectCartItemCount,
  selectCartTotalPrice,
} from "../../cart/selectors";
import { formatCurrency } from "../../cart/utils";
import { AppDispatch } from "../../../store/store";
import { Product } from "../../cart/interfaces";

const products: Product[] = [
  {
    sku: 1,
    name: "Red Product",
    description: "Red Product description",
    price: 1.01,
    basketLimit: 5,
  },
  {
    sku: 2,
    name: "Orange Product",
    description: "Orange Product description",
    price: 2.02,
    basketLimit: 4,
  },
  {
    sku: 3,
    name: "Yellow Product",
    description: "Yellow Product description",
    price: 3.03,
    basketLimit: 3,
  },
  {
    sku: 4,
    name: "Green Product",
    description: "Green Product description",
    price: 4.04,
    basketLimit: 2,
  },
  {
    sku: 5,
    name: "Blue Product",
    description: "Blue Product description",
    price: 5.05,
    basketLimit: 1,
  },
];

export const ProductList: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector(selectCartItems);
  const totalItems = useSelector(selectCartItemCount);
  const totalCost = useSelector(selectCartTotalPrice);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const handleRemoveFromCart = (sku: number) => {
    dispatch(removeFromCart(sku));
  };

  return (
    <div className="max-w-[1400px] mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
      </div>

      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-lg">
        <div className="flex justify-end mb-8">
          <div className="w-72">
            <div className="flex mb-3">
              <div className="bg-purple-600 text-white px-4 py-2 w-36 rounded-l-lg font-medium">
                Total items
              </div>
              <div className="border border-gray-300 px-4 py-2 w-36 bg-white text-right rounded-r-lg">
                {totalItems}
              </div>
            </div>
            <div className="flex">
              <div className="bg-purple-600 text-white px-4 py-2 w-36 rounded-l-lg font-medium">
                Total cost
              </div>
              <div className="border border-gray-300 px-4 py-2 w-36 bg-white text-right rounded-r-lg">
                {formatCurrency(totalCost)}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {products.map((product) => {
            const cartItem = cartItems.find((item) => item.sku === product.sku);

            return (
              <div
                key={product.sku}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="w-1/3">
                  <div className="font-bold text-lg text-gray-800">
                    {product.name}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {product.description}
                  </div>
                </div>
                <div className="w-1/6 text-center font-medium text-lg text-gray-700">
                  {formatCurrency(product.price)}
                </div>
                <div className="w-1/6">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-blue-600 text-white px-4 py-2 w-32 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
                  >
                    Add to basket
                  </button>
                </div>
                <div className="w-1/3 pl-4">
                  <button
                    onClick={() => handleRemoveFromCart(product.sku)}
                    className={`px-4 py-2 w-40 rounded-lg transition-colors duration-200 shadow-sm ${
                      cartItem
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={!cartItem}
                  >
                    Remove from basket
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end mt-10">
          <Link
            to="/basket"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition-colors duration-200 font-medium"
          >
            Proceed to checkout
          </Link>
        </div>
      </div>
    </div>
  );
};
