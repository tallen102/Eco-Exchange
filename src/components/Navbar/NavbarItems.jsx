import React,{useEffect,useContext, useState, useRef} from 'react';
import { Box } from '@chakra-ui/react';
import CreatePost from './CreatePost';
import Message from './Message';
import ProfileLink from './ProfileLink';
import Search from './Search';
import Wishlist from './Wishlist';
import { collection, doc, onSnapshot } from "firebase/firestore";
import { auth, firestore } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ChatContext } from '../../context/ChatContext';
import {useLocation} from 'react-router-dom'

const NavbarItems = () => {
    const [authUser] = useAuthState(auth);
    const [count,setCount]=useState(0);
    let {pathname} = useLocation();
    const loaded=useRef(false)

    useEffect(() => {
        if(!authUser.uid)return;
          loaded.current=false
          if(pathname=='/chat/messages'){
            setCount(0)
          }
          const unsub = onSnapshot(
            doc(firestore, "userChats", authUser.uid), (doc) => {
            if(loaded.current==false){
               return loaded.current=true
            }
            if(pathname=='/chat/messages'){
                setCount(0)
            }else{
                setCount(prev=>prev+1)
            }
          });
    
          return () => {
            unsub();
          };
      }, [authUser.uid,pathname]);

    return (
        <>
           
            <Search />{/* Center */}
            <Box position="absolute" right="4" display="flex" alignItems="center"> {/* Positioned to the far right */}
                <CreatePost />
                <Wishlist />
                <Message messageCount={count}/>
                <ProfileLink /> 
            </Box>
           
        </>
    );
}

export default NavbarItems;


