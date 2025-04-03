import { Routes, Route } from "react-router-dom";
import { Basket } from "./features/cart";
import { ProductList } from "./features/products/components";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/basket" element={<Basket />} />
    </Routes>
  );
};

export default App;
