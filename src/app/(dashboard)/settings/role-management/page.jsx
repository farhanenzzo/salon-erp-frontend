import dynamic from "next/dynamic";

const RoleManagement = dynamic(
  () =>
    import("../../../../components/settingsTab/roleManagement/RoleManagement"),
  {
    ssr: false,
  }
);

export default function RoleManagementPage() {
  return <RoleManagement />;
}
