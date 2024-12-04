"use client";
import Link from "next/link";
import Logo from "./Logo";
import Hamburger from "./Hamburger";
import UserIcon from "./UserIcon";

export default function Navigation() {
  const nav = [
    { name: "Home", href: "/", current: false, id: 1 },
    { name: "Products", href: "/products", current: false, id: 2 },
    { name: "Check Out", href: "/check-out", current: false, id: 3 },
    { name: "Contact", href: "/contact", current: false, id: 4 },
  ];
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <header className="bg-backDropDark flex items-center justify-between">
      <div className="p-4">
        <Logo width={"w-40"} />
      </div>
      <ul className="mx-4 flex items-center">
        <li>
          <div className=" space-x-4 w-fit  hidden md:flex px-2">
            {/* GET NAVIGATION WORKING PRIO */}
            {nav.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "bg-darkBlue text-backDropPink px-2 text-xl w-30"
                    : "text-backDropPink hover:bg-backDropPink hover:text-black",
                  "rounded-md py-2 px-1"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </li>
        <li>
          <UserIcon />
        </li>
        <li>
          <Hamburger />
        </li>
      </ul>
    </header>
  );
}
