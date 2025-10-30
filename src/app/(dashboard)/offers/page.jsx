import dynamic from "next/dynamic";
import Loading from "../../loading";

const OffersTab = dynamic(
  () => import("../../../components/offersTab/OffersTab"),
  {
    ssr: false, // Disable server-side rendering for this component
    loading: () => <Loading />,
  }
);

export default function OffersPage() {
  return <OffersTab />;
}
