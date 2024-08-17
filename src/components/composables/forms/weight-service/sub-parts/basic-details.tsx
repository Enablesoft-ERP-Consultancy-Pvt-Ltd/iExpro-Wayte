import DatePicker from "~/components/ui/date-picker";
import type { Component } from "solid-js";
import {
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxItemLabel,
  Combobox,
  ComboboxTrigger,
} from "~/components/ui/combobox";
import { Label } from "~/components/ui/label";
import { TextField, TextFieldInput } from "~/components/ui/text-field";

const WeightServiceFormBasicDetails: Component<{
  setFields: (path: string, value: string, shouldTouch: boolean) => void;
}> = ({ setFields }) => {
  const PLACEHOLDER_COMPANY = ["Apple", "Linux", "Asus", "Torvalds"];
  const PLACEHOLDER_VENDOR = ["Delhi", "AP", "UP", "Pune"];
  const PLACEHOLDER_ORDER_NUMBER = ["ABC1", "XYZ2", "PQR3", "LMN4"];

  return (
    <fieldset class="border border-border/80 rounded-md w-full p-6 gap-4 grid grid-cols-fields-col items-start justify-start">
      {/* Company name */}
      <div>
        <Label for="company_name">Company name</Label>
        <Combobox
          name="company_name"
          onChange={(e) => setFields("company_name", e, true)}
          options={PLACEHOLDER_COMPANY}
          placeholder="Company"
          itemComponent={(props) => (
            <ComboboxItem item={props.item}>
              <ComboboxItemLabel>{props.item.rawValue}</ComboboxItemLabel>
              <ComboboxItemIndicator />
            </ComboboxItem>
          )}
        >
          <ComboboxControl aria-label="Company">
            <ComboboxInput />
            <ComboboxTrigger />
          </ComboboxControl>
          <ComboboxContent />
        </Combobox>
      </div>

      {/* Vendor name */}
      <div>
        <Label for="vendor_name">Vendor name</Label>
        <Combobox
          name="vendor_name"
          onChange={(e) => setFields("vendor_name", e, true)}
          options={PLACEHOLDER_VENDOR}
          placeholder="Vendor"
          itemComponent={(props) => (
            <ComboboxItem item={props.item}>
              <ComboboxItemLabel>{props.item.rawValue}</ComboboxItemLabel>
              <ComboboxItemIndicator />
            </ComboboxItem>
          )}
        >
          <ComboboxControl aria-label="Vendor">
            <ComboboxInput />
            <ComboboxTrigger />
          </ComboboxControl>
          <ComboboxContent />
        </Combobox>
      </div>

      {/* Order no */}
      <div>
        <Label for="order_number">Order no</Label>
        <Combobox
          name="order_number"
          onChange={(e) => setFields("order_number", e, true)}
          options={PLACEHOLDER_ORDER_NUMBER}
          placeholder="Order no"
          itemComponent={(props) => (
            <ComboboxItem item={props.item}>
              <ComboboxItemLabel>{props.item.rawValue}</ComboboxItemLabel>
              <ComboboxItemIndicator />
            </ComboboxItem>
          )}
        >
          <ComboboxControl aria-label="Order no">
            <ComboboxInput />
            <ComboboxTrigger />
          </ComboboxControl>
          <ComboboxContent />
        </Combobox>
      </div>

      {/*  recieve date */}
      <div>
        <Label for="recieve_date">Recieve date</Label>
        <DatePicker
          onChange={(v) => setFields("recieve_date", v, true)}
          name="recieve_date"
        />
      </div>

      {/* item code */}
      <div>
        <Label for="item_code">Item code</Label>
        <TextField name="item_code">
          <TextFieldInput type="text" placeholder="Item code" />
        </TextField>
      </div>

      {/* gate in no */}
      <div>
        <Label for="gate_in_number">Gate in no</Label>
        <TextField name="gate_in_number">
          <TextFieldInput type="text" placeholder="Gate in" />
        </TextField>
      </div>

      {/* challan number */}
      <div>
        <Label for="challan_number">Challan no</Label>
        <TextField name="challan_number">
          <TextFieldInput type="text" placeholder="Challan" />
        </TextField>
      </div>

      {/* bill no */}
      <div>
        <Label for="bill_number">Bill no</Label>
        <TextField name="bill_number">
          <TextFieldInput type="text" placeholder="Bill no" />
        </TextField>
      </div>

      {/*  return date */}
      <div>
        <Label for="return_qty_date">Return Qty date</Label>
        <DatePicker
          onChange={(v) => setFields("return_qty_date", v, true)}
          name="return_qty_date"
        />
      </div>

      {/* freight charges */}
      <div>
        <Label for="freight_charges">Freight charges</Label>
        <TextField name="freight_charges">
          <TextFieldInput type="text" placeholder="Freight charges" />
        </TextField>
      </div>
    </fieldset>
  );
};

export default WeightServiceFormBasicDetails;
