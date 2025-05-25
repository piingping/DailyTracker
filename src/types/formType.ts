import { z } from "zod";

export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}
export const formSchema = z.object({
  date: z.string().min(1, { message: "Please select a date." }),
  mood: z.string().min(1, { message: "Tell me how you feel" }),
  note: z.string().min(1, { message: "Please Tell us about your day." }).max(50, { message: "Please keep it within 50 characters." }),
  todo: z.array(
    z.object({
      text: z.string().min(1).max(30, {message: 'Please keep it within 30 characters.'}),
      checked: z.boolean(),
    })
  ).min(1, { message: "Add at least one to-do item." }).max(10, {message: 'maximum 10'}),
  wakeUpTime: z.string().min(1, { message: "Please enter your wake-up time." }),
  sleepHour: z.coerce.number()
    .min(1, { message: "Sleep hours must be at least 1." })
    .max(24, { message: "Sleep hours can’t be more than 24." }),
  
});

// แบบนี้จะให้ TypeScript infer ว่า expense: Expense[] (ไม่ใช่ | undefined)
export type FormData = z.infer<typeof formSchema>;
