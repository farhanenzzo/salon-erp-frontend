import dynamic from "next/dynamic";
import Loading from "../../loading";

const AppointmentsTab = dynamic(
  () => import("../../../components/appointmentsTab/AppointmentsTab"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

export default function AppointmentsPage() {
  return <AppointmentsTab />;
}
