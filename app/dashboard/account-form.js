"use client";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import LogoutButton from "../components/LogOutBtn";
import { redirect } from "next/navigation";

export default function AccountForm({ user }) {
  const supabase = createClient();
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState(null);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      try {
        const email = await user;
        setEmail(email.email);
      } catch (error) {
        console.error("no email.");
      }

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, website, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }
      console.log(data);
      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
      redirect("/");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        id: user?.id,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* greeting section */}
      <div className="bg-[url('/gemini-generated-header.png')] flex text-4xl font-bold text-black bg-cover p-8 py-20 md:py-32 md:text-7xl lg:py-52 lg:text-8xl w-full">
        <h1 className="max-w-[80vw] break-words">
          {" "}
          Hello{" "}
          {fullname || username || email
            ? `${fullname || username || email}`
            : "User."}
        </h1>
      </div>
      <div className="form-widget my-16 text-lg m-8 rounded-3xl bg-backDropPink p-4">
        <div className="flex flex-col items-start p-4">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            value={user?.email}
            className="rounded-xl w-full p-2 mb-4"
            disabled
          />
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            type="text"
            className="rounded-xl w-full p-2 mb-4"
            value={fullname || ""}
            onChange={(e) => setFullname(e.target.value)}
          />
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            className="rounded-xl w-full p-2 mb-4"
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="url"
            className="rounded-xl w-full p-2 mb-4"
            value={website || ""}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <div>
          <button
            className="button primary block p-2 m-2 bg-buttonPurple rounded-xl text-white"
            onClick={() =>
              updateProfile({ fullname, username, website, avatar_url })
            }
            disabled={loading}
          >
            {loading ? "Loading ..." : "Update"}
          </button>
        </div>

        <div>
          <LogoutButton stylize="p-2 m-2 bg-buttonPurple rounded-xl text-white" />
        </div>
      </div>
    </div>
  );
}
