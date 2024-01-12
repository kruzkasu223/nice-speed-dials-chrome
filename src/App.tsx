import { Grid } from '~/components'
import { ToastProvider } from '~/lib/ui/toast'
import classes from '~/styles/App.module.scss'

export const App = () => {
  return (
    <>
      <ToastProvider />
      <div class={classes.app}>
        <Grid />
      </div>
    </>
  )
}
