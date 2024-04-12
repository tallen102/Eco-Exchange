import {
    createContext,
    useEffect,
    useReducer,
  } from "react";
  import { useAuthState } from "react-firebase-hooks/auth";
  import { auth } from "../firebase/firebase";
  
  export const ChatContext = createContext();
  
  export const ChatContextProvider = ({ children }) => {
    const [authUser] = useAuthState(auth);
  
    const INITIAL_STATE = {
      chatId: "null",
      user: {},
    };
  
  
  
    const chatReducer = (state, action) => {
      switch (action.type) {
        case "CHANGE_USER":
          return {
            user: action.payload,
            chatId:
              authUser.uid > action.payload.uid
                ? authUser.uid + action.payload.uid + action.payload.postId
                : action.payload.uid + authUser.uid + action.payload.postId,
          };
        case "RESET_STATE":
          return INITIAL_STATE;
  
        default:
          return state;
      }
    };
  
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  
    useEffect(() => {
      if (!authUser) {
        dispatch({ type: "RESET_STATE" });
      }
    }, [authUser]);
    return (
      <ChatContext.Provider value={{ data: state, dispatch }}>
        {children}
      </ChatContext.Provider>
    );
  };