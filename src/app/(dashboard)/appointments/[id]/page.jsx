"use client";
import { useParams, useRouter } from "next/navigation";
import DataTableDetailPage from "../../../../components/dataTableDetailPage/DataTableDetail";
import { DETAIL_PAGE_TITLES } from "../../../../constants";
import { appointmentDetailScreenHeaderData } from "../../../../utils/data";

const AppointmentDetailPage = () => {
  const router = useRouter();
  const { id } = useParams();

  return (
    <div className="table">
      <DataTableDetailPage
        client={id}
        detailPage={DETAIL_PAGE_TITLES.APPOINTMENT_DETAILS}
        headerData={appointmentDetailScreenHeaderData}
      />
    </div>
  );
};

export default AppointmentDetailPage;
