import { Box, Link, Tooltip } from "@chakra-ui/react";
import { AiFillMessage } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";

const Message = () => {
	return (
		<Tooltip
			hasArrow
			label={"Chats"}
			placement='right'
			ml={1}
			openDelay={500}
			display={{ base: "block", md: "none" }}
		>
			<Link
				display={"flex"}
				to={"/chat/messages"}
				as={RouterLink}
				alignItems={"center"}
				gap={2}
				_hover={{ bg: "whiteAlpha.100" }}
				borderRadius={6}
				p={2}
				//w={{ base: 10, md: "full" }}
				justifyContent={{ base: "center", md: "flex-start" }}
			>
				<AiFillMessage size={25} />
				<Box display={{ base: "none", md: "block" }}></Box>
			</Link>
		</Tooltip>
	);
};

export default Message;