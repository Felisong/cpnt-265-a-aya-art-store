import { createClient } from "@/utils/supabase/client";

export default function CartQuantity({ product }) {
  const supabase = createClient();
  const dropDown = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
  ];

  function handleOnChange(e) {
    const value = e.target.value;
    e.preventDefault(e);
    updateDatabase(value, product);
  }

  async function updateDatabase(value, product) {
    const { data, error } = await supabase
      .from("cart_items")
      .update({ quantity: value })
      .eq("id", product.id)
      .select();

    if (error) {
      console.error("error updating database,", error);
    }
  }

  return (
    <select
      aria-placeholder="in order 1, 2, 3, 4, or 5 of this product."
      value={product.quantity ? product.quantity : 1}
      onChange={(e) => {
        handleOnChange(e);
      }}
      className="w-1/4 text-start text-sm rounded h-fit p-1"
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
