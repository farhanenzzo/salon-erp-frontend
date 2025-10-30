export const isFieldDisabled = (fieldId, isEditMode) => {
  const disabledFields = [
    "clientId",
    "clientName",
    "phoneNumber",
    "email",
    "gender",
  ];
  return isEditMode && disabledFields.includes(fieldId);
};
