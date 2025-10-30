import dynamic from "next/dynamic";
import Loading from "../../loading";

const DashboardTab = dynamic(
  () => import("../../../components/dashboardTab/DashboardTab"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

export default function DashboardPage() {
  return <DashboardTab />;
}
