"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { submitConsultationRequest } from "@/actions/consultation";
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
import { Textarea } from "@/components/ui/textarea";
import {
  type ConsultationFormValues,
  INQUIRY_TYPES,
  consultationSchema,
} from "@/features/contact/schema";

export function ConsultationForm() {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      preferredDate: "",
      inquiryType: "BRIDAL_CONSULTATION",
      message: "",
    },
  });

  const onSubmit = (values: ConsultationFormValues) => {
    startTransition(async () => {
      const result = await submitConsultationRequest(values);
      if (result.success) {
        toast.success(
          "Thank you — our concierge team will be in touch within 24 hours.",
        );
        reset();
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="Your name" {...register("name")} />
          {errors.name ? (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
          />
          {errors.email ? (
            <p className="text-sm text-destructive">
              {errors.email.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            {...register("phone")}
          />
          {errors.phone ? (
            <p className="text-sm text-destructive">
              {errors.phone.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="preferredDate">Preferred Date</Label>
          <Input
            id="preferredDate"
            type="date"
            {...register("preferredDate")}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="inquiryType">Inquiry Type</Label>
        <Controller
          control={control}
          name="inquiryType"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="inquiryType" className="w-full">
                <SelectValue placeholder="Select an inquiry type">
                  {(value: string) =>
                    INQUIRY_TYPES.find((type) => type.value === value)
                      ?.label ?? "Select an inquiry type"
                  }
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {INQUIRY_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows={5}
          placeholder="Tell us about the occasion, your vision, or any questions you have."
          {...register("message")}
        />
        {errors.message ? (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        ) : null}
      </div>

      <Button type="submit" size="lg" disabled={isPending} className="w-full">
        {isPending ? "Sending..." : "Request Consultation"}
      </Button>
    </form>
  );
}
