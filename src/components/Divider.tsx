import { DividerProps, Divider as ParkDivider } from 'styled-system/jsx'

export const Divider = (props: DividerProps) => (
  <ParkDivider my={props.my ?? '6'} {...props} />
)
