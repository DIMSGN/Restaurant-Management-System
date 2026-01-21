import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FieldError, UseFormRegister } from "react-hook-form";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  step?: string;
  placeholder?: string;
  error?: FieldError;
  register: UseFormRegister<any>;
  registerOptions?: any;
}

export function FormField({
  label,
  name,
  type = "text",
  step,
  placeholder,
  error,
  register,
  registerOptions,
}: FormFieldProps) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type={type}
        step={step}
        placeholder={placeholder}
        {...register(name, registerOptions)}
      />
      {error && (
        <p className="text-sm text-destructive mt-1">{error.message}</p>
      )}
    </div>
  );
}

interface FormSelectProps {
  label: string;
  name: string;
  options: readonly string[] | { value: string; label: string }[];
  error?: FieldError;
  register: UseFormRegister<any>;
  placeholder?: string;
}

export function FormSelect({
  label,
  name,
  options,
  error,
  register,
  placeholder,
}: FormSelectProps) {
  const selectClass =
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <select id={name} {...register(name)} className={selectClass}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => {
          const value = typeof opt === "string" ? opt : opt.value;
          const label = typeof opt === "string" ? opt : opt.label;
          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
      {error && (
        <p className="text-sm text-destructive mt-1">{error.message}</p>
      )}
    </div>
  );
}

interface SimpleFieldProps {
  label: string;
  name: string;
  type?: string;
  step?: string;
  min?: string;
  placeholder?: string;
  value: string | number;
  onChange: (value: string) => void;
  required?: boolean;
}

export function SimpleField({
  label,
  name,
  type = "text",
  step,
  min,
  placeholder,
  value,
  onChange,
  required,
}: SimpleFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type={type}
        step={step}
        min={min}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </div>
  );
}
