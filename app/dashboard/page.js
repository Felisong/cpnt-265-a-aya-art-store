import AccountForm from "./account-form";
import { createClient } from "@/utils/supabase/server";

export default async function Account() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    createProfileIfNeeded(user);
  }

  async function createProfileIfNeeded(user) {
    const { data, error } = await supabase
      .from("profiles")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (error) {
      // If error is "row not found", create the profile
      if (error.code === "PGRST116") {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .insert([
            {
              id: user.id, // Match the primary key
              updated_at: new Date(),
            },
          ])
          .select();

        if (profileError) {
          console.error("Error creating profile:", profileError);
        } else {
          console.log("Profile created successfully:", profileData);
        }
      } else {
        console.log("Profile already exists:", data);
      }
    }
  }

  return <AccountForm user={user} />;
}
