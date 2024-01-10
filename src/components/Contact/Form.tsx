"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";

import { ContactFormSchema } from "@/lib/ContactFormSchema";
import { sendMail } from "@/app/_actions";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export type ContactFormInputs = z.infer<typeof ContactFormSchema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormInputs>({ resolver: zodResolver(ContactFormSchema) });

  const processForm: SubmitHandler<ContactFormInputs> = async data => {
    const result = await sendMail(data);

    if (result?.success) {
      console.log({ data: result.data });
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
      reset();
      return;
    }
    console.log(result?.error);
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "There was a problem with your request.",
    });
  };
  return (
    <form onSubmit={handleSubmit(processForm)} className="self-start">
      <h2 className="title-secondary ">Get in touch</h2>
      <div className="flex gap-4 pb-4 pt-3">
        {/* Name field */}
        <div className="flex-1">
          <input
            className=" border-2 border-accent w-full p-2 placeholder:capitalize rounded-lg"
            placeholder="name"
            {...register("name")}
          />
          {errors.name?.message && (
            <p className="ml-1 mt-1 text-sm text-destructive">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email field */}
        <div className="flex-1">
          <input
            className="flex-1 border-2 border-accent w-full p-2 placeholder:capitalize rounded-lg"
            placeholder="email"
            {...register("email")}
          />
          {errors.email?.message && (
            <p className="ml-1 mt-1 text-sm text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>
      {/* Message field */}
      <div className="">
        <textarea
          rows={5}
          placeholder="message"
          className="border-2 border-accent w-full p-3 placeholder:capitalize rounded-lg"
          {...register("message")}
        />
        {errors.message?.message && (
          <p className="ml-1 text-sm text-destructive">
            {errors.message.message}
          </p>
        )}
      </div>
      <Button type="submit" size={"lg"} className="mt-4 bg-dark text-base hover:tracking-wide">
        Submit
      </Button>
    </form>
  );
}
