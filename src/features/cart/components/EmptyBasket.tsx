import { FC } from "react";
import { Link } from "react-router-dom";

export const EmptyBasket: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 bg-white p-6 rounded">
      <h2 className="text-2xl mb-4 text-blue-500">Your basket is empty</h2>
      <p className="mb-6">
        Looks like you haven't added any items to your basket yet.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
      >
        Browse Products
      </Link>
    </div>
  );
};
