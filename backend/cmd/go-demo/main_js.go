package main

import (
	"strconv"
	"strings"
	"syscall/js"
)

func formatPrice(price int) string {
	digits := strconv.Itoa(price)
	var result strings.Builder
	result.Grow(len(digits) + (len(digits)-1)/3*2 + len(" ₽"))
	for i := range len(digits) {
		if i > 0 && (len(digits)-i)%3 == 0 {
			result.WriteString("\u00a0")
		}
		result.WriteByte(digits[i])
	}
	result.WriteString(" ₽")
	return result.String()
}

func productStatus(inStock bool) string {
	if inStock {
		return "В наличии"
	}
	return "Нет в наличии"
}

func main() {
	demo := js.Global().Get("Object").New()
	demo.Set("formatPrice", js.FuncOf(func(_ js.Value, args []js.Value) any {
		return formatPrice(args[0].Int())
	}))
	demo.Set("calculateDiscount", js.FuncOf(func(_ js.Value, args []js.Value) any {
		return max(0, args[1].Int()-args[0].Int())
	}))
	demo.Set("getProductStatus", js.FuncOf(func(_ js.Value, args []js.Value) any {
		return productStatus(args[0].Bool())
	}))
	demo.Set("createProductSummary", js.FuncOf(func(_ js.Value, args []js.Value) any {
		return args[0].String() + " — " + formatPrice(args[1].Int()) + " — " + productStatus(args[2].Bool())
	}))
	js.Global().Call("__gearGoReady", demo)
	select {}
}
