import { useEffect, useState } from "react";
import CartQuantity from "./CartQuantity";
import { Total } from "./Total";

export default function ProductSublist({ cartData }) {
  let nextId = 0;
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    getTotal();
  }, [cartData]);

  function getTotal() {
    const total = cartData.reduce(
      (sum, product) => sum + product.price_per * product.quantity,
      0
    );
    setTotalPrice(total.toFixed(2));
  }

  return (
    <ul key={cartData.product_id} className="mx-4 ">
      {cartData.map((product) => {
        return (
          <li
            key={nextId++}
            className="my-4 text-sm flex w-full md:text-lg lg:text-xl"
          >
            <p className="w-1/3">{product.product_title}</p>
            <CartQuantity product={product} />
            <Total product={product} />
          </li>
        );
      })}
      <li>
        <h2 className="text-center text-2xl">SubTotal : {totalPrice} $</h2>
      </li>
    </ul>
  );
}
