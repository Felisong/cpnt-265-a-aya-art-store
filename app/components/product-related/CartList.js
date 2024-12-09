import { useState } from "react";

export default function CartList({ cartData, manual }) {
  // console.log(cartData);
  // inside cart list, do all 3 lists. Products, quantity, and price.

  return (
    <div className="full-w">
      <div className="flex flex-col">
        {/* Title can be given prompt */}
        <div className="flex justify-around">
          <h2 className="text-xl"> Products </h2>
          <h2 className="text-xl"> Quantity </h2>
          <h2 className="text-xl"> Total </h2>
        </div>
        <ProductSublist cartData={cartData} />
      </div>
    </div>
  );
}

export function ProductSublist({ cartData }) {
  let nextId = 0;
  return (
    <ul key={cartData.product_id} className="mx-4">
      {cartData.map((product) => {
        return (
          <li key={nextId++} className="my-4 text-sm flex w-full">
            <p className="w-1/3">{product.product_title}</p>
            <Quantity product={product} />
          </li>
        );
      })}
    </ul>
  );
}

export function Quantity({ product }) {
  const [quantity, setQuantity] = useState(product.quantity);

  useState(() => {
    updateQuantity;
  }, product.quantity);

  function updateQuantity() {
    setQuantity(product.quantity);
  }
  return (
    <select
      value={quantity}
      aria-placeholder="in order 1, 2, 3, 4, or 5 of this product."
      onChange={(e) => {
        e.preventDefault(e);
        console.log(e);
        // if quantity
      }}
      className="w-1/3 mx-4 text-start text-sm rounded h-fit p-1"
    >
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  );
}

// make calculation for total without affecting cost per.
// store in local storage maybe.
// access from local storage when paying, and update with orders when i do that.
export function Total({ cartData }) {
  const [pricePer, setPricePer] = useState(cartData.price_per);
  useState(() => {
    setPricePer(cartData.price_per);
  }, []);

  return <p> {pricePer}</p>;
}
