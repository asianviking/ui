import * as React from "react"
import Image from "next/image"
import { ArrowUpDown } from "lucide-react"

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

interface Token {
  name: string
  address: string
  symbol: string
  decimals: number
  image: string
  chainId: number
}

export interface SwapProps extends React.HTMLAttributes<HTMLDivElement> {}

function Swap({ className, children, ...props }: SwapProps) {
  return (
    <Card
      {...props}
      className={cn("relative w-[420px] space-y-1 rounded-2xl p-2", className)}
    >
      {children}
    </Card>
  )
}

export interface SwapDefaultProps extends React.HTMLAttributes<HTMLDivElement> {
  tokens: Token[]
}

function SwapDefault({ tokens }: SwapDefaultProps) {
  const [focused, setFocused] = React.useState<"Sell" | "Buy">("Sell")
  return (
    <Swap>
      <SwapField
        label="Sell"
        setFocused={setFocused}
        focused={focused}
        tokens={tokens}
        defaultToken={tokens[0]}
      />
      <SwapToggleButton />
      <SwapField
        label="Buy"
        setFocused={setFocused}
        focused={focused}
        tokens={tokens}
      />
      <SwapButton className="w-full" />
    </Swap>
  )
}

interface SwapToggleButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: "secondary" | "destructive" | "outline"
}

function SwapToggleButton({
  className,
  variant = "secondary",
}: SwapToggleButtonProps) {
  return (
    <Button
      variant={variant}
      size="icon"
      className={cn(
        "absolute inset-x-1/2 top-[calc(50%-52px)] -translate-x-1/2 border-2 border-card",
        className
      )}
    >
      <ArrowUpDown className="h-4 w-4" />
    </Button>
  )
}

interface SwapButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: "secondary" | "destructive" | "outline"
}

function SwapButton({ className, variant }: SwapButtonProps) {
  return (
    <Button variant={variant} className={cn(className)}>
      Get Started
    </Button>
  )
}

interface SwapFieldProps {
  label?: "Sell" | "Buy"
  setFocused: (label: "Sell" | "Buy") => void
  focused: "Sell" | "Buy"
  tokens: Token[]
  defaultToken?: Token
}

function SwapField({
  label = "Sell",
  setFocused,
  focused,
  tokens,
  defaultToken,
}: SwapFieldProps) {
  const focusedField = label === focused
  return (
    <Card
      className={cn("flex gap-1 rounded-lg p-4", !focusedField && "bg-muted")}
      onFocus={() => setFocused(label)}
    >
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">{label}</div>
        <Input
          placeholder="0"
          className="border-none bg-transparent px-0 text-2xl focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 md:w-56 md:text-3xl"
        />
        <div className="text-sm text-muted-foreground">$0</div>
      </div>
      <div className="flex w-full flex-col items-end justify-end gap-3">
        <Select defaultValue={defaultToken?.symbol}>
          <SelectTrigger>
            <SelectValue placeholder="Select token" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {tokens.map((token) => (
                <CurrencyItem key={token.symbol} token={token} />
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="text-sm text-muted-foreground">
          Balance $0<span className="ml-1 font-bold text-primary">Max</span>
        </div>
      </div>
    </Card>
  )
}

function CurrencyItem({ token }: { token: Token }) {
  return (
    <SelectItem value={token.symbol} className="gap-2 p-2">
      <div className="flex items-center gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={token.image}
          alt={token.name}
          width={20}
          height={20}
          className="rounded-full"
        />
        {token.name}
      </div>
    </SelectItem>
  )
}

export { SwapDefault }
