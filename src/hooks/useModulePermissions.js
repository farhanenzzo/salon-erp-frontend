import { useSelector } from "react-redux";

const useModulePermissions = () => {
  const { currentModuleId } = useSelector((state) => state.module);
  const { userPermissions } = useSelector((state) => state.permissions);

  const modulePermissions = userPermissions.find(
    (permission) => permission.moduleId === currentModuleId
  );

  return {
    moduleId: currentModuleId,
    canEdit: modulePermissions ? modulePermissions.canEdit : false,
    canView: modulePermissions ? modulePermissions.canView : false,
  };
};

export default useModulePermissions;
