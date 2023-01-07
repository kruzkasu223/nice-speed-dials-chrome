import { createEffect, createMemo, createSignal, onCleanup } from 'solid-js'
import { createStore } from 'solid-js/store'
import { getGridDimensions } from '../utils'
import toast from 'solid-toast'

export type BookmarkDataType = chrome.bookmarks.BookmarkTreeNode

const DEFAULT_SPEED_DIALS_FOLDER_NAME =
  'NICE_SPEED_DIALS_BOOKMARKS_[DO_NOT_DELETE]'
const DEFAULT_SPEED_DIALS_PARENT_ID = '2'
const CHROME_BOOKMARK_EVENTS = [
  'onChanged',
  'onChildrenReordered',
  'onCreated',
  'onImportBegan',
  'onImportEnded',
  'onMoved',
  'onRemoved',
] as const

const [defaultSpeedDialsFolder, setDefaultSpeedDialsFolder] =
  createSignal<chrome.bookmarks.BookmarkTreeNode>()

const [speedDials, setSpeedDials] = createStore<
  chrome.bookmarks.BookmarkTreeNode[]
>([])

export const createSpeedDials = () => {
  const speedDialsLength = createMemo(() => speedDials?.length || 0)
  const speedDialsGrid = createMemo(() => {
    const { gridHeight: height, gridWidth: width } = getGridDimensions(
      speedDialsLength() + 1
    )
    return {
      height,
      width,
    }
  })

  const createDefaultSpeedDialsFolder = async () => {
    await chrome.bookmarks.create({
      title: DEFAULT_SPEED_DIALS_FOLDER_NAME,
      parentId: DEFAULT_SPEED_DIALS_PARENT_ID,
    })
    await getDefaultSpeedDialsFolder()
  }

  const getDefaultSpeedDialsFolder = async () => {
    chrome.bookmarks
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
      chrome.bookmarks
        .getChildren(DEFAULT_SPEED_DIALS_PARENT_ID)
        .then((bookmarks) => {
          const defaultFolder = bookmarks?.find(
            (child) => child.title === DEFAULT_SPEED_DIALS_FOLDER_NAME
          )
          if (!defaultFolder) createDefaultSpeedDialsFolder()
          else getDefaultSpeedDialsFolder()
        })
    } else {
      const children = await chrome.bookmarks.getChildren(defaultFolder.id)
      setSpeedDials(children)
    }
  }

  const chromeBookmarkEventListeners = () =>
    CHROME_BOOKMARK_EVENTS.forEach((event) => {
      return chrome.bookmarks[event].addListener(getSpeedDials)
    })

  const removeChromeBookmarkEventListeners = () =>
    CHROME_BOOKMARK_EVENTS.forEach((event) => {
      return chrome.bookmarks[event].removeListener(getSpeedDials)
    })

  createEffect(() => {
    getSpeedDials()
    chromeBookmarkEventListeners()
    onCleanup(removeChromeBookmarkEventListeners)
  })

  const addNewSpeedDial = async (values?: Partial<BookmarkDataType>) => {
    if (!values?.title || !values?.url) return // maybe will add validation later

    const defaultFolder = defaultSpeedDialsFolder()
    if (!defaultFolder) {
      await createDefaultSpeedDialsFolder()
    }

    await chrome.bookmarks
      .create({
        parentId: defaultFolder?.id,
        title: values?.title,
        url: values?.url,
      })
      .then((bookmark) => {
        toast.success(`${bookmark.title} added successfully!`)
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }

  const editSpeedDial = async (values?: Partial<BookmarkDataType>) => {
    if (!values?.id || !values?.title || !values?.url) return // maybe will add validation later

    const defaultFolder = defaultSpeedDialsFolder()
    if (!defaultFolder) {
      await createDefaultSpeedDialsFolder()
    }

    await chrome.bookmarks
      .update(values?.id, {
        title: values?.title,
        url: values?.url,
      })
      .then((bookmark) => {
        toast.success(`${bookmark.title} edited successfully!`)
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }

  const deleteSpeedDial = async (id: string) => {
    await chrome.bookmarks
      .remove(id)
      .then(() => {
        toast.success('Speed dial deleted successfully!')
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }

  return {
    speedDials,
    setSpeedDials,
    speedDialsLength,
    speedDialsGrid,
    addNewSpeedDial,
    editSpeedDial,
    deleteSpeedDial,
  }
}
