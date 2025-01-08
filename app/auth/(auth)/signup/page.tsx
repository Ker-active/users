"use client";

import { AuthHeader } from "../../../../components/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../../components/ui/button";
import { Form } from "../../../../components/ui/form";
import { FormFieldType } from "@/lib/utils";
import { useRouter } from "nextjs-toploader/app";
import { RegisterSchema, TRegister } from "@/schemas/auth";
import { useTransition } from "react";
import { register } from "@/actions/auth";
import { toast } from "sonner";
import { Routes } from "@/lib";
import { FormSchemaProvider } from "@/providers";
import { FormInput } from "@/components/forms";

const fields: FormFieldType<TRegister> = [
  {
    name: "fullname",
    label: "Full Name",
    placeholder: "Enter full name",
    type: "text",
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    placeholder: "Enter phone number",
    type: "tel",
  },
  {
    name: "email",
    label: "Email address",
    placeholder: "Enter email address",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "****",
    type: "password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "****",
    type: "password",
  },
] as const;

export default function Signup() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<TRegister>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      userType: "USERS",
    },
  });
  const router = useRouter();

  function onSubmit(values: TRegister) {
    startTransition(() => {
      register(values).then((response) => {
        if (response?.error) {
          toast.error(response?.error);
        }
        if (response.success) {
          toast.success(response.success);
          router.replace(
            `${Routes.activity}?token=${response.token}&userId=${response.userId}`
          );
        }
      });
    });
  }

  return (
    <>
      <AuthHeader
        desc='Already have an account?'
        title='Get started with ker Active'
        href={Routes.login}
      />
      <Form {...form}>
        <FormSchemaProvider schema={RegisterSchema}>
          <form
            id='formId'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-[15px]'
          >
            {fields.map((field) => (
              <FormInput {...field} key={field.name} />
            ))}
          </form>
        </FormSchemaProvider>
      </Form>
      <footer>
        <Button disabled={isPending} form='formId' type='submit'>
          Next
        </Button>
      </footer>
    </>
  );
}
