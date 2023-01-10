import { Component } from 'solid-js'
import { TIcons } from './types'

export const Edit: Component<TIcons> = ({ className, colour }) => {
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
      <path d="M7 7H6a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-1"></path>
      <path d="M20.385 6.585a2.1 2.1 0 00-2.97-2.97L9 12v3h3l8.385-8.415zM16 5l3 3"></path>
    </svg>
  )
}
