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
      users: {},
    };
  
  
  
    const chatReducer = (state, action) => {
      switch (action.type) {
        case "CHANGE_USER":
          return {
            ...state,
            user: action.payload,
            chatId: authUser.uid > action.payload.uid
              ? authUser.uid + action.payload.uid + action.payload.postId
              : action.payload.uid + authUser.uid + action.payload.postId,
            users: {
              ...state.users,
              [action.payload.uid]: {
                ...state.users[action.payload.uid],
                messageCount: (state.users[action.payload.uid]?.messageCount || 0)
              }
            }
          };
        case "INCREMENT_MESSAGE_COUNT":
          const { uid} = action.payload; // Expect userId to be provided in the action
          return {
            ...state,
            users: {
              ...state.users,
              [uid]: {
                ...state.users[uid],
                messageCount: (state.users[uid]?.messageCount || 0) + 1
              }
            }
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