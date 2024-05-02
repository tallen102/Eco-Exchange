import React, { useEffect, useState, useRef } from 'react';
import { Box, useDisclosure } from '@chakra-ui/react';
import useSearchUsersPosts from '../../hooks/useSearchUserPosts';
import FeedPost from '../FeedPosts/FeedPost';
import PostPageContent from '../PostPage/PostPageContent';
import { useDispatch } from 'react-redux';
import { setProduct } from '../../redux/reducers/product';
import { Link } from 'react-router-dom';

const categories = [
  { name: "Dorm & Living", value: "Dorm and Living" },
  { name: "Electronics", value: "Electronics" },
  { name: "Clothing, Shoes, & Accessories", value: "Clothing and Accessories" },
  // { name: "Bags & Luggage", value: "Bags and Luggage" },
  { name: "Books & Study Materials", value: "Book and Study Materials" },
  { name: "Outdoor & Sports", value: "Outdoor and Sports" },
];

const Menubar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { posts, isLoading, getPostDetails } = useSearchUsersPosts();
  const [selectedCategory, setSelectedCategory] = useState("");
  const dispatch = useDispatch();
  const categoryRef = useRef(null);

  const handleCategoryClick = (categoryValue) => {
    setSelectedCategory(categoryValue);
    getPostDetails(categoryValue);
  };

  useEffect(() => {
    dispatch(setProduct(posts));
  }, [posts]);

  useEffect(() => {
    if (categoryRef.current) {
      const height = categoryRef.current.clientHeight;
      // Set the menu bar's height to match the category name
      categoryRef.current.parentNode.style.height = `${height}px`;
    }
  }, [selectedCategory]);

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" mt="1" bg="white" width="100%">
        {categories.map((category) => (
          <Link key={category.value} to={`/?category=${category.name}`} onClick={() => handleCategoryClick(category.value)}>
            <Box
              p="2"
              flex="1" // Each category box takes equal width
              _hover={{ bg: 'gray.100', cursor: 'pointer' }}
              ref={categoryRef}
              textAlign="center" // Center the text horizontally
            >
              {category.name}
            </Box>
          </Link>
        ))}
      </Box>
    </>
  );
  
  
};

export default Menubar;

