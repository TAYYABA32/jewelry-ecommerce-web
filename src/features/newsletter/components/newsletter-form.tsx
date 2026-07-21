"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { subscribeToNewsletter } from "@/actions/newsletter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  type NewsletterFormValues,
  newsletterSchema,
} from "@/features/newsletter/schema";

export function NewsletterForm() {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (values: NewsletterFormValues) => {
    startTransition(async () => {
      const result = await subscribeToNewsletter(values);
      if (result.success) {
        toast.success("You're subscribed. Thank you!");
        reset();
      } else {
        toast.error(
          result.error.email?.[0] ?? "Could not subscribe. Please try again.",
        );
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="Your email address"
          aria-label="Email address"
          {...register("email")}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "..." : "Subscribe"}
        </Button>
      </div>
      {errors.email ? (
        <p className="text-sm text-destructive">{errors.email.message}</p>
      ) : null}
    </form>
  );
}
