import Loading from "../../loading";
import dynamic from "next/dynamic";

const ServicesTab = dynamic(
  () => import("../../../components/servicesTab/ServicesTab"),
  { ssr: false, loading: () => <Loading /> }
);

export default function ServicesPage() {
  return <ServicesTab />;
}
