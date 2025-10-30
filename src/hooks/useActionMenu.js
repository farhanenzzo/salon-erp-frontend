import { useState, useCallback, useRef, useEffect } from "react";

const useActionMenu = (initialOpenId = null) => {
  const [openMenuId, setOpenMenuId] = useState(initialOpenId);
  const menuRef = useRef(null);

  const handleActionMenu = useCallback((id, event) => {
    if (event) {
      event.stopPropagation();
    }
    setOpenMenuId((prevId) => (prevId === id ? null : id));
  }, []);

  const handleClickOutside = useCallback((event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpenMenuId(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return {
    openMenuId,
    handleActionMenu,
    menuRef,
  };
};

export default useActionMenu;
