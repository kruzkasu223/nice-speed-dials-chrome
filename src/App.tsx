import {
  Grid,
  // ToastProvider
} from '~/components'
import classes from '~/styles/App.module.scss'

export const App = () => {
  return (
    <>
      {/* <ToastProvider /> */}
      <div class={classes.app}>
        <Grid />
      </div>
    </>
  )
}
