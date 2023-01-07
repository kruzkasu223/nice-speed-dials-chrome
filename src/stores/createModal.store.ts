import { createSignal } from 'solid-js'
import { isUrlValid } from '../utils'
import { BookmarkDataType, createSpeedDials } from './createSpeedDials.store'

export type ModalType = {
  type: keyof typeof MODAL_TYPES
  title: string
  button: string
  description: string
}

export type ModalDataType = Partial<BookmarkDataType>

export const MODAL_TYPES = {
  ADD: {
    type: 'ADD',
    title: 'Create',
    button: 'Create',
    description: 'Create a new speed dial',
  },
  EDIT: {
    type: 'EDIT',
    title: 'Edit',
    button: 'Save',
    description: 'Edit the speed dial',
  },
  DELETE: {
    type: 'DELETE',
    title: 'Delete',
    button: 'Delete',
    description: 'Are you sure you want to delete?',
  },
} as const

export type ModalTypes = keyof typeof MODAL_TYPES

export const isValid = (type?: ModalTypes, data?: ModalDataType) => {
  if (type === 'DELETE') {
    return !!data?.id
  } else if (type === 'EDIT') {
    return !!(data?.id && data?.title && data?.url && isUrlValid(data?.url))
  } else if (type === 'ADD') {
    return !!(data?.title && data?.url && isUrlValid(data?.url))
  }
  return false
}

const [isModalOpen, setIsModalOpen] = createSignal(false)
const [modalType, setModalType] = createSignal<ModalType>()
const [modalData, setModalData] = createSignal<ModalDataType>()

export const createModal = () => {
  const { addNewSpeedDial, editSpeedDial, deleteSpeedDial } = createSpeedDials()

  const toggleModal = () => setIsModalOpen((s) => !s)

  const openModal = (type: ModalTypes, data?: BookmarkDataType) => {
    setIsModalOpen(true)
    setModalType(MODAL_TYPES[type])
    if (data) setModalData(data)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalData()
  }

  const handleModalDataChange = (e: Event) => {
    const { name, value = '' } = e.target as HTMLInputElement
    setModalData((s) => ({ ...s, [name]: value }))
  }

  const handleModalOnSubmit = () => {
    const type = modalType()?.type
    if (type && isValid(type, modalData())) {
      if (type === 'DELETE') {
        deleteSpeedDial(modalData())
      } else if (type === 'EDIT') {
        editSpeedDial(modalData())
      } else if (type === 'ADD') {
        addNewSpeedDial(modalData())
      }
    }

    closeModal()
  }

  return {
    modalType,
    modalData,
    openModal,
    closeModal,
    isModalOpen,
    toggleModal,
    handleModalOnSubmit,
    handleModalDataChange,
  }
}
