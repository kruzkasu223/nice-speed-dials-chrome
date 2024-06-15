import { Trash2Icon } from 'lucide-solid'
import { Button } from '~/lib/ui/button'
import * as ParkFileUpload from '~/lib/ui/file-upload'
import { IconButton } from '~/lib/ui/icon-button'

export const FileUpload = (props: ParkFileUpload.RootProps) => {
  return (
    <ParkFileUpload.Root
      maxFiles={1}
      maxFileSize={4800000} // 4.8MB => due to chrome storage restriction
      {...props}
    >
      <ParkFileUpload.Dropzone minH="auto">
        <ParkFileUpload.Label>
          Upload image for main background (max size 4.8MB)
        </ParkFileUpload.Label>
        {/* <ParkFileUpload.Trigger asChild> */}
        <ParkFileUpload.Trigger>
          <Button size="sm">Open Explorer</Button>
        </ParkFileUpload.Trigger>
      </ParkFileUpload.Dropzone>

      {/* <ParkFileUpload.ItemGroup>
        {(files) =>
          files().map((file, id) => (
            <ParkFileUpload.Item key={id} file={file}>
              <ParkFileUpload.ItemPreview type="image/*">
                <ParkFileUpload.ItemPreviewImage />
              </ParkFileUpload.ItemPreview>
              <ParkFileUpload.ItemName />
              <ParkFileUpload.ItemSizeText /> */}
      {/* <ParkFileUpload.ItemDeleteTrigger asChild> */}
      {/* <ParkFileUpload.ItemDeleteTrigger>
                <IconButton variant="link" size="sm">
                  <Trash2Icon />
                </IconButton>
              </ParkFileUpload.ItemDeleteTrigger>
            </ParkFileUpload.Item>
          ))
        }
      </ParkFileUpload.ItemGroup> */}
    </ParkFileUpload.Root>
  )
}
