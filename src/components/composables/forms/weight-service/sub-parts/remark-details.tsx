import { Label } from "~/components/ui/label";
import { TextField, TextFieldTextArea } from "~/components/ui/text-field";
import type { Component } from "solid-js";

const WeightServiceFormRemarkDetails: Component<{
  setFields: (
    path: string,
    value: string | boolean,
    shouldTouch: boolean
  ) => void;
}> = () => {
  return (
    <fieldset class="border border-border/80 rounded-md p-6 w-full flex gap-4 items-start justify-start">
      {/* item remark */}
      <div class="flex-grow">
        <Label for="item_remark">Item remark</Label>
        <TextField name="item_remark">
          <TextFieldTextArea placeholder="Item remark" class="w-full" />
        </TextField>
      </div>

      {/* m remark */}
      <div class="flex-grow">
        <Label for="m_remark">M remark</Label>
        <TextField name="m_remark">
          <TextFieldTextArea placeholder="M remark" class="w-full" />
        </TextField>
      </div>
    </fieldset>
  );
};

export default WeightServiceFormRemarkDetails;
