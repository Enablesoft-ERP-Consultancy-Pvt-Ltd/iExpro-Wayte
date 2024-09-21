import LoginForm from "~/components/composables/forms/login/login-form";
import { Card } from "~/components/ui/card";

const HomeLoginPage = () => {
  return (
    <main class="flex flex-col h-screen w-screen items-center justify-start">
      <div class="w-full text-center py-14">
        <p class="text-5xl font-sans font-semibold">Wayte</p>
      </div>
      <Card class="p-8 max-w-md w-full">
        <LoginForm />
      </Card>
    </main>
  );
};

export default HomeLoginPage;
