import { Switch, SwitchControl, SwitchThumb } from "~/components/ui/switch";
import { createForm } from "@felte/solid";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import useAppSettingsStore from "~/components/state/stores/app-settings";
import { createSignal, onMount } from "solid-js";
import { invoke } from "@tauri-apps/api/tauri";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  NumberField,
  NumberFieldDecrementTrigger,
  NumberFieldIncrementTrigger,
  NumberFieldInput,
} from "~/components/ui/number-field";
import { showToast } from "~/components/ui/toast";

const SettingsPage = () => {
  const appSettings = useAppSettingsStore();
  const [ports, setPorts] = createSignal<string[]>([]);

  onMount(() => {
    invoke("get_ports")
      .then((ports) => {
        setPorts(ports as string[]);
      })
      .catch(() => {
        console.log("Failed to get ports");
      });
  });

  const { form, setFields, data } = createForm({
    onSubmit: (values) => {
      appSettings().setValues(values);
      showToast({
        title: "Settings updated",
        description: "Your changes has been saved.",
        variant: "success",
        duration: 2000,
      });
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
    <div class="w-full flex items-center justify-center">
      <form class="p-6 w-full max-w-5xl space-y-4" ref={form}>
        {/* weight service settings */}
        <div class="w-full">
          {/* weight service settings title */}
          <div class="flex gap-2 items-center">
            <p class="text-nowrap whitespace-nowrap font-semibold text-primary/80">
              Weight Service
            </p>
            <div class="border border-border w-full" />
          </div>

          {/* ports */}
          <div class="flex items-center gap-4 w-full p-2 px-5">
            <div class="flex items-center w-full">
              <Label class="flex-grow" for="weight_service_settings.port">
                Port
              </Label>
              <Select
                value={data((d) => d.weight_service_settings.port)}
                onChange={(v) => {
                  setFields("weight_service_settings.port", v, true);
                }}
                options={ports()}
                placeholder="port"
                itemComponent={(props) => (
                  <SelectItem item={props.item}>
                    {props.item.rawValue}
                  </SelectItem>
                )}
              >
                <SelectTrigger aria-label="Port" class="w-[180px]">
                  <SelectValue<string>>
                    {(state) => state.selectedOption()}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent />
              </Select>
            </div>
          </div>

          {/* baud rate */}
          <div class="flex items-center gap-4 w-full p-2 px-5">
            <Label for="baud_rate" class="w-full">
              Baud rate
            </Label>
            <NumberField
              class="w-36"
              name="baud_rate"
              onRawValueChange={(v) => {
                setFields("weight_service_settings.baud_rate", v, true);
              }}
              defaultValue={appSettings().weight_service_settings.baud_rate}
            >
              <div class="relative">
                <NumberFieldInput />
                <NumberFieldIncrementTrigger />
                <NumberFieldDecrementTrigger />
              </div>
            </NumberField>
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
    </div>
  );
};

export default SettingsPage;
