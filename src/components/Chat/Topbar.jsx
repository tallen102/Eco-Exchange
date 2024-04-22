import { Box, Heading } from '@chakra-ui/react'
import React from 'react'

const TopBar = () => {
  return (
    <Box borderWidth="1px" borderRadius="md" p="7" mb="0" width="100%">
      <Heading as="h1" size="lg" >
        Messages
      </Heading>
    </Box>
  )
}

export default TopBar