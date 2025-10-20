import { defineConfig } from "@pandacss/dev"
import { createPreset } from "@park-ui/panda-preset"
import ruby from "@park-ui/panda-preset/colors/ruby"
import mauve from "@park-ui/panda-preset/colors/mauve"
import amber from "@park-ui/panda-preset/colors/amber"
import blue from "@park-ui/panda-preset/colors/blue"
import bronze from "@park-ui/panda-preset/colors/bronze"
import brown from "@park-ui/panda-preset/colors/brown"
import crimson from "@park-ui/panda-preset/colors/crimson"
import cyan from "@park-ui/panda-preset/colors/cyan"
import gold from "@park-ui/panda-preset/colors/gold"
import grass from "@park-ui/panda-preset/colors/grass"
import green from "@park-ui/panda-preset/colors/green"
import indigo from "@park-ui/panda-preset/colors/indigo"
import iris from "@park-ui/panda-preset/colors/iris"
import jade from "@park-ui/panda-preset/colors/jade"
import lime from "@park-ui/panda-preset/colors/lime"
import mint from "@park-ui/panda-preset/colors/mint"
import neutral from "@park-ui/panda-preset/colors/neutral"
import olive from "@park-ui/panda-preset/colors/olive"
import orange from "@park-ui/panda-preset/colors/orange"
import pink from "@park-ui/panda-preset/colors/pink"
import plum from "@park-ui/panda-preset/colors/plum"
import purple from "@park-ui/panda-preset/colors/purple"
import red from "@park-ui/panda-preset/colors/red"
import sage from "@park-ui/panda-preset/colors/sage"
import sand from "@park-ui/panda-preset/colors/sand"
import sky from "@park-ui/panda-preset/colors/sky"
import slate from "@park-ui/panda-preset/colors/slate"
import teal from "@park-ui/panda-preset/colors/teal"
import tomato from "@park-ui/panda-preset/colors/tomato"
import violet from "@park-ui/panda-preset/colors/violet"
import yellow from "@park-ui/panda-preset/colors/yellow"

export default defineConfig({
  preflight: true,
  presets: [
    "@pandacss/preset-base",
    createPreset({ accentColor: ruby, grayColor: mauve, radius: "lg" }),
  ],
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  theme: {
    extend: {
      tokens: {
        colors: {
          amber: amber.tokens,
          blue: blue.tokens,
          bronze: bronze.tokens,
          brown: brown.tokens,
          crimson: crimson.tokens,
          cyan: cyan.tokens,
          gold: gold.tokens,
          grass: grass.tokens,
          green: green.tokens,
          indigo: indigo.tokens,
          iris: iris.tokens,
          jade: jade.tokens,
          lime: lime.tokens,
          mauve: mauve.tokens,
          mint: mint.tokens,
          neutral: neutral.tokens,
          olive: olive.tokens,
          orange: orange.tokens,
          pink: pink.tokens,
          plum: plum.tokens,
          purple: purple.tokens,
          red: red.tokens,
          ruby: ruby.tokens,
          sage: sage.tokens,
          sand: sand.tokens,
          sky: sky.tokens,
          slate: slate.tokens,
          teal: teal.tokens,
          tomato: tomato.tokens,
          violet: violet.tokens,
          yellow: yellow.tokens,
        },
      },
      semanticTokens: {
        colors: {
          amber: amber.semanticTokens,
          blue: blue.semanticTokens,
          bronze: bronze.semanticTokens,
          brown: brown.semanticTokens,
          crimson: crimson.semanticTokens,
          cyan: cyan.semanticTokens,
          gold: gold.semanticTokens,
          grass: grass.semanticTokens,
          green: green.semanticTokens,
          indigo: indigo.semanticTokens,
          iris: iris.semanticTokens,
          jade: jade.semanticTokens,
          lime: lime.semanticTokens,
          mauve: mauve.semanticTokens,
          mint: mint.semanticTokens,
          neutral: neutral.semanticTokens,
          olive: olive.semanticTokens,
          orange: orange.semanticTokens,
          pink: pink.semanticTokens,
          plum: plum.semanticTokens,
          purple: purple.semanticTokens,
          red: red.semanticTokens,
          ruby: ruby.semanticTokens,
          sage: sage.semanticTokens,
          sand: sand.semanticTokens,
          sky: sky.semanticTokens,
          slate: slate.semanticTokens,
          teal: teal.semanticTokens,
          tomato: tomato.semanticTokens,
          violet: violet.semanticTokens,
          yellow: yellow.semanticTokens,
        },
      },
    },
  },
  jsxFramework: "solid",
  outdir: "styled-system",
})
