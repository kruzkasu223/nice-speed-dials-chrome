import { XIcon } from 'lucide-solid'
import { Button } from '~/lib/ui/button'
import * as Drawer from '~/lib/ui/drawer'
import { IconButton } from '~/lib/ui/icon-button'
import { isSettingDrawerOpen, setIsSettingDrawerOpen } from '~/stores'

export const SettingsDrawer = () => {
  return (
    <Drawer.Root
      open={isSettingDrawerOpen()}
      onOpenChange={(e) => setIsSettingDrawerOpen(e.open)}
    >
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Title</Drawer.Title>
            <Drawer.Description>Description</Drawer.Description>
            <Drawer.CloseTrigger asChild position="absolute" top="3" right="4">
              <IconButton variant="ghost">
                <XIcon />
              </IconButton>
            </Drawer.CloseTrigger>
          </Drawer.Header>
          <Drawer.Body>
            <div>Settings Here...</div>
          </Drawer.Body>
          <Drawer.Footer gap="3">
            <Drawer.CloseTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </Drawer.CloseTrigger>
            <Button>Save</Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  )
}
