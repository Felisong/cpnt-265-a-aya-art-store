import { useEffect, useState } from "react";

// access from local storage when paying, and update with orders when i do that.
export function Total({ product }) {
  const [total, setTotal] = useState(product.price_per);
  //  console.log(totals);
  useEffect(() => {
    findTotal(product);
  }, [product]);

  function findTotal(product) {
    setTotal(product.price_per * product.quantity);
  }

  return (
    <div className="ml-4 md:ml-32 lg:ml-0">
      <p> {total.toFixed(2)} $</p>
    </div>
  );
}
