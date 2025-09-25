"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { ReactElement, cloneElement } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

type Variant = "default" | "inline";

interface FormFieldInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  message?: string;
  /** Child component (must be a single input-like component) */
  children: ReactElement<object>;
  className?: string;
  /** Layout variant: default (stacked) or inline (for checkbox/switch) */
  variant?: Variant;
}

export function FormFieldInput<T extends FieldValues>({
  control,
  name,
  label,
  description,
  message,
  children,
  className,
  variant = "default",
}: FormFieldInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            variant === "inline" &&
              "flex flex-row items-center space-x-3 space-y-0",
            className
          )}
        >
          {variant === "default" && label && <FormLabel>{label}</FormLabel>}

          <FormControl>
            {cloneElement(children, {
              ...field,
              ...children.props, // preserve manually passed props
            })}
          </FormControl>

          {variant === "inline" && label && <FormLabel>{label}</FormLabel>}

          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage>{message}</FormMessage>
        </FormItem>
      )}
    />
  );
}
