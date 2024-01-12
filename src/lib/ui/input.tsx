import { HTMLStyledProps, styled } from 'styled-system/jsx'
import { input } from 'styled-system/recipes'
import { ark } from '@ark-ui/solid'

export const Input = styled(ark.input, input)
export interface InputProps extends HTMLStyledProps<typeof Input> {}
