import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Heading,
  Stack,
  Input,
  Flex,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { AddIcon, SearchIcon } from "@chakra-ui/icons"; 
import { MdSearch } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import axios from 'axios';
import DownNavbar from "./DownNavbar";
import url from "./vars";

const Navbar = ({ setItems , setLoading }) => {
  const URL = url;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [itemSearch, setItemSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterData, setFilterData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleLocationSearchClick = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${URL}/items/location`, {
        location: locationSearch,
      });
      if (Array.isArray(response.data)) {
        setItems(response.data); 
        setLoading(false);
      } else {
        console.error("Expected an array but got:", response.data);
      }
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  const handleItemSearchClick = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${URL}/items/search`, {
        name: itemSearch,
      });
      if (Array.isArray(response.data)) {
        setItems(response.data); 
        setLoading(false);
      } else {
        console.error("Expected an array but got:", response.data);
      }
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  const handleFilterClick = async (filter) => {
    try {
      setLoading(true);
      console.log("Filter by:", filter);
      if(filter==""){
        const response = await axios.get(`${URL}/items/`, {
        });
        if (Array.isArray(response.data)) {
          setItems(response.data);
          setLoading(false);
        } else {
          console.error("Expected an array but got:", response.data);
        }
        setFilterData(filter);
        setFilterOpen(false);
        return;
      }
      const response = await axios.post(`${URL}/items/${filter}`, {
      });
      if (Array.isArray(response.data)) {
        setItems(response.data);
        setLoading(false);
      } else {
        console.error("Expected an array but got:", response.data);
      }
      setFilterData(filter);
      setFilterOpen(false);
    } catch (error) {
      console.error("Error fetching filtered items:", error.message);
    }
  };

  return (
    <Box
  position="fixed"
  top={0}
  left={0}
  right={0}
  zIndex={1000}
  bg="teal.500" // Updated background color
  boxShadow="md"
>
  <Flex as="nav" p={4} justifyContent="space-between" alignItems="center">
    <Box>
      <Heading
        size="md"
        fontWeight="bold" // Adjusted font weight
        color="white" // Updated font color
        _hover={{ color: "teal.300", cursor: "pointer" }} // Hover effect
        onClick={() => navigate("/")}
      >
        O|X
      </Heading>
    </Box>
    <Flex alignItems="center" flex="1" ml={6}>
      <Input
        placeholder="Search location..."
        size="md"
        mr={4}
        w={"30%"}
        value={locationSearch}
        onChange={(e) => setLocationSearch(e.target.value)}
        borderRadius="md"
        _placeholder={{ color: "gray.400" }}
      />
      <IconButton
        aria-label="Search Location"
        icon={<SearchIcon />} 
        backgroundColor={"teal.400"} // Updated background color
        color="white"
        variant="solid"
        _hover={{ bg: "teal.500" }} // Hover effect
        onClick={handleLocationSearchClick}
      />
      <Input
        placeholder="Search Item..."
        size="md"
        w={"50%"}
        value={itemSearch}
        onChange={(e) => setItemSearch(e.target.value)}
        ml={4}
        borderRadius="md"
        _placeholder={{ color: "gray.400" }}
      />
      <IconButton
        aria-label="Search Item"
        icon={<MdSearch />} 
        backgroundColor={"teal.400"} // Updated background color
        color="white"
        variant="solid"
        _hover={{ bg: "teal.500" }} // Hover effect
        onClick={handleItemSearchClick}
      />
      <Menu
        isOpen={filterOpen}
        onOpen={() => setFilterOpen(true)}
        onClose={() => setFilterOpen(false)}
      >
        <MenuButton
          ml={4}
          as={Button}
          rounded={"full"}
          variant={"link"}
          cursor={"pointer"}
          minW={0}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="white" // Updated icon color
          >
            <path
              d="M9 5a1 1 0 1 0 0 2a1 1 0 0 0 0-2zM6.17 5a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 0 1 0-2h1.17zM15 11a1 1 0 1 0 0 2a1 1 0 0 0 0-2zm-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2h7.17zM9 17a1 1 0 1 0 0 2a1 1 0 0 0 0-2zm-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2h1.17"
            />
          </svg>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => handleFilterClick("")}>All Items</MenuItem>
          <MenuItem onClick={() => handleFilterClick("sold")}>Sold</MenuItem>
          <MenuItem onClick={() => handleFilterClick("unSold")}>Unsold</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
    <Box>
      <Stack direction="row" spacing={4} align="center">
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
        <Button
          bg="teal.400" // Updated background color
          color="white"
          _hover={{ bg: "teal.500" }} // Hover effect
          borderRadius="full"
          p="12px 24px"
          fontSize="md"
          border="none"
          boxShadow="md"
          leftIcon={<AddIcon />}
          onClick={() => isLoggedIn ? navigate("/addItem") : navigate("/login")}
        >
          SELL
        </Button>
        {isLoggedIn ? (
          <Menu
            isOpen={isOpen}
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
          >
            <MenuButton>
              <Flex align="center">
                <Avatar size="md" color="red" name={localStorage.getItem("name")} />
                <IconButton
                  aria-label="Menu"
                  icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  variant="link"
                  ml={2}
                  fontSize="xl"
                  color="white"
                  _hover={{ color: "teal.300" }}
                />
              </Flex>
            </MenuButton>
            <MenuList bg="gray.700">
              <MenuItem as={Link} to="/" _hover={{ bg: "gray.600" }}>Profile</MenuItem>
              <MenuItem as={Link} to="/myItems" _hover={{ bg: "gray.600" }}>My Items</MenuItem>
              <MenuItem onClick={handleLogout} _hover={{ bg: "gray.600" }}>Logout</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Link to="/login" style={{ color: "white", textDecoration: "none" }}>Login</Link>
        )}
      </Stack>
    </Box>
  </Flex>
  <DownNavbar setItems={setItems} setLoading={setLoading} />
</Box>

  );
};

export default Navbar;
