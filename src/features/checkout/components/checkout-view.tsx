"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

import { submitCheckout } from "@/actions/checkout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  type CheckoutDetailsValues,
  PAYMENT_METHODS,
  checkoutDetailsSchema,
} from "@/features/checkout/schema";
import {
  useCartStore,
  useCartTotal,
} from "@/features/cart/store/cart-store";
import { formatPrice } from "@/utils/format-price";

export function CheckoutView() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const subtotal = useCartTotal();
  const [isPending, startTransition] = useTransition();
  const [rootError, setRootError] = useState<string | null>(null);
  const [confirmedOrderNumber, setConfirmedOrderNumber] = useState<
    string | null
  >(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutDetailsValues>({
    resolver: zodResolver(checkoutDetailsSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      addressLine1: "",
      city: "",
      state: "",
      postalCode: "",
      country: "Pakistan",
      paymentMethod: "COD",
    },
  });

  const onSubmit = (values: CheckoutDetailsValues) => {
    setRootError(null);
    startTransition(async () => {
      const result = await submitCheckout({
        ...values,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      });

      if (result.success) {
        setConfirmedOrderNumber(result.orderNumber);
        clearCart();
      } else {
        setRootError(
          result.error._root?.[0] ??
            "Something went wrong placing your order. Please try again.",
        );
      }
    });
  };

  if (confirmedOrderNumber) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-24 text-center">
        <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
          Order Confirmed
        </p>
        <p className="mt-4 font-heading text-2xl font-semibold text-foreground">
          Thank you for your order
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Order number{" "}
          <span className="font-medium text-foreground">
            {confirmedOrderNumber}
          </span>
        </p>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          We&apos;ll contact you shortly to confirm delivery details for your
          Cash on Delivery order.
        </p>
        <Button className="mt-6" render={<Link href="/shop">Continue Shopping</Link>} />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-24 text-center">
        <p className="font-heading text-lg text-foreground">
          Your cart is empty
        </p>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Add a piece to your cart before checking out.
        </p>
        <Button className="mt-6" render={<Link href="/shop">Continue Shopping</Link>} />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-12 lg:grid-cols-3"
    >
      <div className="space-y-5 lg:col-span-2">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="Your name"
              {...register("fullName")}
            />
            {errors.fullName ? (
              <p className="text-sm text-destructive">
                {errors.fullName.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+92 300 1234567"
              {...register("phone")}
            />
            {errors.phone ? (
              <p className="text-sm text-destructive">
                {errors.phone.message}
              </p>
            ) : null}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="addressLine1">Shipping Address</Label>
          <Input
            id="addressLine1"
            placeholder="House number, street, area"
            {...register("addressLine1")}
          />
          {errors.addressLine1 ? (
            <p className="text-sm text-destructive">
              {errors.addressLine1.message}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="Lahore" {...register("city")} />
            {errors.city ? (
              <p className="text-sm text-destructive">
                {errors.city.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="state">State / Province</Label>
            <Input id="state" placeholder="Punjab" {...register("state")} />
            {errors.state ? (
              <p className="text-sm text-destructive">
                {errors.state.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="postalCode">Postal Code</Label>
            <Input
              id="postalCode"
              placeholder="54000"
              {...register("postalCode")}
            />
            {errors.postalCode ? (
              <p className="text-sm text-destructive">
                {errors.postalCode.message}
              </p>
            ) : null}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="country">Country</Label>
          <Input id="country" {...register("country")} />
          {errors.country ? (
            <p className="text-sm text-destructive">
              {errors.country.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="paymentMethod">Payment Method</Label>
          <Controller
            control={control}
            name="paymentMethod"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="paymentMethod" className="w-full">
                  <SelectValue placeholder="Select a payment method">
                    {(value: string) =>
                      PAYMENT_METHODS.find((method) => method.value === value)
                        ?.label ?? "Select a payment method"
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {PAYMENT_METHODS.map((method) => (
                    <SelectItem
                      key={method.value}
                      value={method.value}
                      disabled={method.disabled}
                    >
                      {method.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {rootError ? (
          <p className="text-sm text-destructive">{rootError}</p>
        ) : null}
      </div>

      <div className="h-fit rounded-lg border border-border p-6">
        <h2 className="font-heading text-lg font-semibold text-foreground">
          Order Summary
        </h2>
        <Separator className="my-4" />

        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.productId} className="flex gap-3">
              <div className="relative size-14 shrink-0 overflow-hidden rounded-md bg-muted">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                ) : null}
              </div>
              <div className="flex flex-1 items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {item.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Qty {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-medium text-foreground">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <Separator className="my-4" />
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium text-foreground">
            {formatPrice(subtotal)}
          </span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Shipping and taxes calculated at checkout.
        </p>

        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          className="mt-6 w-full"
        >
          {isPending ? "Placing Order..." : "Place Order"}
        </Button>
      </div>
    </form>
  );
}
