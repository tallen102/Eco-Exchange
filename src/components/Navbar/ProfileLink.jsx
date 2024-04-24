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
  Flex,
  Box
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
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
        p={0}
        overflow="hidden"
      >
        <Flex align="center">
          <Avatar size="sm" src={authUser?.profilePicURL || ""} />
          <Box ml={0}> 
            <ChevronDownIcon />
          </Box>
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem as={RouterLink} to={`/${authUser?.uid}`}>
          My Profile
        </MenuItem>
        <MenuDivider />
        <MenuGroup title="Help">
        <MenuItem as={RouterLink} to="/contact">
          Contact Us
        </MenuItem>
        <MenuItem as={RouterLink} to="/privacy-policy">
            Privacy Policy
</MenuItem>
          <MenuDivider />
        </MenuGroup>
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
      
      </MenuList>
    </Menu>
  );
};

export default ProfileLink;
