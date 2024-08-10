import React, { useState } from "react";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Grid,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import axios from 'axios';
import url from './vars'; // Ensure this path is correct

const categories = [
  { title: "Cars", items: ["Cars"] },
  {
    title: "Properties",
    items: [
      "For Sale: Houses & Apartments",
      "For Rent: Houses & Apartments",
      "Lands & Plots",
      "For Rent: Shops & Offices",
      "For Sale: Shops & Offices",
      "PG & Guest Houses",
    ],
  },
  { title: "Mobiles", items: ["Mobile Phones", "Accessories", "Tablets"] },
  {
    title: "Bikes",
    items: ["Motorcycles", "Scooters", "Spare Parts", "Bicycles"],
  },
  {
    title: "Electronics & Appliances",
    items: [
      "TVs, Video - Audio",
      "Kitchen & Other Appliances",
      "Computers & Laptops",
      "Cameras & Lenses",
      "Games & Entertainment",
      "Fridges",
      "Computer Accessories",
      "Hard Disks, Printers & Monitors",
      "ACs",
      "Washing Machines",
    ],
  },
  {
    title: "Commercial Vehicles & Spares",
    items: ["Commercial & Other Vehicles", "Spare Parts"],
  },
  {
    title: "Furniture",
    items: [
      "Sofa & Dining",
      "Beds & Wardrobes",
      "Home Decor & Garden",
      "Kids Furniture",
      "Other Household Items",
    ],
  },
  { title: "Fashion", items: ["Men", "Women", "Kids"] },
  {
    title: "Books, Sports & Hobbies",
    items: [
      "Books",
      "Gym & Fitness",
      "Musical Instruments",
      "Sports Equipment",
      "Other Hobbies",
    ],
  },
  {
    title: "Jobs",
    items: [
      "Data entry & Back office",
      "Sales & Marketing",
      "BPO & Telecaller",
      "Driver",
      "Office Assistant",
      "Delivery & Collection",
      "Teacher",
      "Cook",
      "Receptionist & Front office",
      "Operator & Technician",
      "IT Engineer & Developer",
      "Hotel & Travel Executive",
      "Accountant",
      "Designer",
      "Other Jobs",
    ],
  },
  {
    title: "Pets",
    items: [
      "Fishes & Aquarium",
      "Pet Food & Accessories",
      "Dogs",
      "Other Pets",
    ],
  },
  {
    title: "Services",
    items: [
      "Education & Classes",
      "Tours & Travel",
      "Electronics Repair & Services",
      "Health & Beauty",
      "Home Renovation & Repair",
      "Cleaning & Pest Control",
      "Legal & Documentation Services",
      "Packers & Movers",
      "Other Services",
    ],
  },
];

const DownNavbar = ({ setItems, setLoading }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCategoryClick = async (category) => {
    try {
      setLoading(true);
      const response = await axios.post(`${url}/items/category`, {
        category
      });

      if (Array.isArray(response.data)) {
        setItems(response.data);
      } else {
        console.error("Expected an array but got:", response.data);
      }
    } catch (error) {
      console.error("Error fetching items by category:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box fontSize={"sm"} mb={4} p={4} bg="gray.50" borderRadius="md" boxShadow="md">
    <Flex direction="column" align="center" justify="center" p={4} bg="white" borderRadius="md" boxShadow="md">
      <Menu>
        <MenuButton
          fontSize="lg"
          fontWeight={700}
          color="teal.600"
          bg="white"
          _hover={{ bg: "teal.50", color: "teal.700" }}
          border="2px"
          borderColor="teal.600"
          borderRadius="md"
          p={2}
          onClick={handleToggleMenu}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          w="full"
        >
          All Categories
          {isMenuOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </MenuButton>
        <MenuList
          w="full"
          maxHeight="400px"
          overflowY="auto"
          border="2px"
          borderColor="teal.600"
          borderRadius="md"
          p={2}
          mt={2}
          bg="white"
        >
          <Grid templateColumns="repeat(5, 1fr)" gap={4} p={2}>
            {categories.map((category, index) => (
              <Box key={index}>
                <MenuItem
                  as={Button}
                  variant="link"
                  fontWeight="bold"
                  py={2}
                  px={4}
                  bg="teal.50"
                  _hover={{ bg: "teal.100" }}
                  onClick={() => handleCategoryClick(category.title)}
                  display="flex"
                  alignItems="center"
                >
                  <Text color="teal.600">{category.title}</Text>
                </MenuItem>
                {category.items.map((item, itemIndex) => (
                  <MenuItem
                    key={itemIndex}
                    as="a"
                    href="#"
                    px={4}
                    _hover={{ bg: "gray.100" }}
                    onClick={() => handleCategoryClick(item)}
                  >
                    {item}
                  </MenuItem>
                ))}
                {index < categories.length - 1 && (
                  <Box borderBottom="1px" borderColor="gray.200" my={2} />
                )}
              </Box>
            ))}
          </Grid>
        </MenuList>
      </Menu>
  
      <Flex wrap="wrap" justify="center" mt={4}>
        <Text
          _hover={{ color: "teal.500", textDecoration: "underline" }}
          fontWeight={500}
          mx={2}
          cursor="pointer"
        >
          Car
        </Text>
        <Text
          _hover={{ color: "teal.500", textDecoration: "underline" }}
          fontWeight={500}
          mx={2}
          cursor="pointer"
        >
          Motorcycles
        </Text>
        <Text
          _hover={{ color: "teal.500", textDecoration: "underline" }}
          fontWeight={500}
          mx={2}
          cursor="pointer"
        >
          Mobile Phones
        </Text>
        <Text
          _hover={{ color: "teal.500", textDecoration: "underline" }}
          fontWeight={500}
          mx={2}
          cursor="pointer"
        >
          For Sale: Houses & Apartments
        </Text>
        <Text
          _hover={{ color: "teal.500", textDecoration: "underline" }}
          fontWeight={500}
          mx={2}
          cursor="pointer"
        >
          Scooters
        </Text>
        <Text
          _hover={{ color: "teal.500", textDecoration: "underline" }}
          fontWeight={500}
          mx={2}
          cursor="pointer"
        >
          Commercial & Other Vehicles
        </Text>
        <Text
          _hover={{ color: "teal.500", textDecoration: "underline" }}
          fontWeight={500}
          mx={2}
          cursor="pointer"
        >
          For Rent: Houses & Apartments
        </Text>
      </Flex>
    </Flex>
  </Box>
  
  );
};

export default DownNavbar;
