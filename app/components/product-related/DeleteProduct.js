"use state";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const supabase = createClient();

export function DeleteCartItem({ product }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // console.log(`product: `, product?.id);
  // console.log(`user: `, user?.user.id);
  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      console.log("not logged in");
      return;
    } else {
      setUser(data);
    }
  }
  async function deleteCartItem() {
    // console.log(product.id);
    // console.log(user.user.id);
    if (!user) {
      console.error("unable to match user id as theyre not logged in yet.");
      return;
    }
    const { data, error } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", user.user.id)
      .eq("product_id", product.product_id);
    if (error) {
      console.error("data unable to delete.");
      alert("unable to delete from cart.");
      window.location.reload();
    } else {
      console.log("item deleted!", data);
    }
  }

  return (
    <div>
      <button
        onClick={deleteCartItem}
        className="bg-buttonPurple p-2 text-xl mx-8 rounded-full"
      >
        {" "}
        X{" "}
      </button>
    </div>
  );
}
