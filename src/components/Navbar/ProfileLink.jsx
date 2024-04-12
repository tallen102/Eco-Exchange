import React from "react";
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  MenuGroup,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import useAuthStore from "../../store/authStore";

const ProfileLink = () => {
  const { handleLogout, isLoggingOut } = useLogout();
  const authUser = useAuthStore((state) => state.user);
  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"link"}
        cursor={"pointer"}
        minW={0}
      >
        <Avatar size="sm" src={authUser?.profilePicURL || ""} />{" "}
        {/* Use authUser */}
      </MenuButton>
      <MenuList>
        <MenuItem as={RouterLink} to={`/${authUser?.uid}`}>
          My Profile
        </MenuItem>{" "}
        {/* Use RouterLink */}
        <MenuItem>Settings</MenuItem>
        <MenuItem
          onClick={handleLogout}
          as={RouterLink}
          to="/auth"
          display={{ base: "none", md: "block" }}
          variant={"ghost"}
          _hover={{ bg: "transparent" }}
          isLoading={isLoggingOut}
        >
          Logout
        </MenuItem>
        <MenuDivider />
        <MenuGroup title="Help">
          <MenuItem>Docs</MenuItem>
          <MenuItem>FAQ</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default ProfileLink;
