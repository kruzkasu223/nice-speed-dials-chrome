import { Trash2Icon, ImageIcon, CircleAlertIcon } from "lucide-solid"
import { Button } from "~/components/ui/button"
import { FileUpload as ParkFileUpload } from "~/components/ui/file-upload"
import { IconButton } from "~/components/ui/icon-button"
import { Alert } from "~/components/ui/alert"
import { Show } from "solid-js"
import { Flex, Box } from "styled-system/jsx"
import { Text } from "~/components/ui/text"
import type { FileUploadFileError } from "@ark-ui/solid/file-upload"

const errorMessages: Record<FileUploadFileError, string> = {
  TOO_MANY_FILES: "Too many files selected (max 1 allowed)",
  FILE_INVALID_TYPE: "Invalid file type (only images allowed)",
  FILE_TOO_LARGE: "File too large (max 1.5MB)",
  FILE_TOO_SMALL: "File too small",
  FILE_INVALID: "Invalid file",
  FILE_EXISTS: "File already exists",
}

export const FileUpload = (
  props: ParkFileUpload.RootProps & {
    onFilesChange?: (files: File[]) => void
    currentImage?: string
    onRemove?: () => void
  }
) => {
  const { onFilesChange, onRemove, ...rest } = props

  const handleRemove = () => {
    if (onRemove) {
      onRemove()
    } else if (onFilesChange) {
      onFilesChange([])
    }
  }

  const handleFileChange = (e: { acceptedFiles: File[] }) => {
    onFilesChange?.(e.acceptedFiles)
  }

  return (
    <ParkFileUpload.Root
      maxFiles={1}
      maxFileSize={1572864} // 1.5MB => due to browser storage restriction
      {...rest}
      acceptedFiles={
        props.currentImage ? [new File([props.currentImage], "image")] : []
      }
      onFileChange={handleFileChange}
    >
      <Show
        when={props.currentImage}
        fallback={
          <>
            <ParkFileUpload.HiddenInput />

            <ParkFileUpload.Dropzone minH="auto" cursor="pointer">
              <ParkFileUpload.Label textAlign="center">
                Upload image for main background
                <br />
                (max size 1.5MB)
              </ParkFileUpload.Label>
              <ParkFileUpload.Trigger
                asChild={(triggerProps) => (
                  <Button size="sm" {...triggerProps()}>
                    Open Explorer
                  </Button>
                )}
              />

              {/* Error Messages */}
              <ParkFileUpload.Context>
                {(fileUpload) => (
                  <Show when={fileUpload().rejectedFiles.length > 0}>
                    <Alert.Root my="3">
                      <Alert.Icon
                        asChild={(iconProps) => (
                          <CircleAlertIcon size={18} {...iconProps()} />
                        )}
                      />
                      <Alert.Content>
                        <Alert.Title>Upload Error</Alert.Title>
                        <Alert.Description>
                          <Text size="sm">
                            {errorMessages[
                              fileUpload().rejectedFiles[0].errors[0]
                            ] ||
                              `Unknown error: ${fileUpload().rejectedFiles[0].errors[0]}`}
                          </Text>
                        </Alert.Description>
                      </Alert.Content>
                    </Alert.Root>
                  </Show>
                )}
              </ParkFileUpload.Context>
            </ParkFileUpload.Dropzone>
          </>
        }
      >
        <Box
          borderWidth="1px"
          borderColor="border.emphasized"
          borderRadius="md"
          p="4"
          bg="bg.surface"
        >
          <Flex direction="column" gap="3">
            <Flex align="center" gap="2">
              <ImageIcon size={20} />
              <Text fontWeight="medium">Current background image</Text>
            </Flex>

            <Box
              borderWidth="1px"
              borderColor="border.default"
              borderRadius="md"
              overflow="hidden"
              bg="bg.canvas"
              maxH="200px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="relative"
            >
              <img
                src={props.currentImage}
                alt="Background preview"
                style={{
                  "max-width": "100%",
                  "max-height": "200px",
                  "object-fit": "contain",
                }}
              />
              <IconButton
                size="sm"
                variant="outline"
                onClick={handleRemove}
                aria-label="Remove image"
                position="absolute"
                top="2"
                right="2"
              >
                <Trash2Icon />
              </IconButton>
            </Box>
          </Flex>
        </Box>
      </Show>
    </ParkFileUpload.Root>
  )
}
