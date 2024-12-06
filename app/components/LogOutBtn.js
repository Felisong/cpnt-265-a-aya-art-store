"use client";

import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

const supabase = createClient();

async function logout() {
  let { error } = (await supabase).auth.signOut();
  if (error) {
    console.error(error);
  }
}

export default function LogoutButton({ stylize }) {
  return (
    <button
      formAction={logout}
      className={stylize}
      onClick={(e) => {
        logout();
        redirect("/");
      }}
    >
      Log Out
    </button>
  );
}
