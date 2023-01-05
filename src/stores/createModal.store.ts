import { createSignal } from 'solid-js'
import { isValidUrl } from '../utils'

export type ModalType = {
  type: keyof typeof MODAL_TYPES
  title: string
  button: string
  description: string
}

export type ModalDataType = {
  id?: string
  title?: string
  url?: string
}

export const MODAL_TYPES = {
  ADD: {
    type: 'ADD',
    title: 'Create New',
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

type ModalTypes = keyof typeof MODAL_TYPES

export const isValid = (type?: ModalTypes, data?: ModalDataType) => {
  if (type === 'DELETE') {
    return !!data?.id
  } else if (type === 'EDIT') {
    return !!(data?.title && data?.url && data?.id)
  } else if (type === 'ADD') {
    return !!(data?.title && data?.url && isValidUrl(data?.url))
  }
  return false
}

const [isModalOpen, setIsModalOpen] = createSignal(false)
const [modalType, setModalType] = createSignal<ModalType>()
const [modalData, setModalData] = createSignal<ModalDataType>()

export const createModal = () => {
  const toggleModal = () => setIsModalOpen((s) => !s)

  const openModal = (type: ModalTypes) => {
    setIsModalOpen(true)
    setModalType(MODAL_TYPES[type])
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
        // deleteSpeedDial(modalData().id)
      } else if (type === 'EDIT') {
        // editSpeedDial(modalData())
      } else if (type === 'ADD') {
        // addSpeedDial(modalData())
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
