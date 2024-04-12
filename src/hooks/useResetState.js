import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ChatContext } from "../context/ChatContext";

const ResetStateOnURLChange = () => {
  const { dispatch } = useContext(ChatContext);
  const location = useLocation();

  useEffect(() => {
      if (!location.pathname.startsWith("/chat/")) {
      dispatch({ type: "RESET_STATE" });
    }
  }, [location.pathname, dispatch]);

  return null;
};

export default ResetStateOnURLChange;