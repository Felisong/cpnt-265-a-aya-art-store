import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import CartQuantity from "./CartQuantity";
import { Total } from "./Total";
import ProductSublist from "./ProductSubList";

export default function CartList({ cartData }) {
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
