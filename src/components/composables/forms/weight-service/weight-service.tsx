import { createForm } from "@felte/solid";
import WeightServiceFormBasicDetails from "./sub-parts/basic-details";
import { createSignal, onCleanup, onMount } from "solid-js";
import { invoke } from "@tauri-apps/api";
import { listen, emit, type UnlistenFn } from "@tauri-apps/api/event";
import { isBrowser } from "~/lib/utils";
import WeightServiceFormItemDetails from "./sub-parts/item-details";
import WeightServicePhysicalDetails from "./sub-parts/physical-details";
import WeightServiceFormRemarkDetails from "./sub-parts/remark-details";
import { Button } from "~/components/ui/button";

const WeightServiceForm = () => {
  const { form, setFields } = createForm({
    onSubmit: (v) => {
      console.log(v);
    },
  });
  const [unlisten, setUnlisten] = createSignal<UnlistenFn | null>(null);

  onMount(async () => {
    if (isBrowser()) {
      return;
    }
    invoke("emit_weight_on_port", { port: "/dev/pts/3", baudRate: 9600 })
      .then(() => {
        console.log("hooked to weight machine.");
      })
      .catch((e) => {
        console.error(e);
      });

    const unlisten = await listen("weight-read", (event) => {
      const w = event.payload as string;
      console.log("recv: ", w);
      setFields("bell_weight", w, true);
    });
    setUnlisten(() => unlisten);
  });

  onCleanup(() => {
    if (isBrowser()) {
      return;
    }
    const l = unlisten();
    emit("weight-close");
    if (l) {
      console.log("unlisten");
      l();
    }
  });

  return (
    <form ref={form} class="p-4 space-y-4">
      <WeightServiceFormBasicDetails setFields={setFields} />
      <WeightServiceFormItemDetails setFields={setFields} />
      <WeightServicePhysicalDetails setFields={setFields} />
      <WeightServiceFormRemarkDetails setFields={setFields} />
      <div class="w-full flex justify-end px-6">
        <Button type="submit">submit</Button>
      </div>
    </form>
  );
};
export default WeightServiceForm;
