import React from 'react';
import { Box, Container, Grid, Text, Link, Stack, VStack, HStack, Divider } from '@chakra-ui/react';
import { FaLocationArrow, FaInfoCircle, FaBlog, FaSitemap } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box bg="teal.800" color="white" py={10} mt={20}>
  <Container maxW="container.xl">
    <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={8} mb={8}>
      <VStack align="start" spacing={4}>
        <Text fontSize="xl" fontWeight="bold" color="white">POPULAR LOCATIONS</Text>
        <Link href="#" _hover={{ textDecor: 'underline', color: 'teal.300' }}>Kolkata</Link>
        <Link href="#" _hover={{ textDecor: 'underline', color: 'teal.300' }}>Mumbai</Link>
        <Link href="#" _hover={{ textDecor: 'underline', color: 'teal.300' }}>Chennai</Link>
        <Link href="#" _hover={{ textDecor: 'underline', color: 'teal.300' }}>Pune</Link>
      </VStack>

      <VStack align="start" spacing={4}>
        <Text fontSize="xl" fontWeight="bold" color="white">TRENDING LOCATIONS</Text>
        <Link href="#" _hover={{ textDecor: 'underline', color: 'teal.300' }}>Bhubaneshwar</Link>
        <Link href="#" _hover={{ textDecor: 'underline', color: 'teal.300' }}>Hyderabad</Link>
        <Link href="#" _hover={{ textDecor: 'underline', color: 'teal.300' }}>Chandigarh</Link>
        <Link href="#" _hover={{ textDecor: 'underline', color: 'teal.300' }}>Nashik</Link>
      </VStack>

      <VStack align="start" spacing={4}>
        <Text fontSize="xl" fontWeight="bold" color="white">ABOUT US</Text>
        <Link href="#" _hover={{ textDecor: 'underline', color: 'teal.300' }}>About OLX Group</Link>
        <Link href="#" _hover={{ textDecor: 'underline', color: 'teal.300' }}>Careers</Link>
        <Link href="#" _hover={{ textDecor: 'underline', color: 'teal.300' }}>Contact Us</Link>
      </VStack>

      <VStack align="start" spacing={4}>
        <Text fontSize="xl" fontWeight="bold" color="white">HELP & INFORMATION</Text>
        <Link href="#" _hover={{ textDecor: 'underline', color: 'teal.300' }}>Waah Jobs</Link>
        <Link href="#" _hover={{ textDecor: 'underline', color: 'teal.300' }}>OLX</Link>
        <Link href="#" _hover={{ textDecor: 'underline', color: 'teal.300' }}>Help</Link>
        <Link href="#" _hover={{ textDecor: 'underline', color: 'teal.300' }}>Sitemap</Link>
        <Link href="#" _hover={{ textDecor: 'underline', color: 'teal.300' }}>Legal & Privacy Information</Link>
        <Link href="#" _hover={{ textDecor: 'underline', color: 'teal.300' }}>Blog</Link>
      </VStack>
    </Grid>

    <Divider borderColor="teal.600" mb={8} />

    <HStack justify="space-between" align="center" spacing={4}>
      <Text fontSize="sm">© {new Date().getFullYear()} OLX Clone. All rights reserved.</Text>
      <HStack spacing={6}>
        <Link href="#" _hover={{ textDecor: 'underline', color: 'teal.300' }}>
          <FaLocationArrow color="teal.200" />
          <Text ml={2}>Locations</Text>
        </Link>
        <Link href="#" _hover={{ textDecor: 'underline', color: 'teal.300' }}>
          <FaInfoCircle color="teal.200" />
          <Text ml={2}>About Us</Text>
        </Link>
        <Link href="#" _hover={{ textDecor: 'underline', color: 'teal.300' }}>
          <FaBlog color="teal.200" />
          <Text ml={2}>Blog</Text>
        </Link>
        <Link href="#" _hover={{ textDecor: 'underline', color: 'teal.300' }}>
          <FaSitemap color="teal.200" />
          <Text ml={2}>Sitemap</Text>
        </Link>
      </HStack>
    </HStack>
  </Container>
</Box>

  );
};

export default Footer;
