import { Label } from "~/components/ui/label";
import { TextField, TextFieldInput } from "~/components/ui/text-field";
import type { Component } from "solid-js";

const WeightServicePhysicalDetails: Component<{
  setFields: (
    path: string,
    value: string | boolean,
    shouldTouch: boolean
  ) => void;
}> = () => {
  return (
    <fieldset class="border border-border/80 rounded-md w-full p-6 gap-4 grid grid-cols-fields-col items-start justify-start">
      {/* order qty */}
      <div>
        <Label for="order_quantity">Order Qty</Label>
        <TextField name="order_quantity">
          <TextFieldInput type="text" placeholder="Order Qty" />
        </TextField>
      </div>

      {/* pending qty */}
      <div>
        <Label for="pending_quantity">Pending Qty</Label>
        <TextField name="pending_quantity">
          <TextFieldInput type="text" placeholder="Pending Qty" />
        </TextField>
      </div>

      {/* recieve qty */}
      <div>
        <Label for="recieve_quantity">Recieve Qty</Label>
        <TextField name="recieve_quantity">
          <TextFieldInput type="text" placeholder="Recieve Qty" />
        </TextField>
      </div>

      {/* return qty */}
      <div>
        <Label for="return_quantity">Return Qty</Label>
        <TextField name="return_quantity">
          <TextFieldInput type="text" placeholder="Return Qty" />
        </TextField>
      </div>
      {/* bell weight */}
      <div>
        <Label for="bell_weight">Bell weight</Label>
        <TextField name="bell_weight">
          <TextFieldInput type="text" placeholder="Bell weight" />
        </TextField>
      </div>

      {/* rate */}
      <div>
        <Label for="rate">Rate</Label>
        <TextField name="rate">
          <TextFieldInput type="text" placeholder="Rate" />
        </TextField>
      </div>

      {/* moisture */}
      <div>
        <Label for="moisture">Moisture</Label>
        <TextField name="moisture">
          <TextFieldInput type="text" placeholder="Moisture" />
        </TextField>
      </div>
      {/* amount */}
      <div>
        <Label for="amount">Amount</Label>
        <TextField name="amount">
          <TextFieldInput type="text" placeholder="Amount" />
        </TextField>
      </div>

      {/* SGST */}
      <div>
        <Label for="sgst_percentage">SGST%</Label>
        <TextField name="sgst_percentage">
          <TextFieldInput type="text" placeholder="SGST %" />
        </TextField>
      </div>

      {/* IGST */}
      <div>
        <Label for="igst_percentage">IGST%</Label>
        <TextField name="igst_percentage">
          <TextFieldInput type="text" placeholder="IGST %" />
        </TextField>
      </div>

      {/* penalty */}
      <div>
        <Label for="penalty">Penalty</Label>
        <TextField name="penalty">
          <TextFieldInput type="text" placeholder="Penalty" />
        </TextField>
      </div>

      {/* net amount */}
      <div>
        <Label for="net_amount">Net amount</Label>
        <TextField name="net_amount">
          <TextFieldInput type="text" placeholder="Net amount" />
        </TextField>
      </div>
    </fieldset>
  );
};

export default WeightServicePhysicalDetails;
