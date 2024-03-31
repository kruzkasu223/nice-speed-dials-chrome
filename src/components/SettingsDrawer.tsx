import { Undo2Icon, XIcon } from 'lucide-solid'
import { Button } from '~/lib/ui/button'
import * as Drawer from '~/lib/ui/drawer'
import { IconButton } from '~/lib/ui/icon-button'
import { Text } from '~/lib/ui/text'
import { isSettingDrawerOpen, setIsSettingDrawerOpen } from '~/stores'
import { ColorPicker, Divider, FileUpload } from '.'
import { NumberInput } from '~/lib/ui/number-input'
import { Switch } from '~/lib/ui/switch'
import { Circle, Flex } from 'styled-system/jsx'
import { Show } from 'solid-js'
import * as Tooltip from '~/lib/ui/tooltip'
import { Slider } from '~/lib/ui/slider'
import { accentColors, borderRadii, grayColors } from '@park-ui/panda-preset'
import * as RadioButtonGroup from '~/lib/ui/radio-button-group'
import { token } from 'styled-system/tokens'

export const SettingsDrawer = () => {
  return (
    <Drawer.Root
      open={isSettingDrawerOpen()}
      onOpenChange={(e) => setIsSettingDrawerOpen(e.open)}
    >
      <Drawer.Backdrop />
      <Drawer.Positioner w="md">
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Settings</Drawer.Title>
            <Drawer.Description>Look and feel for this page</Drawer.Description>
            <Drawer.CloseTrigger asChild position="absolute" top="3" right="4">
              <IconButton variant="ghost">
                <XIcon />
              </IconButton>
            </Drawer.CloseTrigger>
          </Drawer.Header>

          <Drawer.Body>
            <div>
              <SettingItemTitle
                title="Grid"
                subTitle="Adjust number of rows (number of columns will be adjusted
                accordingly depending on number of rows and dials)"
              />
              <NumberInput mt="4">Rows</NumberInput>
            </div>

            <Divider />

            <div>
              <SettingItemTitle
                title="Dial size"
                subTitle="Adjust the size of dial"
              />
              <NumberInput mt="4">Size (in pixels)</NumberInput>
            </div>

            <Divider />

            <div>
              <Flex justify="space-between" align="center">
                <SettingItemTitle title="Show 'Add New' button" />
                <Switch checked></Switch>
              </Flex>
            </div>

            <Divider />

            <div>
              <Flex justify="space-between" align="center">
                <SettingItemTitle title="Show 'Settings' button" />
                <Switch checked></Switch>
              </Flex>
            </div>

            <Divider />

            <div>
              <Flex justify="space-between" align="center">
                <SettingItemTitle title="Open in new tab by default" />
                <Switch></Switch>
              </Flex>
            </div>

            <Divider />

            <div>
              <Flex justify="space-between" align="center">
                <SettingItemTitle title="Disable drag and drop" />
                <Switch></Switch>
              </Flex>
            </div>

            <Divider />

            <div>
              <Flex justify="space-between" align="center">
                <SettingItemTitle title="Dark mode" />
                <Switch checked></Switch>
              </Flex>
            </div>

            <Divider />

            <div>
              <SettingItemTitle
                title="Main background"
                subTitle="Image will be used if uploaded, else default/selected color will be used"
              />
              <ColorPicker mt="4" value={'#000001'} />
              <Text my="2" fontWeight="bold">
                OR
              </Text>
              <FileUpload />
              {/* TODO: input field for gradients, or add a tabs for all the options [color, image, gradient, etc] */}
            </div>

            <Divider />

            <div>
              <SettingItemTitle title="Gray color" />
              {/* TODO: copy from https://park-ui.com/ 's Make it yours drawer 
              https://github.dev/cschroeter/park-ui/tree/main/website 
              `website/src/components/theme/theme-drawer.tsx` */}

              <RadioButtonGroup.Root
                mt="4"
                value={'mauve'}
                // value={currentGrayColor}
                size="sm"
                variant="outline"
                display="grid"
                gap="2"
                gridTemplateColumns="repeat(3, 1fr)"
                // onValueChange={(e) =>
                //   updateGrayColor(
                //     grayColors.find((gray) => gray === e.value) ??
                //       currentGrayColor
                //   )
                // }
              >
                {grayColors.map((gray) => (
                  <RadioButtonGroup.Item
                    key={gray}
                    value={gray}
                    _checked={{
                      borderColor: 'border.outline',
                      boxShadow: '0 0 0 1px var(--colors-border-outline)',
                    }}
                    justifyContent="flex-start"
                  >
                    <RadioButtonGroup.ItemControl />
                    <RadioButtonGroup.ItemText textTransform="capitalize">
                      <Circle
                        size="3.5"
                        style={{
                          background: token.var(`colors.${gray}.9`),
                        }}
                      />
                      {gray}
                    </RadioButtonGroup.ItemText>
                  </RadioButtonGroup.Item>
                ))}
              </RadioButtonGroup.Root>
            </div>

            <Divider />

            <div>
              <SettingItemTitle title="Accent color" showReset />

              <RadioButtonGroup.Root
                mt="4"
                value={'ruby'}
                // value={currentAccentColor}
                size="sm"
                variant="outline"
                display="grid"
                gap="2"
                gridTemplateColumns="repeat(3, 1fr)"
                // onValueChange={(e) =>
                //   updateAccentColor(
                //     accentColors.find((accent) => accent === e.value) ??
                //       currentAccentColor
                //   )
                // }
              >
                {accentColors.map((accent) => (
                  <RadioButtonGroup.Item
                    key={accent}
                    value={accent}
                    justifyContent="flex-start"
                  >
                    <RadioButtonGroup.ItemControl />
                    <RadioButtonGroup.ItemText textTransform="capitalize">
                      <Circle
                        size="3.5"
                        style={{
                          background: token.var(`colors.${accent}.9`),
                        }}
                      />
                      {accent}
                    </RadioButtonGroup.ItemText>
                  </RadioButtonGroup.Item>
                ))}
              </RadioButtonGroup.Root>
            </div>

            <Divider />

            <div>
              <SettingItemTitle title="Radius" showReset />
              <Slider
                mt="4"
                mb="6"
                min={0}
                max={borderRadii.length - 1}
                value={[borderRadii.indexOf('sm')]}
                // value={[borderRadii.indexOf(currentBorderRadius)]}
                // onValueChange={(e) =>
                //   updateBorderRadius(borderRadii[e.value[0]])
                // }
                marks={borderRadii.map((borderRadius, index) => ({
                  value: index,
                  label: borderRadius,
                }))}
              ></Slider>
            </div>

            <Divider />

            <div>
              <Flex justify="space-between" align="center">
                <SettingItemTitle title="Sync the settings across all devices" />

                <Tooltip.Root
                  lazyMount
                  unmountOnExit
                  closeDelay={0}
                  openDelay={0}
                  positioning={{ placement: 'top' }}
                  closeOnPointerDown={false}
                >
                  <Tooltip.Trigger asChild>
                    <Switch disabled></Switch>
                  </Tooltip.Trigger>

                  <Tooltip.Positioner>
                    <Tooltip.Arrow>
                      <Tooltip.ArrowTip />
                    </Tooltip.Arrow>
                    <Tooltip.Content>Coming Soon</Tooltip.Content>
                  </Tooltip.Positioner>
                </Tooltip.Root>
              </Flex>
            </div>

            <Divider />

            <div>
              <Flex justify="space-between" align="center">
                <SettingItemTitle title="Disable all the animations" />

                <Tooltip.Root
                  lazyMount
                  unmountOnExit
                  closeDelay={0}
                  openDelay={0}
                  positioning={{ placement: 'top' }}
                  closeOnPointerDown={false}
                >
                  <Tooltip.Trigger asChild>
                    <Switch disabled></Switch>
                  </Tooltip.Trigger>

                  <Tooltip.Positioner>
                    <Tooltip.Arrow>
                      <Tooltip.ArrowTip />
                    </Tooltip.Arrow>
                    <Tooltip.Content>Coming Soon</Tooltip.Content>
                  </Tooltip.Positioner>
                </Tooltip.Root>
              </Flex>
            </div>

            <Divider />

            <div>
              <SettingItemTitle
                title="Like Using Nice Speed Dials?"
                subTitle="Donate a cup of coffee or a tea to help support the development
                of this extension"
              />

              <div>
                <Button mt="4">Donate button here</Button>
              </div>
            </div>
          </Drawer.Body>
          <Drawer.Footer gap="3">
            <Drawer.CloseTrigger asChild>
              <Button variant="outline">Close</Button>
            </Drawer.CloseTrigger>

            <Button variant="outline">
              <Undo2Icon /> Reset all to Default
            </Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  )
}

const SettingItemTitle = (props: {
  title: string
  subTitle?: string
  showReset?: boolean
}) => {
  return (
    <>
      <Flex align="center" gap="2">
        <Text size="lg" fontWeight="bold">
          {props.title}
        </Text>

        <Show when={props.showReset}>
          <Tooltip.Root
            lazyMount
            unmountOnExit
            closeDelay={0}
            openDelay={0}
            positioning={{ placement: 'top' }}
            closeOnPointerDown={false}
          >
            <Tooltip.Trigger asChild>
              <IconButton variant="ghost" size="xs">
                <Undo2Icon />
              </IconButton>
            </Tooltip.Trigger>

            <Tooltip.Positioner>
              <Tooltip.Arrow>
                <Tooltip.ArrowTip />
              </Tooltip.Arrow>
              <Tooltip.Content>Reset to Default</Tooltip.Content>
            </Tooltip.Positioner>
          </Tooltip.Root>
        </Show>
      </Flex>

      <Show when={props.subTitle}>
        <Text size="sm">{props.subTitle}</Text>
      </Show>
    </>
  )
}
