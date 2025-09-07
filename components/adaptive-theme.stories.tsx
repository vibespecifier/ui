import AdaptiveTheme, { type ThemeMode } from "@components/adaptive-theme"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta: Meta<typeof AdaptiveTheme> = {
  component: AdaptiveTheme,
  argTypes: {
    mode: {
      control: { type: "select" },
      options: ["system", "light", "dark"] as ThemeMode[],
    },
  },
  args: {
    mode: "system",
    queryID: "theme",
    darkClass: "dark",
    lightClass: "light",
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const System: Story = { args: { mode: "system" } }
export const Light: Story = { args: { mode: "light" } }
export const Dark: Story = { args: { mode: "dark" } }
