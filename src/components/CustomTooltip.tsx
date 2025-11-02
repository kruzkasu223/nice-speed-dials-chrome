import { Tooltip } from "./ui/tooltip"

export const CustomTooltip = (
  props: { content: string } & Tooltip.RootProps
) => {
  return (
    <Tooltip.Root
      lazyMount
      unmountOnExit
      closeDelay={0}
      openDelay={100}
      closeOnPointerDown={false}
      {...props}
    >
      <Tooltip.Trigger>{props.children}</Tooltip.Trigger>
      <Tooltip.Positioner>
        <Tooltip.Arrow>
          <Tooltip.ArrowTip />
        </Tooltip.Arrow>
        <Tooltip.Content>{props.content}</Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  )
}
