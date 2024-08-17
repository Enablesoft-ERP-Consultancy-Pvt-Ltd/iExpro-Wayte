import { Switch, SwitchControl, SwitchThumb } from "~/components/ui/switch";
import { createForm } from "@felte/solid";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import useAppSettingsStore from "~/components/state/stores/app-settings";

const SettingsPage = () => {
  const appSettings = useAppSettingsStore();

  const { form, setFields } = createForm({
    onSubmit: (values) => {
      appSettings().setValues(values);
    },
    initialValues: {
      weight_service_settings: {
        ...appSettings().weight_service_settings,
      },
      appearance: {
        ...appSettings().appearance,
      },
    },
  });

  return (
    <form class="m-6 w-full max-w-5xl" ref={form}>
      {/* weight service settings */}
      <div class="w-full">
        {/* weight service settings title */}
        <div class="flex gap-2 items-center">
          <p class="text-nowrap font-semibold text-primary/80">
            Weight Service
          </p>

          <div class="border border-border w-full" />
        </div>
      </div>

      {/* apperance */}
      <div class="w-full">
        {/* apperance title */}
        <div class="flex gap-2 items-center">
          <p class="text-nowrap font-semibold text-primary/80">Appearance</p>
          <div class="border border-border w-full" />
        </div>

        {/* setting options */}
        <div class="flex items-center gap-4 w-full p-2 px-5">
          {/* theme */}
          <Label for="dark_theme" class="w-full">
            Dark theme
          </Label>
          <Switch
            defaultChecked={appSettings().appearance.dark_theme}
            name="dark_theme"
            onChange={(v) => {
              setFields("appearance.dark_theme", v, true);
            }}
          >
            <SwitchControl>
              <SwitchThumb />
            </SwitchControl>
          </Switch>
        </div>
      </div>

      <div class="w-full flex justify-end py-6 px-3">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default SettingsPage;
