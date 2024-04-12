import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

const ProfileTabs = () => {
  return (
    <Flex
    w={"full"}
    justifyContent={"center"}
    gap={{base:4, sm:10}}
    textTransform={"uppercase"}
    fontWeight={"bold"}
    >
      <Flex borderTop={"1px solid white"} alignItems={"center"} p="3" cursor={"pointer"}>
        <Text fontSize={12} display={{base:"none" , sm:"block"}}>Posts</Text>

      </Flex>

      <Flex  alignItems={"center"} p="3" cursor={"pointer"}>
        <Text fontSize={12} display={{base:"none" , sm:"block"}}>Likes</Text>

      </Flex>


    </Flex>
  )
}

export default ProfileTabs