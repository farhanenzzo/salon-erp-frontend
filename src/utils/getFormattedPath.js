const getFormattedPath = (pathname) => {
  const pathParts = pathname.replace(/^\/+/, "").split("/");

  // If the last part of the path is a valid MongoDB ID, replace it with "Details"
  if (
    pathParts.length > 1 &&
    /^[a-fA-F0-9]{24}$/.test(pathParts[pathParts.length - 1])
  ) {
    pathParts[pathParts.length - 1] = "Details"; // Replace ID with "Details"
  }

  return pathParts.join(" > ");
};

export default getFormattedPath;
