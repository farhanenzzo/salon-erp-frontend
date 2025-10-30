import dynamic from "next/dynamic";
import Loading from "../../loading";

const ClientsTab = dynamic(
  () => import("../../../components/clientsTab/ClientsTab"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

export default function ClientsPage() {
  return <ClientsTab />;
}
