import { type Component } from 'solid-js'
import { Grid } from './components'
import { app } from './styles'
import { HopeProvider } from '@hope-ui/core'

const App: Component = () => {
  return (
    <HopeProvider initialColorMode="dark">
      <div class={app}>
        <Grid />
      </div>
    </HopeProvider>
  )
}

export default App
