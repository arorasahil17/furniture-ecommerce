import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/actions/index.js";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = cart?.products;
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isBordered>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <AcmeLogo />
          <Link to="/" className="font-bold text-inherit">
            ACME
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" to="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" color="foreground">
            Contact
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/cart" className="flex">
            <ShoppingBagIcon
              className="h-6 w-6 flex-shrink-0 text-gray-600 group-hover:text-gray-500"
              aria-hidden="true"
            />
            <span className="text-md font-medium text-gray-600 group-hover:text-gray-800">
              {cartItems?.length ? cartItems.length : 0}
            </span>
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {user === null ? (
            <Link
              to="/login"
              className="bg-gray-900 py-2 text-sm px-6 text-white rounded-md hover:bg-gray-800"
            >
              Sign Up
            </Link>
          ) : (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="Jason Hughes"
                  size="sm"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdnoR5PHuEu2C3bcMN7kOLHrStpF1-pY6nmA&usqp=CAU"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{user.email}</p>
                </DropdownItem>
                <DropdownItem key="orders">
                  <Link to="/orders">My Orders</Link>
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={() => dispatch(logoutUser(navigate))}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
