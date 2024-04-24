import React from 'react';
import { Box, Flex, VStack, Text, Heading, Image } from '@chakra-ui/react';
const PrivacyPolicyPage = () => {
  return (
<Box bg="maroon" color="white" p={10} minHeight="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
<VStack spacing={8} align="center" mb={6}>
<Heading as="h1" size="xl">Privacy Policy</Heading>
<Text fontSize="sm" color="gray.500" textAlign="center">
          Last Updated: January 28, 2024
</Text>
<Text>We are committed to protecting your privacy and informing you about how we handle your data.</Text>
</VStack>
<Flex direction={['column', 'column', 'row']} justifyContent="center" alignItems="center" gap={6}>
<Box bg="white" color="black" p={6} borderRadius="md" width={["90%", "80%", "md"]}>
<Text fontSize="sm" color="gray.500" p={6}>
<strong>Privacy Policy</strong>
<br />
<br />
            Last Updated: January 28, 2024
<br />
<br />
            At Eco Exchange, we are committed to protecting your privacy and informing you of the data that we collect from you. This Privacy Policy provides detailed information about the data Eco Exchange gathers, utilizes, and shares when you visit our website, applications, and mobile applications. The Privacy Policy link is available on all platforms where you access our services.
<br />
<br />
<strong>Notice at Collection</strong>
<br />
            We collect information that could be linked indirectly or directly to a user's personal information. The categories of personal information we collect include General Location Information, Personal Identifiers, Demographic Information, Commercial Information, and Inferences. The reasons for collecting this information are described in the "Reason for Collection and Use" section.
<br />
<br />
<strong>Categories of Information We Collect</strong>
<br />
            - Personal Identifiers: Such as your name, email address, and account credentials
<br />
            - Commercial Information
<br />
            - Location Information: Derived from IP address or data indicating a city or postal code level
<br />
            - Demographic Information: Age, age range, birthday
<br />
            - Inferences: Personal information used to create a profile based on a consumer's preferences, predispositions, and characteristics
<br />
<br />
<strong>Your Rights</strong>
<br />
            You have the right to access, correct, and delete your personal information. Additionally, you can object to the processing of your personal information.
<br />
<br />
<strong>Protection of Information and Information Security</strong>
<br />
            Eco Exchange strives to protect your information and ensure its safety via technical means. However, the safety and security of your data cannot be guaranteed, and you share information on the site at your own risk. Please do not use this service if you do not agree to the terms of this policy.
<br />
<br />
<strong>Questions</strong>
<br />
            If you have any questions regarding this Privacy Policy, please contact us using the form provided on our Contact page. We will respond to your inquiry as soon as possible.
</Text>
</Box>
</Flex>
</Box>
  );
};
export default PrivacyPolicyPage;