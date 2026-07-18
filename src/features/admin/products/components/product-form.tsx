"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { createProduct, updateProduct } from "@/actions/admin/products";
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
import { ADMIN_PRODUCT_OCCASIONS } from "@/constants/admin";
import {
  type ProductFormValues,
  productFormSchema,
} from "@/features/admin/products/schema";

type CategoryOption = { id: string; name: string };

export function ProductForm({
  categories,
  product,
}: {
  categories: CategoryOption[];
  product?: {
    id: string;
    name: string;
    price: number;
    categoryId: string;
    occasion: string | null;
    material: string;
    description: string;
    imageUrl: string;
  };
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: product?.name ?? "",
      price: product?.price ?? 0,
      categoryId: product?.categoryId ?? categories[0]?.id ?? "",
      occasion: product?.occasion ?? "",
      material: product?.material ?? "",
      description: product?.description ?? "",
      imageUrl: product?.imageUrl ?? "",
    },
  });

  const onSubmit = (values: ProductFormValues) => {
    startTransition(async () => {
      const result = product
        ? await updateProduct(product.id, values)
        : await createProduct(values);

      if (result.success) {
        toast.success(product ? "Product updated" : "Product created");
        router.push("/admin/products");
        router.refresh();
      } else {
        toast.error(
          result.error._root?.[0] ??
            "Something went wrong. Please check the form and try again.",
        );
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="name">Product Name</Label>
        <Input id="name" {...register("name")} />
        {errors.name ? (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="price">Price (USD)</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            min="0"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price ? (
            <p className="text-sm text-destructive">{errors.price.message}</p>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="material">Material</Label>
          <Input
            id="material"
            placeholder="18k Gold, Sterling Silver..."
            {...register("material")}
          />
          {errors.material ? (
            <p className="text-sm text-destructive">
              {errors.material.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="categoryId">Category</Label>
          <Controller
            control={control}
            name="categoryId"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="categoryId" className="w-full">
                  <SelectValue placeholder="Select a category">
                    {(value: string) =>
                      categories.find((c) => c.id === value)?.name ??
                      "Select a category"
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.categoryId ? (
            <p className="text-sm text-destructive">
              {errors.categoryId.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="occasion">Occasion</Label>
          <Controller
            control={control}
            name="occasion"
            render={({ field }) => (
              <Select
                value={field.value || undefined}
                onValueChange={field.onChange}
              >
                <SelectTrigger id="occasion" className="w-full">
                  <SelectValue placeholder="Select an occasion">
                    {(value: string) =>
                      ADMIN_PRODUCT_OCCASIONS.find((o) => o.value === value)
                        ?.label ?? "Select an occasion"
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {ADMIN_PRODUCT_OCCASIONS.map((occasion) => (
                    <SelectItem key={occasion.value} value={occasion.value}>
                      {occasion.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          placeholder="https://..."
          {...register("imageUrl")}
        />
        {errors.imageUrl ? (
          <p className="text-sm text-destructive">
            {errors.imageUrl.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" rows={5} {...register("description")} />
        {errors.description ? (
          <p className="text-sm text-destructive">
            {errors.description.message}
          </p>
        ) : null}
      </div>

      <Button type="submit" size="lg" disabled={isPending}>
        {isPending
          ? "Saving..."
          : product
            ? "Save Changes"
            : "Create Product"}
      </Button>
    </form>
  );
}
