import { HTMLAttributes } from "react";
import { UseControllerProps, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input, InputProps } from "../ui/input";
import { cn } from "@/lib";

type IProps<T> = {
  name: keyof T & string;
  label?: string;
} & UseControllerProps &
  InputProps;

export const FilteredInput = <T extends Record<string, any>>({
  name,
  label,
  className,
  ...rest
}: IProps<T>) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className='w-full'>
          {label && (
            <FormLabel className='font-inter font-semibold text-sm text-[#1C1939]'>
              {label}
            </FormLabel>
          )}

          <FormControl>
            <Input
              style={{
                boxShadow: "0px 1px 2px 0px #1018280D",
              }}
              className={cn("h-[44px] px-[14px] rounded-[8px]", className)}
              {...rest}
              {...field}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
