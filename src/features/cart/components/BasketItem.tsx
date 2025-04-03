import { FC } from "react";
import { CartItem } from "../interfaces";
import { formatCurrency } from "../utils";

interface BasketItemProps {
  item: CartItem;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

export const BasketItem: FC<BasketItemProps> = ({
  item,
  onQuantityChange,
  onRemove,
}) => {
  const handleIncrease = () => {
    if (item.quantity < item.basketLimit) {
      onQuantityChange(item.quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.quantity - 1);
    }
  };

  return (
    <div className="grid grid-cols-5 py-3 mb-2 bg-white">
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
              onClick={handleIncrease}
            >
              <span>▲</span>
            </button>
            <button
              className="h-4 flex items-center justify-center w-4 mt-0.5 text-xs hover:text-blue-600"
              onClick={handleDecrease}
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
          onClick={onRemove}
          className="px-3 py-1 bg-blue-600 rounded text-white"
        >
          Remove all
        </button>
      </div>
    </div>
  );
};
