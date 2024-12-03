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

    setState({ ...state, [anchor]: open });
  };
  const navItems = [
    { name: "Home", href: "/", current: false, id: 1 },
    { name: "Products", href: "/products", current: false, id: 2 },
    { name: "Check Out", href: "/check-out", current: false, id: 3 },
    { name: "Contact", href: "/contact", current: false, id: 4 },
  ];

  const list = (anchor) => (
    //   <Box
    //     sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
    //     role="presentation"
    //     onClick={toggleDrawer(anchor, false)}
    //     onKeyDown={toggleDrawer(anchor, false)}
    //   >
    //     <List>
    //       {navItems.map((text, index, url) => (
    //         <li id="">

    //         </li>
    //       ))}
    //     </List>
    //   </Box>

    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map(
          (text, index, url) => (
            <ListItem key={text}>
              <Link href={url}>{text}</Link>
            </ListItem>
          )
        )}
      </List>
    </Box>
  );

  return (
    <div className="block md:hidden">
      {["top"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <MenuIcon fontSize="large" sx={{ color: "backDropPink" }} />
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
