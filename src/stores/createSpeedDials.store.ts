import { createEffect, createMemo, createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import { getGridDimensions } from '../utils'

// typeof chrome.bookmarks.BookmarkTreeNode
// {
//   "children"?: [],
//   "dateAdded": 1660892821899,
//   "dateGroupModified"?: 1660892821899,
//   "id": "33",
//   "index": 0,
//   "parentId": "32",
//   "title": "kruzkasu223 (Krushang Kasundra) · GitHub",
//   "url"?: "https://github.com/kruzkasu223"
// }

const DEFAULT_SPEED_DIALS_FOLDER_NAME = 'SPEED_DIALS_BOOKMARKS_[DO_NOT_DELETE]'
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

export const createSpeedDials = () => {
  const [defaultSpeedDialsFolder, setDefaultSpeedDialsFolder] =
    createSignal<chrome.bookmarks.BookmarkTreeNode>()
  const [speedDials, setSpeedDials] = createStore<
    chrome.bookmarks.BookmarkTreeNode[]
  >([])
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

  createEffect(() => {
    getSpeedDials()
    chromeBookmarkEventListeners()
  })

  return {
    speedDials,
    setSpeedDials,
    speedDialsLength,
    speedDialsGrid,
  }
}
