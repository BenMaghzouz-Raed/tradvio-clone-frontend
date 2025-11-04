/* eslint-disable @typescript-eslint/no-explicit-any */
import { useController } from "react-hook-form";
import React from "react";

interface FormFieldProps {
  control: any;
  name: string;
  render: (props: { field: any; fieldState: any }) => React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({ control, name, render }) => {
  const controller = useController({ name, control });
  return <>{render({ field: controller.field, fieldState: controller.fieldState })}</>;
};

export default FormField;