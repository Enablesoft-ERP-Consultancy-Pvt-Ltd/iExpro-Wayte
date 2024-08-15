import { createForm } from "@felte/solid";

const WeightServiceForm = () => {
  const { form } = createForm({
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <form ref={form}>
      <input name="name" />
      <button type="submit">submit</button>
    </form>
  );
};
export default WeightServiceForm;
