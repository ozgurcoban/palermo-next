"use server";

import { z } from "zod";
import { Resend } from "resend";
import { ContactFormSchema } from "@/lib/ContactFormSchema";
import ContactFormEmail from "@/components/Contact/EmailTemplate";

type ContactFormInputs = z.infer<typeof ContactFormSchema>;
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendMail(data: ContactFormInputs) {
  const result = ContactFormSchema.safeParse(data);

  if (result.success) {
    const { name, email, message } = result.data;

    try {
      const data = await resend.emails.send({
        from: "info@palermo-uppsala.se",
        to: ["info@palermo-uppsala.se"],
        subject: "Message from the Palermo website",
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        react: ContactFormEmail({ name, email, message }),
      });

      const { error } = data;
      if (error) return { success: false, error };
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  }
  if (result.error) {
    return { success: false, error: result.error.format() };
  }
}
