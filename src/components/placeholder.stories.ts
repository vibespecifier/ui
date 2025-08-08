import type { Meta, StoryObj } from "@storybook/react-vite"
import Placeholder from "./placeholder"

const meta = {
  component: Placeholder,
  title: "Components/Placeholder",
  tags: ["autodocs"],
  argTypes: {
    message: {
      control: "text",
      description: "The message to display",
      table: { defaultValue: { summary: "Placeholder" } },
    },
  },
} satisfies Meta<typeof Placeholder>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    message: "Placeholder",
  },
}
