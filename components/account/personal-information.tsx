/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { FormFieldType } from "@/lib";
import { Button } from "../ui/button";
import { useGetUser } from "@/hooks/shared";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/api";

const schema = z.object({
  fullname: z.string().min(1, { message: "Fullname is required." }),
  email: z.string().email(),
  phoneNumber: z.string().min(11, { message: "Phone number is required." }),
  location: z.string().optional(),
});

type TSchema = z.infer<typeof schema>;

const fields: FormFieldType<TSchema> = [
  { name: "fullname", label: "Full Name", placeholder: "Enter fullname" },
  {
    name: "email",
    label: "Email address",
    placeholder: "Enter email address",
    type: "email",
    disabled: true,
  },
  {
    name: "phoneNumber",
    label: "Phone number",
    placeholder: "Enter phone number",
    type: "number",
    disabled: true,
  },
  { name: "location", label: "Location", placeholder: "Enter location" },
] as const;

export const PersonalInformation = () => {
  const formSchema = useForm<TSchema>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });
  const { data } = useGetUser();

  useEffect(() => {
    if (data) {
      formSchema.reset(data.data);
    }
  }, [data]);

  const { mutate, isPending } = useMutation({
    mutationFn: (arg: TSchema) => {
      const formData = new FormData();
      Object.entries(arg).forEach(([key, value]) => {
        formData.append(key, value);
      });
      return client.put(`/user/update/${data?.data._id}`, formData);
    },
  });

  function onSubmit(values: TSchema) {
    mutate(values);
  }

  return (
    <article className='flex bg-white px-[20px] py-[15px] rounded-[8px] flex-col gap-4'>
      <header>
        <h3 className='text-[#1C1939] text-[22px] font-semibold font-inter'>
          Personal Information
        </h3>
      </header>
      <hr />
      <Form {...formSchema}>
        <form
          onSubmit={formSchema.handleSubmit(onSubmit)}
          className='grid gap-x-4 gap-y-[18px] grid-cols-1 sm:grid-cols-2'
        >
          {fields.map((field) => (
            <FormField
              key={field.name}
              control={formSchema.control}
              name={field.name}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    <Input
                      className='border-0 outline-0 h-[50px] bg-off-white'
                      {...field}
                      {...formField}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button disabled={isPending} className='rounded-sm w-fit px-10'>
            Save
          </Button>
        </form>
      </Form>
    </article>
  );
};
