import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";

export default function Hamburger() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    // test this later. use with and without ...state
    setState({ ...state, [anchor]: open });
  };
  const navItems = [
    { name: "Home", href: "/", current: false, id: 1 },
    { name: "Products", href: "/products", current: false, id: 2 },
    { name: "Check Out", href: "/checkout", current: false, id: 3 },
    { name: "Contact", href: "/contact", current: false, id: 4 },
  ];

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      className="bg-backDropPink"
    >
      <List>
        {navItems.map((item) => (
          <li key={item.id} className="p-2 text-xl active:bg-red-100 ">
            <Link href={item.href}>{item.name}</Link>
          </li>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="block md:hidden">
      {["top"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            aria-label="Navigation dropdown"
            onClick={toggleDrawer(anchor, true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              className="stroke-backDropPink size-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
