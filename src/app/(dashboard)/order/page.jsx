import dynamic from "next/dynamic";

const OrderTab = dynamic(
  () => import("../../../components/orderTab/OrderTab"),
  {
    ssr: false,
  }
);

export default function OrderPage() {
  return <OrderTab />;
}
