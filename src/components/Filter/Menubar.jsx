import React, { useEffect, useState } from 'react';
import { Box, useDisclosure } from '@chakra-ui/react';
import useSearchUsersPosts from '../../hooks/useSearchUserPosts';
import FeedPost from '../FeedPosts/FeedPost';
import PostPageContent from '../PostPage/PostPageContent';
import {useDispatch} from 'react-redux';
import { setProduct } from '../../redux/reducers/product';
import { Link } from 'react-router-dom';
const categories = [
  { name: "Dorm & Living", value: "Dorm and Living" },
  { name: "Electronics", value: "electronics" },
  { name: "Clothing, Shoes, & Accessories", value: "Clothing and Accessories" },
  { name: "Bags & Luggage", value: "bagsLuggage" },
  { name: "Books & Study Materials", value: "booksStudyMaterials" },
  { name: "Outdoor & Sports", value: "outdoorSports" },
];

const Menubar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { posts, isLoading, getPostDetails } = useSearchUsersPosts();
  const [selectedCategory, setSelectedCategory] = useState("");
  const dispatch=useDispatch()

  const handleCategoryClick = (categoryValue) => {
    setSelectedCategory(categoryValue);
    getPostDetails(categoryValue, );
  };

  useEffect(()=>{
    dispatch(setProduct(posts))
  },[posts])

  return (
    <>
      <Box display="flex" alignItems="start">
        {categories.map((category) => (
          <Link to={'/?category='+category.name}  onClick={() => handleCategoryClick(category.value)}>
          <Box 
            key={category.value} 
            p="2" 
            _hover={{ bg: 'gray.100', cursor: 'pointer' }}
           
          >
            {category.name}
          </Box>
          </Link>
        ))}
      </Box>
      {/* {posts &&
        posts.map((post, index) => (
          index % 25 === 0 ? (
            <FeedPost
              postData={post}
                key={post.id}
                id={post.id}
            />
          ) : null
        ))
      } */}
    </>
  );
};

export default Menubar;



