import type { Component } from 'solid-js'
import { Grid } from './components'
import { app } from './styles'

const App: Component = () => {
  return (
    <div class={app}>
      <Grid />
    </div>
  )
}

export default App
