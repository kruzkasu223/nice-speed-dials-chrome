import { Component } from 'solid-js'
import { TIcons } from './types'

export const Duplicate: Component<TIcons> = ({ className, colour }) => {
  return (
    <svg
      class={className}
      stroke={colour}
      fill="none"
      stroke-width="0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      height="1em"
      width="1em"
      style="overflow: visible;"
    >
      <rect
        width="336"
        height="336"
        x="128"
        y="128"
        fill="none"
        stroke="currentColor"
        stroke-linejoin="round"
        stroke-width="32"
        rx="57"
        ry="57"
      ></rect>
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
        d="M383.5 128l.5-24a56.16 56.16 0 00-56-56H112a64.19 64.19 0 00-64 64v216a56.16 56.16 0 0056 56h24M296 216v160M376 296H216"
      ></path>
    </svg>
  )
}
