import { defineConfig } from "@pandacss/dev"
import { createPreset } from "@park-ui/panda-preset"
import ruby from "@park-ui/panda-preset/colors/ruby"
import mauve from "@park-ui/panda-preset/colors/mauve"

export default defineConfig({
  preflight: true,
  presets: [
    "@pandacss/preset-base",
    createPreset({ accentColor: ruby, grayColor: mauve, radius: "lg" }),
  ],
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  theme: { extend: {} },
  jsxFramework: "solid",
  outdir: "styled-system",
})
