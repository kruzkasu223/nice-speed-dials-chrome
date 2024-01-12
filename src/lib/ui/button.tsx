import { HTMLStyledProps, styled } from 'styled-system/jsx'
import { button } from 'styled-system/recipes'
import { ark } from '@ark-ui/solid'

export const Button = styled(ark.button, button)
export interface ButtonProps extends HTMLStyledProps<typeof Button> {}
