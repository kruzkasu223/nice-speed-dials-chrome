import { XIcon } from 'lucide-solid'
import { Portal } from 'solid-js/web'
import { HStack, VStack } from 'styled-system/jsx'
import { Button } from '~/lib/ui/button'
import { Dialog } from '~/lib/ui/dialog'
import { IconButton } from '~/lib/ui/icon-button'
import { Input } from '~/lib/ui/input'
import { Text } from '~/lib/ui/text'
import {
  closeModal,
  handleModalDataChange,
  handleModalOnSubmit,
  isModalOpen,
  isValid,
  modalData,
  modalType,
  setIsModalOpen,
} from '~/stores'

export const InputModal = () => {
  return (
    <Dialog.Root
      lazyMount
      unmountOnExit
      open={isModalOpen()}
      onOpenChange={(e) => {
        setIsModalOpen(e.open)
      }}
      onExitComplete={closeModal}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content p={4} minW="md">
            <HStack justifyContent="space-between" mb={4}>
              <Dialog.Title fontSize="xl" fontWeight="semibold">
                {modalType()?.title}
              </Dialog.Title>

              <Dialog.CloseTrigger asChild>
                <IconButton size="sm" variant="ghost">
                  <XIcon />
                </IconButton>
              </Dialog.CloseTrigger>
            </HStack>

            <VStack gap={4}>
              {modalType()?.type === 'DELETE' ? (
                <Text alignSelf={'flex-start'} fontSize="lg">
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

              <HStack alignSelf={'flex-end'} gap={4}>
                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>

                <Button
                  onClick={handleModalOnSubmit}
                  disabled={!isValid(modalType()?.type, modalData())}
                >
                  {modalType()?.button}
                </Button>
              </HStack>
            </VStack>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
