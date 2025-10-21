import { createEffect, createMemo, createSignal, onCleanup } from "solid-js"
import { createStore } from "solid-js/store"
// import { notify } from '~/components/Toast'
import { getGridDimensions } from "~/utils"
import { type Browser, browser } from "wxt/browser"

export type BookmarkDataType = Browser.bookmarks.BookmarkTreeNode

const IS_DEV = import.meta.env.MODE === "development"

const DEFAULT_SPEED_DIALS_FOLDER_NAME = IS_DEV
  ? "NICE_SPEED_DIALS_BOOKMARKS_[DO_NOT_DELETE]__DEV"
  : "NICE_SPEED_DIALS_BOOKMARKS_[DO_NOT_DELETE]"
const DEFAULT_SPEED_DIALS_PARENT_ID = "2" // refactor this OUT :trash:
const CHROME_BOOKMARK_EVENTS = [
  "onChanged",
  "onChildrenReordered",
  "onCreated",
  "onImportBegan",
  "onImportEnded",
  "onMoved",
  "onRemoved",
] as const

export const ADD_NEW_SPEED_DIALS_ITEM: BookmarkDataType = {
  id: "ADD",
  title: "Add New",
  syncing: false,
}

export const SETTINGS_SPEED_DIALS_ITEM: BookmarkDataType = {
  id: "SETTINGS",
  title: "Settings",
  syncing: false,
}

export const DEFAULT_SPEED_DIALS_ITEM: BookmarkDataType[] = [
  ADD_NEW_SPEED_DIALS_ITEM,
  SETTINGS_SPEED_DIALS_ITEM,
]

const [defaultSpeedDialsFolder, setDefaultSpeedDialsFolder] =
  createSignal<BookmarkDataType>()

const [speedDials, setSpeedDials] = createStore<BookmarkDataType[]>([
  ...DEFAULT_SPEED_DIALS_ITEM,
])

const speedDialsLength = createMemo(() => speedDials?.length || 0)
const speedDialsGrid = createMemo(() => {
  const { gridHeight: height, gridWidth: width } =
    getGridDimensions(speedDialsLength())
  return { height, width }
})

const createDefaultSpeedDialsFolder = async () => {
  await browser.bookmarks.create({
    title: DEFAULT_SPEED_DIALS_FOLDER_NAME,
    parentId: DEFAULT_SPEED_DIALS_PARENT_ID,
  })
  await getDefaultSpeedDialsFolder()
}

const getDefaultSpeedDialsFolder = async () => {
  browser.bookmarks
    .getChildren(DEFAULT_SPEED_DIALS_PARENT_ID)
    .then((children) => {
      const defaultFolder = children?.find(
        (child) => child.title === DEFAULT_SPEED_DIALS_FOLDER_NAME
      )
      setDefaultSpeedDialsFolder(defaultFolder)
    })
}

const getSpeedDials = async () => {
  const defaultFolder = defaultSpeedDialsFolder()
  if (!defaultFolder) {
    browser.bookmarks
      .getChildren(DEFAULT_SPEED_DIALS_PARENT_ID)
      .then((bookmarks) => {
        const defaultFolder = bookmarks?.find(
          (child) => child.title === DEFAULT_SPEED_DIALS_FOLDER_NAME
        )
        if (!defaultFolder) createDefaultSpeedDialsFolder()
        else getDefaultSpeedDialsFolder()
      })
  } else {
    const children = await browser.bookmarks.getChildren(defaultFolder.id)
    setSpeedDials(children.concat([...DEFAULT_SPEED_DIALS_ITEM]))
  }
}

const chromeBookmarkEventListeners = () =>
  CHROME_BOOKMARK_EVENTS.forEach((event) =>
    browser.bookmarks[event].addListener(getSpeedDials)
  )

const removeChromeBookmarkEventListeners = () =>
  CHROME_BOOKMARK_EVENTS.forEach((event) =>
    browser.bookmarks[event].removeListener(getSpeedDials)
  )

const addNewSpeedDial = async (values?: Partial<BookmarkDataType>) => {
  if (!values?.title || !values?.url) return // maybe will add validation later

  const defaultFolder = defaultSpeedDialsFolder()
  if (!defaultFolder) {
    await createDefaultSpeedDialsFolder()
  }

  await browser.bookmarks
    .create({
      parentId: defaultFolder?.id,
      title: values?.title,
      url: values?.url,
    })
    .then((bookmark) => {
      // notify().success({
      //   title: 'Success!',
      //   description: `${bookmark.title} added successfully!`,
      // })
    })
    .catch((error) => {
      // notify().error({ title: 'Error!!', description: error.message })
    })
}

const editSpeedDial = async (values?: Partial<BookmarkDataType>) => {
  if (!values?.id || !values?.title || !values?.url) return // maybe will add validation later

  await browser.bookmarks
    .update(values?.id, { title: values?.title, url: values?.url })
    .then((bookmark) => {
      // notify().success({
      //   title: 'Success!',
      //   description: `${bookmark.title} edited successfully!`,
      // })
    })
    .catch((error) => {
      // notify().error({ title: 'Error!!', description: error.message })
    })
}

const deleteSpeedDial = async (values?: Partial<BookmarkDataType>) => {
  if (!values?.id) return // maybe will add validation later

  await browser.bookmarks
    .remove(values?.id)
    .then(() => {
      // notify().success({
      //   title: 'Success!',
      //   description: 'Speed dial deleted successfully!',
      // })
    })
    .catch((error) => {
      // notify().error({ title: 'Error!!', description: error.message })
    })
}

const duplicateSpeedDial = async (values?: Partial<BookmarkDataType>) => {
  if (!values?.title || !values?.url) return // maybe will add validation later

  await browser.bookmarks
    .create({
      parentId: defaultSpeedDialsFolder()?.id,
      title: values?.title + " (copy)",
      url: values?.url,
    })
    .then((bookmark) => {
      // notify().success({
      //   title: 'Success!',
      //   description: `${bookmark.title} duplicated successfully!`,
      // })
    })
    .catch((error) => {
      // notify().error({ title: 'Error!!', description: error.message })
    })
}

const moveSpeedDial = async (
  values: Partial<BookmarkDataType>,
  newIndex: number
) => {
  if (!values?.id) return // maybe will add validation later
  if (values?.index === newIndex) return getSpeedDials()
  await browser.bookmarks
    .move(values?.id, { index: newIndex })
    .then((bookmark) => {
      // notify().success({
      //   title: 'Success!',
      //   description: `${bookmark.title} reordered successfully!`,
      // })
    })
    .catch((error) => {
      // notify().error({ title: 'Error!!', description: error.message })
    })
}

createEffect(() => {
  getSpeedDials()
  chromeBookmarkEventListeners()
  onCleanup(removeChromeBookmarkEventListeners)
})

export {
  speedDials,
  setSpeedDials,
  editSpeedDial,
  moveSpeedDial,
  speedDialsGrid,
  addNewSpeedDial,
  deleteSpeedDial,
  duplicateSpeedDial,
}
