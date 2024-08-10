import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Image,
  Text,
  Button,
  Flex,
  Stack,
  Spacer,
  Progress,
  Center,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import timeAgo from "./timeAgo";


const Container = ({ items, loading }) => {
  const URL ="https://olxclone-6.onrender.com";
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const navigate = useNavigate();



  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Box p={["5%", "8%", "10%"]} mt={20}>
  <Grid
    templateColumns={{
      base: 'repeat(1, 1fr)',
      sm: 'repeat(2, 1fr)',
      md: 'repeat(3, 1fr)',
      lg: 'repeat(4, 1fr)',
    }}
    gap={6} // Increase the gap for better spacing
  >
    {currentItems.map((item) => (
      <Box
        key={item._id}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        maxW="300px"
        p={4}
        onClick={() => navigate(`/itemPage/${item._id}`)}
        position="relative"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        _hover={{ shadow: "lg", transform: "scale(1.12)" }} // Add hover effect
        transition="transform 0.3s ease, shadow 0.3s ease"
      >
        <Image
          src={`${URL}/uploads/${item.image}`}
          alt={item.name}
          boxSize="200px"
          objectFit="cover"
          borderRadius="md"
          mb={3}
        />
        <Box textAlign="center">
          <Text fontSize="sm" color="gray.600" mb={2}>
            {timeAgo(item.createdAt)}
          </Text>
          <Box
            fontWeight="bold"
            fontSize="lg"
            mb={3}
            border="1px"
            borderColor="gray.300"
            p={2}
            borderRadius="md"
          >
            {item.name}
          </Box>
          <Flex align="center" justify="center">
            <Box fontWeight="bold" fontSize="xl" mr={2}>
              ₹{item.price}
            </Box>
            <Box
              border="1px"
              borderStyle="dotted"
              borderColor={item.status === "sold" ? "red.500" : "green.500"}
              borderRadius="full"
              p={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg={item.status === "sold" ? "red.50" : "green.50"}
              transform="rotate(-10deg)"
              ml={2}
            >
              <Text
                fontSize="sm"
                fontWeight="medium"
                color={item.status === "sold" ? "red.500" : "green.500"}
                textAlign="center"
              >
                {item.status === "sold" ? "Sold" : "Unsold"}
              </Text>
            </Box>
          </Flex>
        </Box>
      </Box>
    ))}
  </Grid>
  <Flex justify="center" mt={6}>
    <Stack spacing={4} direction="row">
      {pageNumbers.map((number) => (
        <Button
          key={number}
          onClick={() => paginate(number)}
          variant={number === currentPage ? "solid" : "outline"}
          colorScheme={number === currentPage ? "teal" : "gray"}
          size="sm"
          fontWeight="bold"
        >
          {number}
        </Button>
      ))}
    </Stack>
  </Flex>
</Box>

  );
};

export default Container;
