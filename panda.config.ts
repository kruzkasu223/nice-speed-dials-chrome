import { defineConfig } from '@pandacss/dev'
import { createPreset } from '@park-ui/panda-preset'

export default defineConfig({
  preflight: true,
  presets: [
    '@pandacss/preset-base',
    createPreset({
      accentColor: 'ruby',
      grayColor: 'mauve',
      additionalColors: ['*'],
    }),
  ],
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  theme: { extend: {} },
  jsxFramework: 'solid',
  outdir: 'styled-system',
})
