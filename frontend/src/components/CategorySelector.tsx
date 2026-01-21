import { useState, useEffect } from "react";
import type { UseFormRegister, FieldError, UseFormSetValue } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormSelect } from "./FormFields";
import { Input } from "@/components/ui/input";

const PRODUCT_CATEGORIES = [
  "Κρέατα",
  "Θαλασσινά", 
  "Λαχανικά",
  "Γαλακτοκομικά",
  "Ζυμαρικά",
  "Όσπρια & Δημητριακά",
  "Μπαχαρικά",
  "Έλαια & Λίπη",
  "Κονσέρβες",
  "Ποτά",
  "Φρούτα",
  "Άλλα"
];

const isCategoryInList = (category: string) => 
  PRODUCT_CATEGORIES.some(cat => cat.toLowerCase().trim() === category.toLowerCase().trim());

interface CategorySelectorProps {
  value: string;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  error?: FieldError;
}

export function CategorySelector({ value, register, setValue, error }: CategorySelectorProps) {
  const [inputMode, setInputMode] = useState<"select" | "custom">("select");
  const [customValue, setCustomValue] = useState("");

  useEffect(() => {
    if (value && !isCategoryInList(value)) {
      setInputMode("custom");
      setCustomValue(value);
    }
  }, [value]);

  const handleModeSwitch = (mode: "select" | "custom") => {
    setInputMode(mode);
    if (mode === "select") {
      setValue("category", PRODUCT_CATEGORIES[0]);
      setCustomValue("");
    } else {
      setValue("category", customValue);
    }
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomValue(val);
    setValue("category", val, { shouldValidate: true });
  };

  return (
    <div>
      <Label htmlFor="category">Category</Label>
      <div className="space-y-2">
        {inputMode === "select" ? (
          <>
            <FormSelect
              label=""
              name="category"
              options={PRODUCT_CATEGORIES}
              register={register}
              error={error}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleModeSwitch("custom")}
              className="w-full text-xs"
            >
              + Custom Category
            </Button>
          </>
        ) : (
          <>
            <Input
              value={customValue}
              onChange={handleCustomChange}
              placeholder="Enter custom category"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleModeSwitch("select")}
              className="w-full text-xs"
            >
              ← Back to Standard Categories
            </Button>
          </>
        )}
        {error && <p className="text-sm text-destructive mt-1">{error.message}</p>}
      </div>
    </div>
  );
}
