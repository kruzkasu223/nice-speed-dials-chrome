import { createToaster } from '@ark-ui/solid'
import { XIcon } from 'lucide-solid'
import { IconButton } from '~/lib/ui/icon-button'
import * as Toast from '~/lib/ui/toast'

export const [ToastProvider, notify] = createToaster({
  placement: 'top-end',
  render(toast) {
    return (
      <Toast.Root>
        <Toast.Title>{toast().title}</Toast.Title>
        <Toast.Description>{toast().description}</Toast.Description>
        <Toast.CloseTrigger asChild>
          <IconButton size="sm" variant="link">
            <XIcon />
          </IconButton>
        </Toast.CloseTrigger>
      </Toast.Root>
    )
  },
})
