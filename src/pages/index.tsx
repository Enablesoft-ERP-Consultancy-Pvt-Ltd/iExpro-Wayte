import { A } from "@solidjs/router";

const HomeLoginPage = () => {
  return (
    <div>
      login page
      <A href="/protected/weight-service">dashboard</A>
    </div>
  );
};

export default HomeLoginPage;
