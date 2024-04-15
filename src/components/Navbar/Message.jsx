import { Box, Link, Tooltip, Badge, Avatar } from "@chakra-ui/react";
import { AiFillMessage } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";

const Message = ({messageCount}) => {
    
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
                justifyContent={{ base: "center", md: "flex-start" }}
                position="relative" 
            >
                <AiFillMessage size={25} 
                
                />
                {messageCount > 0 && (
                    <Badge
                        colorScheme="red"
                        borderRadius="full"
                        position="absolute" 
                        top="-1" 
                        right="0"
                        border="2px solid white" 
                    >
                        {messageCount}
                    </Badge>
                )}
                <Box display={{ base: "none", md: "block" }}></Box>
            </Link>
        </Tooltip>
    );
};

export default Message;
