import type { Component } from "solid-js";
import { TextFieldInput } from "~/components/ui/text-field";
import { TextField } from "@kobalte/core/text-field";

const DatePicker: Component<{
  onChange?: (v: string) => void;
  name: string;
}> = ({ onChange: oC, name }) => {
  return (
    <TextField onChange={oC} name={name}>
      <TextFieldInput type="date" />
      <TextField.ErrorMessage />
    </TextField>
  );
};

export default DatePicker;
