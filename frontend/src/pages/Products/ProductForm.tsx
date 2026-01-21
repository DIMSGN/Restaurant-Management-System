import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type ProductFormData } from "@/schemas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormSelect } from "@/components/FormFields";
import { CategorySelector } from "@/components/CategorySelector";
import { useEffect } from "react";

interface ProductFormProps {
  defaultValues?: Partial<ProductFormData>;
  editingId: number | null;
  onSubmit: (data: ProductFormData) => Promise<void>;
  onCancel: () => void;
}

function ProductForm({ defaultValues, editingId, onSubmit, onCancel }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      category: "",
      unit: "kg" as const,
      stock: 0,
      purchasePrice: 0,
      salePrice: 0,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    } else {
      reset({
        name: "",
        category: "",
        unit: "kg" as const,
        stock: 0,
        purchasePrice: 0,
        salePrice: 0,
      });
    }
  }, [defaultValues, reset]);

  const onFormSubmit = async (data: ProductFormData) => {
    await onSubmit(data);
    reset();
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{editingId ? "Edit Product" : "Add New Product"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <FormField
            label="Name"
            name="name"
            placeholder="e.g., Tomatoes"
            error={errors.name}
            register={register}
          />

          <div className="grid grid-cols-2 gap-4">
            <CategorySelector
              value={watch("category")}
              register={register}
              setValue={setValue}
              error={errors.category}
            />
            <FormSelect
              label="Unit"
              name="unit"
              options={["kg", "liters", "pieces", "grams", "ml"]}
              error={errors.unit}
              register={register}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Purchase Price (€)"
              name="purchasePrice"
              type="number"
              step="0.01"
              placeholder="0.00"
              error={errors.purchasePrice}
              register={register}
              registerOptions={{ valueAsNumber: true }}
            />
            <FormField
              label="Sale Price (€)"
              name="salePrice"
              type="number"
              step="0.01"
              placeholder="0.00"
              error={errors.salePrice}
              register={register}
              registerOptions={{ valueAsNumber: true }}
            />
          </div>

          <FormField
            label="Stock"
            name="stock"
            type="number"
            step="0.01"
            placeholder="0"
            error={errors.stock}
            register={register}
            registerOptions={{ valueAsNumber: true }}
          />

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : editingId ? "Update Product" : "Add Product"}
            </Button>
            {editingId && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default ProductForm;
