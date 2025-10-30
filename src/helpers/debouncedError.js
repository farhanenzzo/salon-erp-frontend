import toast from "react-hot-toast";

let lastErrorTime = 0;
let lastErrorMessage = "";
const ERROR_COOLDOWN = 2000; // 2 seconds cooldown between similar errors

const showDebouncedError = (message, status) => {
  const currentTime = Date.now();
  const isSameError = message === lastErrorMessage;
  const isWithinCooldown = currentTime - lastErrorTime < ERROR_COOLDOWN;

  // Only show toast if it's a different error or outside cooldown period
  if (!isSameError || !isWithinCooldown) {
    toast.error(message);
    lastErrorTime = currentTime;
    lastErrorMessage = message;
  }
};

export default showDebouncedError;
