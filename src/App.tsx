import { type Component } from 'solid-js'
import { Grid } from './components'
import { app } from './styles'
import { createPalette, extendTheme, HopeProvider } from '@hope-ui/core'
import { Toaster } from 'solid-toast'

const theme = extendTheme({
  colors: {
    dark: {
      primary: createPalette({
        50: '#fff0f4',
        100: '#fedce5',
        200: '#febed0',
        300: '#fd91b0',
        400: '#fa618c',
        500: '#f63c71',
        600: '#eb245c',
        700: '#d71d52',
        800: '#ae1e47',
        900: '#8a1e3d',
      }),
    },
  },
})

const App: Component = () => {
  return (
    <HopeProvider initialColorMode="dark" theme={theme}>
      <Toaster
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1d1618',
            color: 'var(--hope-colors-primary-200)',
            'font-size': '1.125rem',
          },
        }}
      />
      <div class={app}>
        <Grid />
      </div>
    </HopeProvider>
  )
}

export default App
