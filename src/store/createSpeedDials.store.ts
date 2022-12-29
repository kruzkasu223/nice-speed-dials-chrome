import { createStore } from 'solid-js/store'
import { gridAlgorithm } from '../utils'

type TSpeedDial = {
  id: number
  name: string
  icon: string
  url: string
}

const initialSpeedDials: TSpeedDial[] = [
  {
    id: 1,
    name: 'Google',
    icon: 'https://www.google.com/favicon.ico',
    url: 'https://www.google.com',
  },
  {
    id: 2,
    name: 'GitHub',
    icon: 'https://www.github.com/favicon.ico',
    url: 'https://www.github.com',
  },
  {
    id: 3,
    name: 'Twitter',
    icon: 'https://www.twitter.com/favicon.ico',
    url: 'https://www.twitter.com',
  },
  {
    id: 4,
    name: 'Reddit',
    icon: 'https://www.reddit.com/favicon.ico',
    url: 'https://www.reddit.com',
  },
  {
    id: 5,
    name: 'YouTube',
    icon: 'https://www.youtube.com/favicon.ico',
    url: 'https://www.youtube.com',
  },
  {
    id: 6,
    name: 'Amazon',
    icon: 'https://www.amazon.com/favicon.ico',
    url: 'https://www.amazon.com',
  },
  {
    id: 7,
    name: 'Wikipedia',
    icon: 'https://www.wikipedia.org/favicon.ico',
    url: 'https://www.wikipedia.org',
  },
  {
    id: 8,
    name: 'Netflix',
    icon: 'https://www.netflix.com/favicon.ico',
    url: 'https://www.netflix.com',
  },
  {
    id: 9,
    name: 'Facebook',
    icon: 'https://www.facebook.com/favicon.ico',
    url: 'https://www.facebook.com',
  },
  {
    id: 10,
    name: 'Instagram',
    icon: 'https://www.instagram.com/favicon.ico',
    url: 'https://www.instagram.com',
  },
  {
    id: 11,
    name: 'Spotify',
    icon: 'https://www.spotify.com/favicon.ico',
    url: 'https://www.spotify.com',
  },
  {
    id: 12,
    name: 'Twitch',
    icon: 'https://www.twitch.tv/favicon.ico',
    url: 'https://www.twitch.tv',
  },
  {
    id: 13,
    name: 'Yahoo',
    icon: 'https://www.yahoo.com/favicon.ico',
    url: 'https://www.yahoo.com',
  },
  {
    id: 14,
    name: 'Bing',
    icon: 'https://www.bing.com/favicon.ico',
    url: 'https://www.bing.com',
  },
  {
    id: 15,
    name: 'DuckDuckGo',
    icon: 'https://www.duckduckgo.com/favicon.ico',
    url: 'https://www.duckduckgo.com',
  },
  {
    id: 16,
    name: 'W3Schoolsssssssssss',
    icon: 'https://www.w3schools.com/favicon.ico',
    url: 'https://www.w3schools.com',
  },
]

const [speedDials, setSpeedDials] = createStore<TSpeedDial[]>(initialSpeedDials)
const speedDialsLength = speedDials?.length || 0

export const createSpeedDials = () => {
  const { gridHeight: speedDialsGridHeight, gridWidth: speedDialsGridWidth } =
    gridAlgorithm(speedDialsLength + 1)

  return {
    speedDials,
    setSpeedDials,
    speedDialsLength,
    speedDialsGridLength: 5,
    speedDialsGridHeight,
    speedDialsGridWidth,
  }
}
