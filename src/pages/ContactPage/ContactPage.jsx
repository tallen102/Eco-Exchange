import React, { useState } from 'react';
import { Box, Flex, VStack, Input, Textarea, Button, Heading, Text, FormControl, FormLabel, useToast, Image } from '@chakra-ui/react';
import emailjs from 'emailjs-com';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const toast = useToast();

  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      await emailjs.sendForm("service_lbxhzp7", "template_d8m16d9", e.target, "S1feABzSbY33xagM7");
      toast({
        title: 'Message sent successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      toast({
        title: 'Failed to send message. Please try again later.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error('EmailJS Error:', error);
    }
  };

  return (
    <Box bg="maroon" color="white" p={10} minHeight="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <VStack spacing={8} align="center" mb={6}>
        <Heading as="h1" size="xl">Contact us</Heading>
        <Text>We’re here to help and answer any questions you might have. We look forward to hearing from you!</Text>
      </VStack>
      <Flex direction={['column', 'column', 'row']} justifyContent="center" alignItems="center" gap={6}>
        <Box boxSize="md">
          <Image src="hello.webp" alt="Say Hello" />
        </Box>
        <Box as="form" onSubmit={sendEmail} bg="white" color="black" p={6} borderRadius="md" width={["90%", "80%", "md"]}>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel htmlFor="name">Your Name</FormLabel>
              <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="email">Your Email</FormLabel>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="subject">Subject</FormLabel>
              <Input id="subject" type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="message">Your Message</FormLabel>
              <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} height="140px" resize="none" />
            </FormControl>
            <Button type="submit" colorScheme="red" size="lg">
              Send Message
            </Button>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default ContactPage;


