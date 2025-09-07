import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/internal/test"
import utils from "./utils.module.scss"

const meta = {} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

const text = "Placeholder"

export const Placeholder: Story = {
  render: () => <div className={utils.placeholder}>{text}</div>,
  argTypes: {},
}

Placeholder.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const placeholder = canvas.getByText(text)
  expect(placeholder).toBeInTheDocument()
}
