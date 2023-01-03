import { Component } from 'solid-js'
import { TIcons } from './types'

export const Folder: Component<TIcons> = ({ className, colour }) => {
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
      <path d="M5 4h4l3 3h7a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2"></path>
    </svg>
  )
}
