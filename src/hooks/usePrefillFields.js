import { useState, useCallback } from "react";

const usePrefillFields = () => {
  const [disabledFields, setDisabledFields] = useState({});

  const prefillFields = useCallback((data) => {
    const newDisabledFields = Object.keys(data).reduce((acc, key) => {
      if (key !== "clientId") {
        acc[key] = true;
      }
      return acc;
    }, {});

    setDisabledFields(newDisabledFields);
    return data;
  }, []);

  const clearDisabledFields = useCallback(() => {
    setDisabledFields({});
  }, []);

  const isFieldDisabled = useCallback(
    (field) => {
      return disabledFields[field] || false;
    },
    [disabledFields]
  );

  return {
    prefillFields,
    clearDisabledFields,
    isFieldDisabled,
  };
};

export default usePrefillFields;
