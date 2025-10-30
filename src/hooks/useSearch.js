import { useEffect, useState } from "react";

// Utility function to normalize strings by removing special characters and converting to lowercase
const normalizeString = (str) =>
  str
    .toString()
    .toLowerCase()
    .replace(/[-#]/g, "")
    .replace(/[^a-z0-9]/g, "");

// Utility function to access nested fields and handle arrays
const getNestedValue = (obj, fieldPath) => {
  return fieldPath.split(".").reduce((value, key) => {
    return value && value[key] ? value[key] : null;
  }, obj);
};

export const useSearch = (originalData, searchableFields) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(originalData);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredData(originalData);
    } else {
      const normalizedSearchTerm = normalizeString(searchTerm);

      const results = originalData.filter((item) =>
        searchableFields.some((field) => {
          const fieldValue = getNestedValue(item, field);

          if (Array.isArray(fieldValue)) {
            // Check if any array item matches the search term
            return fieldValue.some((value) =>
              normalizeString(value).startsWith(normalizedSearchTerm)
            );
          } else {
            // Check for matches in single values
            return (
              fieldValue &&
              normalizeString(fieldValue).startsWith(normalizedSearchTerm)
            );
          }
        })
      );
      setFilteredData(results);
    }
  }, [searchTerm, originalData, searchableFields]);

  return {
    searchTerm,
    filteredData,
    setSearchTerm,
  };
};
