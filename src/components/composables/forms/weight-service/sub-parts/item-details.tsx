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
import type { Component } from "solid-js";
import { Checkbox } from "~/components/ui/checkbox";

const WeightServiceFormItemDetails: Component<{
  setFields: (
    path: string,
    value: string | boolean,
    shouldTouch: boolean
  ) => void;
}> = ({ setFields }) => {
  const PLACEHOLDER_CATEGORY = ["Cotton", "Wool", "Silk"];
  const PLACEHOLDER_ITEM_NAME = ["AAA", "BBB", "CCC"];
  const PLACEHOLDER_COLOR_NAME = ["Red", "Green", "Blue"];

  return (
    <fieldset class="border border-border/80 rounded-md w-fit space-y-4 p-6">
      {/* part 1 */}
      <div class="flex gap-6">
        {/* item category */}
        <div>
          <Label for="item_category">Category</Label>
          <Combobox
            name="item_category"
            onChange={(e) => setFields("item_category", e, true)}
            options={PLACEHOLDER_CATEGORY}
            placeholder="Company"
            itemComponent={(props) => (
              <ComboboxItem item={props.item}>
                <ComboboxItemLabel>{props.item.rawValue}</ComboboxItemLabel>
                <ComboboxItemIndicator />
              </ComboboxItem>
            )}
          >
            <ComboboxControl aria-label="Category">
              <ComboboxInput />
              <ComboboxTrigger />
            </ComboboxControl>
            <ComboboxContent />
          </Combobox>
        </div>

        {/* item name */}
        <div>
          <Label for="item_name">Item name</Label>
          <Combobox
            name="item_name"
            onChange={(e) => setFields("item_name", e, true)}
            options={PLACEHOLDER_ITEM_NAME}
            placeholder="Item name"
            itemComponent={(props) => (
              <ComboboxItem item={props.item}>
                <ComboboxItemLabel>{props.item.rawValue}</ComboboxItemLabel>
                <ComboboxItemIndicator />
              </ComboboxItem>
            )}
          >
            <ComboboxControl aria-label="Item name">
              <ComboboxInput />
              <ComboboxTrigger />
            </ComboboxControl>
            <ComboboxContent />
          </Combobox>
        </div>

        {/* quality name */}
        <div>
          <Label for="quality_name">Quality name</Label>
          <Combobox
            name="quality_name"
            onChange={(e) => setFields("quality_name", e, true)}
            options={PLACEHOLDER_ITEM_NAME}
            placeholder="Item name"
            itemComponent={(props) => (
              <ComboboxItem item={props.item}>
                <ComboboxItemLabel>{props.item.rawValue}</ComboboxItemLabel>
                <ComboboxItemIndicator />
              </ComboboxItem>
            )}
          >
            <ComboboxControl aria-label="Quality name">
              <ComboboxInput />
              <ComboboxTrigger />
            </ComboboxControl>
            <ComboboxContent />
          </Combobox>
        </div>

        {/* color name */}
        <div>
          <Label for="color_name">Color name</Label>
          <Combobox
            name="color_name"
            onChange={(e) => setFields("color_name", e, true)}
            options={PLACEHOLDER_COLOR_NAME}
            placeholder="Color name"
            itemComponent={(props) => (
              <ComboboxItem item={props.item}>
                <ComboboxItemLabel>{props.item.rawValue}</ComboboxItemLabel>
                <ComboboxItemIndicator />
              </ComboboxItem>
            )}
          >
            <ComboboxControl aria-label="Color name">
              <ComboboxInput />
              <ComboboxTrigger />
            </ComboboxControl>
            <ComboboxContent />
          </Combobox>
        </div>
      </div>

      {/* part 2 */}
      <div class="flex gap-6">
        {/* order number */}
        <div>
          <Label for="order_number">Order no</Label>
          <Combobox
            name="order_number"
            onChange={(e) => setFields("order_number", e, true)}
            options={PLACEHOLDER_ITEM_NAME}
            placeholder="Order number"
            itemComponent={(props) => (
              <ComboboxItem item={props.item}>
                <ComboboxItemLabel>{props.item.rawValue}</ComboboxItemLabel>
                <ComboboxItemIndicator />
              </ComboboxItem>
            )}
          >
            <ComboboxControl aria-label="Order number">
              <ComboboxInput />
              <ComboboxTrigger />
            </ComboboxControl>
            <ComboboxContent />
          </Combobox>
        </div>

        {/* godown number */}
        <div>
          <Label for="godown_number">Godown no</Label>
          <Combobox
            name="godown_number"
            onChange={(e) => setFields("godown_number", e, true)}
            options={PLACEHOLDER_ITEM_NAME}
            placeholder="Godown number"
            itemComponent={(props) => (
              <ComboboxItem item={props.item}>
                <ComboboxItemLabel>{props.item.rawValue}</ComboboxItemLabel>
                <ComboboxItemIndicator />
              </ComboboxItem>
            )}
          >
            <ComboboxControl aria-label="Godown number">
              <ComboboxInput />
              <ComboboxTrigger />
            </ComboboxControl>
            <ComboboxContent />
          </Combobox>
        </div>

        {/* bin number */}
        <div>
          <Label for="bin_number">Bin no</Label>
          <Combobox
            name="bin_number"
            onChange={(e) => setFields("bin_number", e, true)}
            options={PLACEHOLDER_ITEM_NAME}
            placeholder="Bin number"
            itemComponent={(props) => (
              <ComboboxItem item={props.item}>
                <ComboboxItemLabel>{props.item.rawValue}</ComboboxItemLabel>
                <ComboboxItemIndicator />
              </ComboboxItem>
            )}
          >
            <ComboboxControl aria-label="Bin number">
              <ComboboxInput />
              <ComboboxTrigger />
            </ComboboxControl>
            <ComboboxContent />
          </Combobox>
        </div>

        {/* iss lot number */}
        <div>
          <Label for="iss_lot_number">Iss lot no</Label>
          <Combobox
            name="iss_lot_number"
            onChange={(e) => setFields("iss_lot_number", e, true)}
            options={PLACEHOLDER_ITEM_NAME}
            placeholder="Iss lot no"
            itemComponent={(props) => (
              <ComboboxItem item={props.item}>
                <ComboboxItemLabel>{props.item.rawValue}</ComboboxItemLabel>
                <ComboboxItemIndicator />
              </ComboboxItem>
            )}
          >
            <ComboboxControl aria-label="Iss lot no">
              <ComboboxInput />
              <ComboboxTrigger />
            </ComboboxControl>
            <ComboboxContent />
          </Combobox>
        </div>
      </div>

      {/* part 3 */}
      <div class="flex gap-6">
        {/* rec lot no */}
        <div>
          <Label for="rec_lot_number">Rec lot no</Label>
          <TextField name="rec_lot_number">
            <TextFieldInput type="text" placeholder="Rec lot no" />
          </TextField>
        </div>

        {/* Bale no */}
        <div>
          <Label for="bale_number">Bale no</Label>
          <TextField name="bale_number">
            <TextFieldInput type="text" placeholder="Bale no" />
          </TextField>
        </div>

        {/* unit */}
        <div>
          <Label for="unit">Unit</Label>
          <Combobox
            name="unit"
            onChange={(e) => setFields("unit", e, true)}
            options={PLACEHOLDER_ITEM_NAME}
            placeholder="Unit"
            itemComponent={(props) => (
              <ComboboxItem item={props.item}>
                <ComboboxItemLabel>{props.item.rawValue}</ComboboxItemLabel>
                <ComboboxItemIndicator />
              </ComboboxItem>
            )}
          >
            <ComboboxControl aria-label="Unit">
              <ComboboxInput />
              <ComboboxTrigger />
            </ComboboxControl>
            <ComboboxContent />
          </Combobox>
        </div>

        {/* for old lot no */}
        <div class="items-top flex space-x-2 items-end pb-3">
          <Checkbox
            name="for_old_lot_number"
            onChange={(e) => setFields("for_old_lot_number", e, false)}
          />
          <div class="grid gap-1.5 leading-none">
            <Label for="for_old_lot_number">For old lot number</Label>
          </div>
        </div>
      </div>
    </fieldset>
  );
};

export default WeightServiceFormItemDetails;
