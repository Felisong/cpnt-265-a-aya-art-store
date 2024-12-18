import { createClient } from "@/utils/supabase/client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserIcon() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // check if user is logged in on load
  const supabase = createClient();

  // Check if a user's logged in
  async function getUser() {
    const {
      data: { user, error },
    } = await supabase.auth.getUser();
    if (error) {
      console.error("unable to load user");
      return;
    }
    setUser(user);
    setLoading(false);
  }
  async function handleLogOut() {
    if (user) {
      await supabase.auth.signOut();
    } else {
      console.error("user not signed in.");
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return (
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton
            onClick={(e) => {
              getUser();
            }}
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-gray-300 hover:bg-backDropPink "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              className="size-12 stroke-white hover:stroke-backDropDark"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </MenuButton>
        </div>
        <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-backDropPink shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
          <div className="py-1">
            <form action="#" method="POST">
              <MenuItem>
                {/* here I will add a state on if user logged in or not later */}
                <button
                  type="submit"
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                  onClick={(e) => {
                    e.preventDefault();
                    redirect("/login");
                  }}
                >
                  Sign In / Create Acc
                </button>
              </MenuItem>
            </form>
          </div>
        </MenuItems>
      </Menu>
    );
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton
          aria-label="User Dropdown"
          onClick={(e) => {
            getUser();
          }}
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-gray-300 hover:bg-backDropPink "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            className="size-12 stroke-white hover:stroke-backDropDark"
          >
            <title> open user dropdown </title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </MenuButton>
      </div>
      <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-backDropPink shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
        <div className="py-1">
          <MenuItem>
            <Link
              href="/dashboard"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
            >
              Dashboard
            </Link>
          </MenuItem>
          <form action="#" method="POST">
            <MenuItem>
              {/* here I will add a state on if user logged in or not later */}
              <button
                type="submit"
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogOut();
                  // modal replace later
                  alert("signed out");
                  redirect("/");
                }}
              >
                Sign Out
              </button>
            </MenuItem>
          </form>
        </div>
      </MenuItems>
    </Menu>
  );
}
