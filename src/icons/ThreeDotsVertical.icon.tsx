import { Component } from 'solid-js'
import { TIcons } from './types'

export const ThreeDotsVertical: Component<TIcons> = ({ className, colour }) => (
  <svg
    class={className}
    fill={colour}
    stroke-width="0"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    height="1em"
    width="1em"
    style="overflow: visible;"
  >
    <path d="M9.5 13a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path>
  </svg>
)
