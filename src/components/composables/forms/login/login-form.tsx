import { createForm } from "@felte/solid";
import type { z } from "zod";
import { validator } from "@felte/validator-zod";
import { ZLoginFormSchema } from "~/lib/schemas";
import { TextField, TextFieldInput } from "~/components/ui/text-field";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { useNavigate } from "@solidjs/router";

const LoginForm = () => {
  const navigate = useNavigate();
  const { form, errors, isSubmitting } = createForm<
    z.infer<typeof ZLoginFormSchema>
  >({
    onSubmit: (values) => {
      console.log(values);
      navigate("/protected/weight-service", { replace: true });
    },
    extend: validator({ schema: ZLoginFormSchema }),
  });

  return (
    <form ref={form} class="flex flex-col gap-1">
      <div>
        <Label for="username">Username</Label>
        <TextField name="username">
          <TextFieldInput type="text" placeholder="username" />
        </TextField>
        <Label for="username" class="text-red-500 text-xs px-2">
          {errors().username}
        </Label>
      </div>

      <div>
        <Label for="password">Password</Label>
        <TextField name="password">
          <TextFieldInput type="text" placeholder="password" />
        </TextField>
        <Label for="password" class="text-red-500 text-xs px-2">
          {errors().password}
        </Label>
      </div>

      <Button disabled={isSubmitting()} type="submit" class="mt-5">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
