import dynamic from "next/dynamic";

const UserManagement = dynamic(
  () =>
    import("../../../../components/settingsTab/userManagement/UserManagement"),
  {
    ssr: false,
  }
);

export default function UserManagementPage() {
  return <UserManagement />;
}
