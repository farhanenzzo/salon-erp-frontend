import { useState, useRef, useEffect } from "react";

const useActionMenu = () => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  const handleActionMenu = (id, e) => {
    // prevent errors if event is undefined
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setOpenMenuId(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return { openMenuId, handleActionMenu, menuRef };
};

export default useActionMenu;
