import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const ProfileTabs = ({ isLiked }) => {
  return (
    <Flex
      w={"full"}
      justifyContent={"center"}
      gap={{ base: 4, sm: 10 }}
      textTransform={"uppercase"}
      fontWeight={"bold"}
    >
      <Flex borderTop={"1px solid white"} alignItems={"center"} p="3" cursor={"pointer"}>
        <Link to={{ search: '' }}>
          {/* Underline "Posts" if it is not liked */}
          <Text 
            fontWeight={isLiked ? 400 : 700} 
            fontSize={12} 
            display={{ base: "none", sm: "block" }}
            textDecoration={!isLiked ? 'underline' : 'none'}
          >
            Posts
          </Text>
        </Link>
      </Flex>
      <Flex alignItems={"center"} p="3" cursor={"pointer"}>
        <Link to={{ search: 'likes=true' }}>
          {/* Underline "Likes" if it is liked */}
          <Text 
            fontWeight={isLiked ? 700 : 400} 
            fontSize={12} 
            display={{ base: "none", sm: "block" }}
            textDecoration={isLiked ? 'underline' : 'none'}
          >
            Likes
          </Text>
        </Link>
      </Flex>
    </Flex>
  )
}

export default ProfileTabs
