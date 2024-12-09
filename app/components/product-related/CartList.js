import { useState } from "react";

export default function CartList({ cartData }) {
  // console.log(cartData);
  // inside cart list, do all 3 lists. Products, quantity, and price.

  return (
    <div>
      <div className="flex flex-col">
        {/* Title can be given prompt */}
        <div className="flex justify-around">
          <h2 className="text-xl"> Products </h2>
          <h2 className="text-xl"> Quantity </h2>
          <h2 className="text-xl"> Total (CAD)</h2>
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
  const [value, setValue] = useState(quantity);
  const dropDown = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
  ];

  // update quantity whenever it changes on the database.
  useState(() => {
    updateQuantity;
  }, product.quantity);
  function updateQuantity() {
    setQuantity(product.quantity);
  }

  function handleOnChange(e) {
    e.preventDefault(e);
    setValue(e.target.value);
    // anytime value changes, {
    // update database with the value.}
  }

  // now I can do if value === 3 change...
  // console.log(quantity);
  //

  return (
    <select
      aria-placeholder="in order 1, 2, 3, 4, or 5 of this product."
      onChange={(e) => {
        handleOnChange(e);
      }}
      className="w-1/4 mx-4 text-start text-sm rounded h-fit p-1"
    >
      {dropDown.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
}

// make calculation for total without affecting cost per.
// store in local storage maybe.
// access from local storage when paying, and update with orders when i do that.
export function Total({ product }) {
  const [pricePer, setPricePer] = useState(product.price_per);

  // update whenever a product changes
  useState(() => {
    getPrice;
  }, [product]);

  function getPrice() {
    setPricePer(product.price_per);
  }
  return <p> {pricePer}</p>;
}
