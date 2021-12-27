import { useState, createContext, useContext, useEffect } from "react";
import memberService from "../../services/official/org/members-service";
import { message } from "antd";
import authService from "../../services/auth-service";

const PageContext = createContext();

const usePageContext = () => useContext(PageContext);

const PageContextProvider = ({ children }) => {
  useEffect(async () => {
    try {
      if (localStorage.getItem("token")) {
        setPicFileName(await memberService.getPicFileName());
        setMemberInfo(authService.getCurrentUser());
      }
    } catch (error) {
      message.error(error);
    }
  }, []);

  const [progress, setProgress] = useState(false);
  const [searched, setSearched] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [records, setRecords] = useState([]);
  const [access, setAccess] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const [picFileName, setPicFileName] = useState("");
  const [memberInfo, setMemberInfo] = useState({});

  const contextValue = {
    progress,
    setProgress,
    searched,
    setSearched,
    searchText,
    setSearchText,
    records,
    setRecords,
    access,
    setAccess,
    selectedObject,
    setSelectedObject,
    showModal,
    setShowModal,
    showDetails,
    setShowDetails,
    searchFocus,
    setSearchFocus,
    picFileName,
    memberInfo,
  };

  return (
    <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>
  );
};

const useResetContext = () => {
  const {
    setProgress,
    setSearched,
    setSearchText,
    setRecords,
    setAccess,
    setSelectedObject,
    setShowModal,
    setSearchFocus,
  } = usePageContext();

  const resetContext = () => {
    setProgress(false);
    setSearched(false);
    setSearchText("");
    setRecords([]);
    setAccess(null);
    setSelectedObject(null);
    setShowModal(false);
    setSearchFocus(false);
  };

  return resetContext;
};

export { PageContextProvider, usePageContext, useResetContext };
