import { Swap } from "@/registry/default/ui/swap"

const coins = [
  { value: "apple", name: "Apple", image: "/avatars/01.png" },
  { value: "banana", name: "Banana", image: "/avatars/02.png" },
  {
    value: "blueberry",
    name: "Blueberry",
    image: "/avatars/03.png",
  },
]

export default function SwapDemo() {
  return <Swap coins={coins} />
}
