import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Box,
  Text,
  Link,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import url from "./vars";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const URL = url;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${URL}/user/login`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.user);
      localStorage.setItem("userId", response.data.userId);
      setEmail("");
      setPassword("");

      toast({
        title: "Login successful!",
        description: "You have been successfully logged in.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      navigate("/");
    } catch (error) {
      toast({
        title: "Login failed.",
        description: error.response?.data?.error || "There was an issue logging in.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
  position="relative"
  minH="100vh"
  display="flex"
  alignItems="center"
  justifyContent="center"
  p={4}
  bg="gray.50" // Updated background color
>
  <Button
    position="absolute"
    top="10px"
    left="10px"
    color="white"
    bg="teal.600" // Updated button color
    _hover={{ bg: "teal.700" }} // Darker hover effect
    onClick={() => navigate("/")}
  >
    Go Back
  </Button>
  <Box
    maxW="md" // Increased max width
    width="100%"
    p={6} // Added padding for better spacing
    borderWidth={1}
    borderRadius="lg" // Updated border radius
    boxShadow="lg" // Increased shadow for better depth
    bg="white" // Background color for the form box
  >
    <Flex
      alignItems="center"
      justifyContent="center"
      bg="teal.100" // Light teal background for the heading
      borderRadius="md" // Rounded corners for the heading section
      p={4} // Padding inside the heading box
      mb={6} // Margin bottom for spacing
    >
      <Text 
        fontSize="4xl" // Increased font size for the heading
        fontWeight="bold" // Updated font weight
        textAlign="center" 
        color="teal.600"
      >
        Welcome Back!
        <br />
        Please Log In
      </Text>
    </Flex>
    <form onSubmit={handleLogin}>
      <FormControl mb={5}>
        <FormLabel htmlFor="email" fontWeight="medium">Email</FormLabel>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          borderColor="gray.300"
          _hover={{ borderColor: "teal.500" }}
          _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
        />
      </FormControl>
      <FormControl mb={6}>
        <FormLabel htmlFor="password" fontWeight="medium">Password</FormLabel>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          borderColor="gray.300"
          _hover={{ borderColor: "teal.500" }}
          _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
        />
      </FormControl>
      <Button
        color="white"
        bg="teal.600"
        _hover={{ bg: "teal.700" }}
        type="submit"
        isLoading={loading}
        loadingText="Logging in..."
        width="full" // Full width button
        borderRadius="md" // Rounded corners for the button
        p={4} // Padding inside the button
      >
        Login
      </Button>
    </form>
    <Text mt={6} textAlign="center">
      Don't have an account?{" "}
      <Link color="teal.500" fontWeight="bold" onClick={() => navigate("/register")}>
        Sign Up
      </Link>
    </Text>
  </Box>
</Box>

  );
};

export default LoginPage;
