import Loading from "../../../loading";
import dynamic from "next/dynamic";

const GeneralSettings = dynamic(
  () =>
    import(
      "../../../../components/settingsTab/generalSettingsTab/GeneralSettings"
    ),
  { ssr: false, loading: () => <Loading /> }
);

export default function GeneralSettingPage() {
  return <GeneralSettings />;
}
