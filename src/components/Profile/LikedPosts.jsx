import { Grid, Spinner, Flex } from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { firestore } from "../../firebase/firebase";
import useShowToast from "../../hooks/useShowToast";
import FeedPost from "../FeedPosts/FeedPost";

const LikedPosts = ({ userId }) => {
    const [{ posts = [], loading }, setState] = useState({ loading: true })
    const showToast = useShowToast();
    useEffect(() => {
        const postsRef = collection(firestore, "posts"),
            q = query(postsRef, where("likes", "array-contains", userId));
        getDocs(q)
            .then(snapShot => setState({ posts: snapShot.docs.map(doc => ({ ...doc.data(), id: doc.id })) }))
            .catch(err => {
                showToast("Error", err.message, "error");
                setState({});
            })
    }, [])
    if (loading) return <Flex marginTop="5" alignItems="center" justifyContent="center"><Spinner size="xl" /></Flex>
    return (
        <Grid
            templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(6, 1fr)" }}
            gap={1}
            columnGap={1}
        >
            {posts.map(post => (
                <FeedPost
                    key={post.id}
                    postData={post}
                    id={post.id}
                />
            ))}
        </Grid>
    )
}

export default LikedPosts;