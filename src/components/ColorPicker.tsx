import { PipetteIcon } from "lucide-solid"
import { For } from "solid-js"
import { HStack, Stack } from "styled-system/jsx"
import { ColorPicker as ParkColorPicker } from "~/components/ui/color-picker"
import { IconButton } from "~/components/ui/icon-button"
import { Input } from "~/components/ui/input"
import { Text } from "~/components/ui/text"

export const ColorPicker = (props: ParkColorPicker.RootProps) => {
  return (
    <ParkColorPicker.Root {...props}>
      <ParkColorPicker.Context>
        {(api) => (
          <>
            <ParkColorPicker.Label>Color Picker</ParkColorPicker.Label>
            <ParkColorPicker.Control>
              <ParkColorPicker.ChannelInput
                channel="hex"
                asChild={(inputProps) => <Input {...inputProps()} />}
              />
              <ParkColorPicker.Trigger
                asChild={(triggerProps) => (
                  <IconButton variant="outline" {...triggerProps()}>
                    <ParkColorPicker.Swatch value={api().value} />
                  </IconButton>
                )}
              />
            </ParkColorPicker.Control>
            <ParkColorPicker.Positioner>
              <ParkColorPicker.Content>
                <Stack gap="3">
                  <ParkColorPicker.Area>
                    <ParkColorPicker.AreaBackground />
                    <ParkColorPicker.AreaThumb />
                  </ParkColorPicker.Area>
                  <HStack gap="3">
                    {/* <ParkColorPicker.EyeDropperTrigger
                      asChild={(triggerProps) => (
                        <IconButton
                          size="xs"
                          variant="outline"
                          aria-label="Pick a color"
                          {...triggerProps()}
                        >
                          <PipetteIcon />
                        </IconButton>
                      )}
                    /> */}
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
                    <ParkColorPicker.ChannelInput
                      channel="hex"
                      asChild={(inputProps) => (
                        <Input size="2xs" {...inputProps()} />
                      )}
                    />
                    <ParkColorPicker.ChannelInput
                      channel="alpha"
                      asChild={(inputProps) => (
                        <Input size="2xs" {...inputProps()} />
                      )}
                    />
                  </HStack>
                  <Stack gap="1.5">
                    <Text size="xs" fontWeight="medium" color="fg.default">
                      Saved Colors
                    </Text>
                    <ParkColorPicker.SwatchGroup>
                      <For each={presets}>
                        {(color) => (
                          <ParkColorPicker.SwatchTrigger value={color}>
                            <ParkColorPicker.Swatch value={color} />
                          </ParkColorPicker.SwatchTrigger>
                        )}
                      </For>
                    </ParkColorPicker.SwatchGroup>
                  </Stack>
                </Stack>
              </ParkColorPicker.Content>
            </ParkColorPicker.Positioner>
          </>
        )}
      </ParkColorPicker.Context>
      <ParkColorPicker.HiddenInput />
    </ParkColorPicker.Root>
  )
}

const presets = [
  "#2c2124",
  "hsl(10, 81%, 59%)",
  "hsl(60, 81%, 59%)",
  "hsl(100, 81%, 59%)",
  "hsl(175, 81%, 59%)",
  "hsl(190, 81%, 59%)",
  "hsl(205, 81%, 59%)",
  "hsl(220, 81%, 59%)",
  "hsl(250, 81%, 59%)",
  "hsl(280, 81%, 59%)",
  "hsl(350, 81%, 59%)",
]
