"use client";

import { useState, useCallback, forwardRef } from "react";
import * as Headless from "@headlessui/react";
import { Input } from "./input";
import { ZodString } from "zod";
const dateTypes = ["date", "datetime-local", "month", "time", "week"];
type DateType = (typeof dateTypes)[number];

export const ValidatedInput = forwardRef(function ValidatedInput(
  {
    wasSubmitted,
    errors,
    fieldSchema,
    ...props
  }: {
    className?: string;
    wasSubmitted: boolean;
    errors?: string[];
    fieldSchema: ZodString;
    type?:
      | "email"
      | "number"
      | "password"
      | "search"
      | "tel"
      | "text"
      | "url"
      | DateType;
  } & Omit<Headless.InputProps, "as" | "className">,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);

  const getErrors = useCallback(() => {
    const validationResult = fieldSchema.safeParse(value);
    return validationResult.success
      ? []
      : validationResult.error.flatten().formErrors;
  }, [fieldSchema, value]);

  const fieldErrors = errors || getErrors();

  const shouldRenderErrors = !!errors || wasSubmitted || touched;

  const handleBlur = () => {
    setTouched(true);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.currentTarget.value);

  return (
    <div className="flex flex-col gap-2">
      <Input
        ref={ref}
        onBlur={handleBlur}
        onChange={handleChange}
        invalid={fieldErrors.length > 0 && shouldRenderErrors}
        {...props}
      />
      {fieldErrors.length > 0 && (
        <Headless.Transition
          show={shouldRenderErrors}
          appear
          enter="transition-opacity duration-400"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-250"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="flex flex-col gap-1">
            {fieldErrors.map((error, index) => (
              <span key={index} className="text-red-400 text-sm">
                {error}
              </span>
            ))}
          </div>
        </Headless.Transition>
      )}
    </div>
  );
});
