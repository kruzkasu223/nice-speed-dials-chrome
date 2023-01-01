import { createSignal } from 'solid-js'

const [isModalOpen, setIsModalOpen] = createSignal(false)
const toggleModal = () => setIsModalOpen((s) => !s)
const [modalData, setModalData] = createSignal({})

export const createModal = () => {
  const openModal = () => {
    console.log('openModal')
    setIsModalOpen(true)
  }

  const closeModal = () => {
    console.log('closeModal')
    setIsModalOpen(false)
    setModalData({})
  }

  const handleAddNew = () => {
    console.log('handleAddNew')
    setIsModalOpen(true)
    // setModalData({})
  }

  const handleEdit = (id: number) => {
    console.log('handleEdit')
    setIsModalOpen(true)
    // setModalData({})
  }

  const handleDelete = (id: number) => {
    console.log('handleDelete')
    setIsModalOpen(true)
    // setModalData({})
  }

  return {
    isModalOpen,
    setIsModalOpen,
    toggleModal,
    modalData,
    setModalData,
    openModal,
    closeModal,
    handleAddNew,
    handleEdit,
    handleDelete,
  }
}
