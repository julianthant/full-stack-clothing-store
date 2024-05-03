import { SettingsDesktopPage } from './_components/SettingsDesktopPage';
import { SettingsMobileNavPage } from './_components/SettingsMobileNavPage';

const page = () => {
  return (
    <div>
      <SettingsDesktopPage />
      <SettingsMobileNavPage />
    </div>
  );
};

export default page;
