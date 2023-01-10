import { Component } from 'solid-js'
import { TIcons } from './types'

export const Delete: Component<TIcons> = ({ className, colour }) => {
  return (
    <svg
      class={className}
      stroke={colour}
      fill="none"
      stroke-width="2"
      xmlns="http://www.w3.org/2000/svg"
      stroke-linecap="round"
      stroke-linejoin="round"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      style="overflow: visible;"
    >
      <path stroke="none" d="M0 0h24v24H0z"></path>
      <path d="M4 7h16M5 7l1 12a2 2 0 002 2h8a2 2 0 002-2l1-12M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3M10 12l4 4m0-4l-4 4"></path>
    </svg>
  )
}
