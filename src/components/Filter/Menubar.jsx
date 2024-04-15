import React, { useState } from 'react';
import { Box, useDisclosure } from '@chakra-ui/react';
import useSearchUsersPosts from '../../hooks/useSearchUserPosts';
import FeedPost from '../FeedPosts/FeedPost';
import PostPageContent from '../PostPage/PostPageContent';

const categories = [
  { name: "Dorm & Living", value: "dormLiving" },
  { name: "Electronics", value: "electronics" },
  { name: "Clothing, Shoes, & Accessories", value: "clothingShoesAccessories" },
  { name: "Bags & Luggage", value: "bagsLuggage" },
  { name: "Books & Study Materials", value: "booksStudyMaterials" },
  { name: "Outdoor & Sports", value: "outdoorSports" },
];

const Menubar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { posts, isLoading, getPostDetails } = useSearchUsersPosts();
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryClick = (categoryValue) => {
    setSelectedCategory(categoryValue);
    getPostDetails(categoryValue);
  };

  return (
    <>
      <Box display="flex" alignItems="start" bg="white">  {/* Set the background color here */}
        {categories.map((category) => (
          <Box 
            key={category.value} 
            p="2" 
            borderBottom="1px solid #E2E8F0"  
            _hover={{ bg: 'gray.100', cursor: 'pointer' }}
            onClick={() => handleCategoryClick(category.value)}
          >
            {category.name}
          </Box>
        ))}
      </Box>
      {posts &&
        posts.map((post, index) => (
          index % 25 === 0 ? (
            <FeedPost
              postData={post}
              key={post.id}
              id={post.id}
            />
          ) : null
        ))
      }
    </>
  );
};

export default Menubar;

