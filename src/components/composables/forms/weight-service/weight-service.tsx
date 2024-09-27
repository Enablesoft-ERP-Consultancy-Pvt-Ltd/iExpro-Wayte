import { createForm } from "@felte/solid";
import DatePicker from "~/components/ui/date-picker";
import {
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxItemLabel,
  Combobox,
  ComboboxTrigger,
  ComboboxSection,
} from "~/components/ui/combobox";
import { Label } from "~/components/ui/label";
import {
  TextField,
  TextFieldInput,
  TextFieldTextArea,
} from "~/components/ui/text-field";
import { createSignal, onCleanup, onMount } from "solid-js";
import { invoke } from "@tauri-apps/api";
import { listen, emit, type UnlistenFn } from "@tauri-apps/api/event";
import { isBrowser, parseFloatFromRawWeight } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import useAppSettingsStore from "~/components/state/stores/app-settings";
import { showToast } from "~/components/ui/toast";
import { Checkbox } from "~/components/ui/checkbox";
import { fetch, Body } from "@tauri-apps/api/http";

interface CompanyType {
  value: number;
  label: string;
}
interface Category {
  label: string;
  options: CompanyType[];
}
const PLACEHOLDER_COMPANY: Category[] = [
  {
    label: "Company",
    options: [
      { value: 1, label: "Apple" },
      { value: 2, label: "Banana" },
      { value: 3, label: "Blueberry" },
      { value: 4, label: "Grapes" },
      { value: 5, label: "Pineapple" },
    ],
  },
];

const PLACEHOLDER_VENDOR = ["Delhi", "AP", "UP", "Pune"];

const PLACEHOLDER_ORDER_NUMBER: Category[] = [
  {
    label: "Values",
    options: [
      { value: 1, label: "ABC1" },
      { value: 2, label: "XYZ2" },
      { value: 3, label: "PQR3" },
      { value: 4, label: "LMN4" },
      { value: 5, label: "Pineapple" },
    ],
  },
];

const PLACEHOLDER_CATEGORY = ["Cotton", "Wool", "Silk"];
const PLACEHOLDER_ITEM_NAME = ["AAA", "BBB", "CCC"];
const PLACEHOLDER_COLOR_NAME = ["Red", "Green", "Blue"];

const WeightServiceForm = () => {
  const appSettings = useAppSettingsStore();
  const { form, setFields } = createForm(
    // z.infer<typeof ZWeightFormSchema>
    {
      // extend: validator({ schema: ZWeightFormSchema }),
      onSubmit: async (v, c) => {
        try {
          const new_v: Record<string, unknown> = {};
          console.log("original form body:", v);

          for (const l of Object.entries(v)) {
            if (typeof l[1] === "string" && l[1].trim().length === 0) {
              new_v[l[0]] = null;
              continue;
            }
            new_v[l[0]] = l[1];
          }
          console.log("temp body ", new_v);
          const body = Body.json({
            // ...new_v,
            rate: new_v.rate,
            bellweight: new_v.bellweight,
            balenumber: new_v.bale_number,
            quantityreturn: new_v.return_quantity,
            netamount: new_v.amount,
            remark: new_v.item_remark,
            penalty: new_v.penalty,
            stategoodandservicetax: new_v.sgst_percentage,
            integratedgoodsandservicestax: new_v.igst_percentage,
            binnumber: new_v.bin_number,
            vendorlotnumber: new_v.VendorLotNumber,
          });
          console.log("final payload:", body.payload);
          const res = await fetch(
            `${import.meta.env.VITE_BACKEND_BASE_URL}/record/create`,
            {
              method: "POST",
              timeout: 30,
              body,
            }
          );
          console.log(res);
          c.reset();
          showToast({
            title: "Added",
            description: "Successfully added new record in the database.",
            variant: "success",
            duration: 1500,
          });
        } catch (e) {
          console.error(e);
          showToast({
            title: "Failed",
            description: `Failed due to: ${e}`,
            variant: "error",
            duration: 3000,
          });
        }
      },
    }
  );

  const [unlisten, setUnlisten] = createSignal<UnlistenFn | null>(null);

  onMount(async () => {
    if (isBrowser()) {
      return;
    }
    invoke("emit_weight_on_port", {
      port: appSettings().weight_service_settings.port,
      baudRate: appSettings().weight_service_settings.baud_rate,
    })
      .then(() => {
        console.log("hooked to weight machine.");
      })
      .catch((e) => {
        console.error(e);
        showToast({
          title: "Failed to connect",
          description: "Failed to connect to the weighing machine.",
          variant: "error",
          duration: 2000,
        });
      });

    const unlisten = await listen("weight-read", (event) => {
      const w = event.payload as string;
      const parsedFloat = parseFloatFromRawWeight(w);
      setFields("bellweight", parsedFloat, true);
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
      <fieldset class="border border-border/80 rounded-md w-full p-6 gap-4 grid grid-cols-fields-col items-start justify-start">
        {/* Company name */}
        <div>
          <Label for="CompanyId">Company name</Label>
          <Combobox<CompanyType, Category>
            name="CompanyId"
            onChange={(e) => setFields("CompanyId", e?.value || 0, true)}
            options={PLACEHOLDER_COMPANY}
            optionValue="value"
            optionTextValue="label"
            optionLabel="label"
            optionGroupChildren="options"
            placeholder="Company"
            itemComponent={(props) => (
              <ComboboxItem item={props.item}>
                <ComboboxItemLabel>
                  {props.item.rawValue.label}
                </ComboboxItemLabel>
                <ComboboxItemIndicator />
              </ComboboxItem>
            )}
            sectionComponent={(props) => (
              <ComboboxSection>{props.section.rawValue.label}</ComboboxSection>
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
          <Label for="VendorLotNumber">Vendor name</Label>
          <Combobox
            name="VendorLotNumber"
            onChange={(e) => setFields("VendorLotNumber", e, true)}
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
          <Label for="OrderID">Order no</Label>
          <Combobox<CompanyType, Category>
            name="OrderID"
            onChange={(e) => setFields("OrderID", e?.value || 0, true)}
            options={PLACEHOLDER_ORDER_NUMBER}
            optionValue="value"
            optionTextValue="label"
            optionLabel="label"
            optionGroupChildren="options"
            placeholder="Order no"
            itemComponent={(props) => (
              <ComboboxItem item={props.item}>
                <ComboboxItemLabel>
                  {props.item.rawValue.label}
                </ComboboxItemLabel>
                <ComboboxItemIndicator />
              </ComboboxItem>
            )}
            sectionComponent={(props) => (
              <ComboboxSection>{props.section.rawValue.label}</ComboboxSection>
            )}
          >
            <ComboboxControl aria-label="Order number">
              <ComboboxInput />
              <ComboboxTrigger />
            </ComboboxControl>
            <ComboboxContent />
          </Combobox>
        </div>
        Order
        {/*  recieve date */}
        <div>
          <Label for="RecieveDate">Recieve date</Label>
          <DatePicker
            onChange={(v) => setFields("RecieveDate", v, true)}
            name="RecieveDate"
          />
        </div>
        {/* item code */}
        <div>
          <Label for="item_code">Item code</Label>
          <TextField name="Item">
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
            onChange={(v) => setFields("ReturnDate", v, true)}
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
      <fieldset class="border border-border/80 rounded-md w-full p-6 gap-4 grid grid-cols-fields-col items-center justify-center">
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
            onChange={(e) => setFields("BaleNumber", e, true)}
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
            onChange={(e) => setFields("Quantity", e, true)}
            options={PLACEHOLDER_ORDER_NUMBER}
            placeholder="Item name"
            itemComponent={(props) => (
              <ComboboxItem item={props.item}>
                <ComboboxItemLabel>
                  {props.item.rawValue.label}
                </ComboboxItemLabel>
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
        <div class="flex gap-2 h-full items-center">
          <Checkbox
            name="for_old_lot_number"
            onChange={(e) => setFields("for_old_lot_number", e, false)}
          />
          <div class="grid gap-1.5 leading-none">
            <Label for="for_old_lot_number">For old lot number</Label>
          </div>
        </div>
      </fieldset>

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
          <Label for="bellweight">Bell weight</Label>
          <TextField name="bellweight">
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

      <div class="w-full flex justify-end px-6">
        <Button type="submit">submit</Button>
      </div>
    </form>
  );
};
export default WeightServiceForm;
