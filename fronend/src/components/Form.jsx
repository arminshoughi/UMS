import React from "react";
import ctl from "@netlify/classnames-template-literals";
import { Controller, useFormContext } from "react-hook-form";
import Listbox, { ListboxProps } from "./Listbox";

export const formInputCN = ({ error }) =>
  ctl(`
  transition duration-200 w-full py-1.5 px-2 border border-gray-300 rounded-sm
  focus:outline-none focus:ring-2 disabled:opacity-90
  ${error ? "focus:ring-red-600" : "focus:ring-indigo-700"}
`);
const formInputContainerCN = ({ inline, className }) =>
  ctl(`input-container ${className} ${inline ? "flex-row items-center" : ""}`);

export function FormErrorMessage({ name }) {
  const {
    formState: { errors },
  } = useFormContext();

  return errors[name] ? (
    <span style={{ fontSize: "0.8rem" }}>asdasd</span>
  ) : null;
}

export function FormListbox({ name, className, type = "string", ...rest }) {
  const { control } = useFormContext();

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange, ...field } }) => (
          <Listbox
            className={`w-full ${className}`}
            value={type === "string" ? value : value?.toString()}
            onChange={(value) =>
              type === "string" ? onChange(value) : onChange(Number(value))
            }
            {...field}
            {...rest}
          />
        )}
      />
      <FormErrorMessage name={name} />
    </>
  );
}
export function FormLabeledListbox({
  name,
  label,
  isLoading,
  disabled,
  type = "string",
  children,
  className,
  inline,
  chosen,
  ...rest
}) {
  return (
    <div className={formInputContainerCN({ className, inline })} {...rest}>
      <label className="text-sm">{label}</label>
      <FormListbox
        name={name}
        isLoading={isLoading}
        disabled={disabled}
        type={type}
        chosen={chosen}
      >
        {children}
      </FormListbox>
    </div>
  );
}
