import * as React from "react"
import Image from "next/image"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowDown } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button } from "./button"
import { Card } from "./card"
import { Input } from "./input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"

const swapVariants = cva("relative space-y-2 rounded-2xl p-2", {
  variants: {
    variant: {
      default: "",
      secondary: "",
      destructive: "",
      outline: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface SwapProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof swapVariants> {
  coins: { value: string; name: string; image: string }[]
}

function Swap({ className, variant, coins, ...props }: SwapProps) {
  const [focused, setFocused] = React.useState<"Sell" | "Buy">("Sell")
  return (
    <Card {...props} className={cn(swapVariants({ variant }), className)}>
      <SwapField
        side="Sell"
        setFocused={setFocused}
        focused={focused}
        coins={coins}
        defaultCoin={coins[0]}
      />
      <Button
        variant="secondary"
        size="icon"
        className="absolute inset-x-1/2 top-[calc(50%-52px)] -translate-x-1/2 border-2 border-card"
      >
        <ArrowDown className="h-4 w-4" />
      </Button>
      <SwapField
        side="Buy"
        setFocused={setFocused}
        focused={focused}
        coins={coins}
      />
      <Button className="w-full">Get Started</Button>
    </Card>
  )
}

interface SwapFieldProps {
  side?: "Sell" | "Buy"
  setFocused: (side: "Sell" | "Buy") => void
  focused: "Sell" | "Buy"
  coins: { value: string; name: string; image: string }[]
  defaultCoin?: { value: string; name: string; image: string }
}

function SwapField({
  side = "Sell",
  setFocused,
  focused,
  coins,
  defaultCoin,
}: SwapFieldProps) {
  const focusedField = side === focused
  return (
    <Card
      className={cn("flex gap-1 rounded-lg p-4", !focusedField && "bg-muted")}
      onFocus={() => setFocused(side)}
    >
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">{side}</div>
        <Input
          placeholder="0"
          className="border-none bg-transparent px-0 text-2xl focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 md:text-3xl"
        />
        <div className="text-sm text-muted-foreground">$0</div>
      </div>
      <div className="flex items-center">
        <Select defaultValue={defaultCoin?.value}>
          <SelectTrigger>
            <SelectValue placeholder="Select token" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {coins.map((coin) => (
                <CurrencyItem key={coin.value} coin={coin} />
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </Card>
  )
}

function CurrencyItem({
  coin,
}: {
  coin: {
    value: string
    name: string
    image: string
  }
}) {
  return (
    <SelectItem value={coin.value} className="gap-2 p-2">
      <div className="flex items-center gap-2">
        <Image
          src={coin.image}
          alt={coin.name}
          width={20}
          height={20}
          className="rounded-full"
        />
        {coin.name}
      </div>
    </SelectItem>
  )
}

export { Swap, swapVariants }
