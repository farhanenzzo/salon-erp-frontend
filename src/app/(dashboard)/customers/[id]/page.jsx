"use client";
import { useParams } from "next/navigation";
import DataTableDetailPage from "../../../../components/dataTableDetailPage/DataTableDetail";
import { appointmentDetailScreenHeaderData } from "../../../../utils/data";

const CustomerDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="table">
      <DataTableDetailPage
        client={id}
        headerData={appointmentDetailScreenHeaderData}
        detailPage="Customer Details"
      />
    </div>
  );
};

export default CustomerDetailPage;
