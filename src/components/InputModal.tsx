import { Button, HStack, Input, Modal, Text, VStack } from '@hope-ui/core'
import { createModal, isValid } from '../stores'

export const InputModal = () => {
  const {
    modalType,
    modalData,
    closeModal,
    isModalOpen,
    handleModalOnSubmit,
    handleModalDataChange,
  } = createModal()

  return (
    <Modal isOpen={isModalOpen()} onClose={closeModal} isCentered>
      <Modal.Overlay />
      <Modal.Content p={6}>
        <HStack justifyContent="space-between" mb={6}>
          <Modal.Heading fontSize={'xl'} fontWeight="semibold">
            {modalType()?.title}
          </Modal.Heading>
          <Modal.CloseButton />
        </HStack>
        <VStack spacing={'6'}>
          {modalType()?.type === 'DELETE' ? (
            <Text alignSelf={'flex-start'} fontSize={'lg'}>
              {modalType()?.description}
            </Text>
          ) : (
            <>
              <Input
                name="title"
                inputMode="text"
                placeholder="Name"
                value={modalData()?.title || ''}
                onInput={handleModalDataChange}
              />
              <Input
                name="url"
                inputMode="url"
                placeholder="URL"
                value={modalData()?.url || ''}
                onInput={handleModalDataChange}
              />
            </>
          )}
          <HStack alignSelf={'flex-end'} spacing={'6'}>
            <Button variant="plain" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              variant="outlined"
              onClick={handleModalOnSubmit}
              isDisabled={!isValid(modalType()?.type, modalData())}
            >
              {modalType()?.button}
            </Button>
          </HStack>
        </VStack>
      </Modal.Content>
    </Modal>
  )
}
