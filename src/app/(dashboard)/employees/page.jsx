import dynamic from "next/dynamic";
import Loading from "../../loading";

const EmployeesTab = dynamic(
  () => import("../../../components/employeesTab/EmployeesTab"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

export default function EmployeesPage() {
  return <EmployeesTab />;
}
