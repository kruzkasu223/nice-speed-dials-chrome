import {
  Grid,
  // ToastProvider
} from "~/components"
import classes from "~/styles/App.module.scss"
import { createEffect, onMount } from "solid-js"
import {
  darkMode,
  DEFAULT_VALUES,
  mainBackgroundColor,
  mainBackgroundImage,
} from "~/stores"
import { createSignal } from "solid-js"

export const App = () => {
  const [isDarkMode, setIsDarkMode] = createSignal(false)
  const [bgColor, setBgColor] = createSignal<string | undefined>(undefined)
  const [bgImage, setBgImage] = createSignal<string | undefined>(undefined)

  onMount(async () => {
    setIsDarkMode(await darkMode.getValue())
    setBgColor((await mainBackgroundColor.getValue()) || undefined)
    setBgImage((await mainBackgroundImage.getValue()) || undefined)

    // Watch for changes
    darkMode.watch(setIsDarkMode)
    mainBackgroundColor.watch(setBgColor)
    mainBackgroundImage.watch(setBgImage)
  })

  // Apply dark mode
  createEffect(() => {
    if (isDarkMode()) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  })

  // Apply background
  createEffect(() => {
    const bgImg = bgImage()
    const bgCol = bgColor()

    const bg = bgImg
      ? `url(${bgImg})`
      : bgCol
        ? bgCol
        : DEFAULT_VALUES.mainBackgroundColor
    const bgSize = bgImg ? "cover" : "auto"
    const bgPosition = bgImg ? "center" : "auto"

    document.documentElement.style.setProperty("--app-background", bg)
    document.documentElement.style.setProperty("--app-background-size", bgSize)
    document.documentElement.style.setProperty(
      "--app-background-position",
      bgPosition
    )
  })

  return (
    <>
      {/* <ToastProvider /> */}
      <div class={classes.app}>
        <Grid />
      </div>
    </>
  )
}
