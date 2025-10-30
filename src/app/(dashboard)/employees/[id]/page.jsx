"use client";
import { useParams } from "next/navigation";
import DataTableDetailPage from "../../../../components/dataTableDetailPage/DataTableDetail";
import { employeeDetailScreenHeaderData } from "../../../../utils/data";
import useModulePermissions from "../../../../hooks/useModulePermissions";

const EmployeeDetailPage = () => {
  const { id } = useParams();

  const { canEdit } = useModulePermissions();

  return (
    <div className="table">
      <DataTableDetailPage
        headerData={employeeDetailScreenHeaderData}
        employee={id}
        detailPage="Employee Profile"
        leftHead="Employee Information"
        canEdit={canEdit}
      />
    </div>
  );
};

export default EmployeeDetailPage;
