/// <reference types="vite/client" />

type ImportMetaEnvAugmented =
  import("@julr/vite-plugin-validate-env").ImportMetaEnvAugmented<
    typeof import("../src/lib/env").default
  >;

interface ImportMetaEnv extends ImportMetaEnvAugmented {}
