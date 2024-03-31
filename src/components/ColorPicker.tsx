import { PipetteIcon } from 'lucide-solid'
import { HStack, Stack } from 'styled-system/jsx'
import * as ParkColorPicker from '~/lib/ui/color-picker'
import { IconButton } from '~/lib/ui/icon-button'
import { Input } from '~/lib/ui/input'
import { Text } from '~/lib/ui/text'

export const ColorPicker = (props: ParkColorPicker.RootProps) => {
  return (
    <ParkColorPicker.Root {...props}>
      {(api) => (
        <>
          {/* <ColorPickerBase.Label>Color Picker</ColorPickerBase.Label> */}
          <ParkColorPicker.Control>
            <ParkColorPicker.ChannelInput channel="hex" asChild>
              <Input />
            </ParkColorPicker.ChannelInput>

            <ParkColorPicker.Trigger asChild>
              {/* TODO: Fix asChild issue everywhere */}
              <IconButton variant="outline">
                <ParkColorPicker.Swatch value={api().value || '#000000'} />
              </IconButton>
            </ParkColorPicker.Trigger>
          </ParkColorPicker.Control>

          <ParkColorPicker.Positioner>
            <ParkColorPicker.Content>
              <Stack gap="3">
                <ParkColorPicker.Area>
                  <ParkColorPicker.AreaBackground />
                  <ParkColorPicker.AreaThumb />
                </ParkColorPicker.Area>

                <HStack gap="3">
                  <ParkColorPicker.EyeDropperTrigger asChild>
                    <IconButton
                      size="xs"
                      variant="outline"
                      aria-label="Pick a color"
                    >
                      <PipetteIcon />
                    </IconButton>
                  </ParkColorPicker.EyeDropperTrigger>

                  <Stack gap="2" flex="1">
                    <ParkColorPicker.ChannelSlider channel="hue">
                      <ParkColorPicker.ChannelSliderTrack />
                      <ParkColorPicker.ChannelSliderThumb />
                    </ParkColorPicker.ChannelSlider>
                    <ParkColorPicker.ChannelSlider channel="alpha">
                      <ParkColorPicker.TransparencyGrid size="8px" />
                      <ParkColorPicker.ChannelSliderTrack />
                      <ParkColorPicker.ChannelSliderThumb />
                    </ParkColorPicker.ChannelSlider>
                  </Stack>
                </HStack>

                <HStack>
                  <ParkColorPicker.ChannelInput channel="hex" asChild>
                    <Input size="2xs" />
                  </ParkColorPicker.ChannelInput>
                  <ParkColorPicker.ChannelInput channel="alpha" asChild>
                    <Input size="2xs" />
                  </ParkColorPicker.ChannelInput>
                </HStack>

                <Stack gap="1.5">
                  <Text size="xs" fontWeight="medium" color="fg.default">
                    Presets
                  </Text>
                  <ParkColorPicker.SwatchGroup>
                    {presets.map((color, id) => (
                      <ParkColorPicker.SwatchTrigger key={id} value={color}>
                        <ParkColorPicker.Swatch value={color} />
                      </ParkColorPicker.SwatchTrigger>
                    ))}
                  </ParkColorPicker.SwatchGroup>
                </Stack>
              </Stack>
            </ParkColorPicker.Content>
          </ParkColorPicker.Positioner>
        </>
      )}
    </ParkColorPicker.Root>
  )
}

const presets = [
  'hsl(10, 81%, 59%)',
  'hsl(60, 81%, 59%)',
  'hsl(100, 81%, 59%)',
  'hsl(175, 81%, 59%)',
  'hsl(190, 81%, 59%)',
  'hsl(205, 81%, 59%)',
  'hsl(220, 81%, 59%)',
  'hsl(250, 81%, 59%)',
  'hsl(280, 81%, 59%)',
  'hsl(350, 81%, 59%)',
]
