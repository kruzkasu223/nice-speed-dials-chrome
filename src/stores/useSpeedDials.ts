import { createEffect, createMemo, createSignal, onCleanup } from "solid-js"
import { createStore } from "solid-js/store"
// import { notify } from '~/components/Toast'
import { getGridDimensions } from "~/utils"
import { type Browser, browser } from "wxt/browser"

export type BookmarkDataType = Browser.bookmarks.BookmarkTreeNode

const IS_DEV = import.meta.env.MODE === "development"

const DEFAULT_SPEED_DIALS_FOLDER_NAME = IS_DEV
  ? "NICE_SPEED_DIALS_BOOKMARKS_[DO_NOT_DELETE]_DEV"
  : "NICE_SPEED_DIALS_BOOKMARKS_[DO_NOT_DELETE]"
const BOOKMARK_EVENTS = [
  "onChanged",
  "onCreated",
  "onMoved",
  "onRemoved",
  ...(import.meta.env.BROWSER !== "firefox"
    ? (["onChildrenReordered", "onImportBegan", "onImportEnded"] as const)
    : ([] as const)),
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

const [defaultSpeedDialsFolder, setDefaultSpeedDialsFolder] =
  createSignal<BookmarkDataType>()

const [speedDials, setSpeedDials] = createStore<BookmarkDataType[]>([])

const speedDialsGrid = createMemo(() => {
  const { gridHeight: height, gridWidth: width } = getGridDimensions(
    speedDials?.length || 0
  )
  return { height, width }
})

const createDefaultSpeedDialsFolder = async () => {
  const created = await browser.bookmarks.create({
    title: DEFAULT_SPEED_DIALS_FOLDER_NAME,
  })
  setDefaultSpeedDialsFolder(created)
  return created
}

const getDefaultSpeedDialsFolder = async () => {
  if (defaultSpeedDialsFolder()) return defaultSpeedDialsFolder()!

  const results = await browser.bookmarks.search({
    title: DEFAULT_SPEED_DIALS_FOLDER_NAME,
  })

  if (results && results.length > 0) {
    // Find the folder (bookmark without URL property)
    const defaultFolder = results.find((bookmark) => !bookmark.url)
    if (defaultFolder) {
      setDefaultSpeedDialsFolder(defaultFolder)
      return defaultFolder
    }
  }

  // If not found, create it
  return await createDefaultSpeedDialsFolder()
}

const getSpeedDials = async () => {
  let defaultFolder = defaultSpeedDialsFolder()

  if (!defaultFolder) {
    // Try to find or create the folder using search
    defaultFolder = await getDefaultSpeedDialsFolder()
  } else {
    // Verify the folder still exists
    try {
      const [verification] = await browser.bookmarks.get(defaultFolder.id)
      if (!verification) {
        // Folder was deleted, search for it again or create new one
        defaultFolder = await getDefaultSpeedDialsFolder()
      }
    } catch (error) {
      // Folder might have been deleted, search for it again or create new one
      defaultFolder = await getDefaultSpeedDialsFolder()
    }
  }

  if (defaultFolder) {
    const children = await browser.bookmarks.getChildren(defaultFolder.id)
    setSpeedDials(children)
  }
}

const bookmarkEventListeners = () =>
  BOOKMARK_EVENTS.forEach((event) =>
    browser.bookmarks[event].addListener(getSpeedDials)
  )

const removeBookmarkEventListeners = () =>
  BOOKMARK_EVENTS.forEach((event) =>
    browser.bookmarks[event].removeListener(getSpeedDials)
  )

const addNewSpeedDial = async (values?: Partial<BookmarkDataType>) => {
  if (!values?.title || !values?.url) return // maybe will add validation later

  const defaultFolder = await getDefaultSpeedDialsFolder()

  await browser.bookmarks
    .create({
      parentId: defaultFolder.id,
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

  const defaultFolder = await getDefaultSpeedDialsFolder()

  await browser.bookmarks
    .create({
      parentId: defaultFolder.id,
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
  bookmarkEventListeners()
  onCleanup(removeBookmarkEventListeners)
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
