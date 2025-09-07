import { z } from "zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { insertAccountSchema, insertTransactionSchema } from "@/db/schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";




const formSchema = z.object({
    date : z.coerce.date(),
    accountId: z.string(),
    categoryId: z.string().nullable().optional(),
    payee: z.string(),
    amount: z.number(),
    notes:z.string().nullable().optional(),
})

const apiSchema = insertTransactionSchema.omit({
  id:true,
});
type FormValues = z.input<typeof formSchema>
type apiFormValues =z.input<typeof apiSchema>

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: apiFormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
  accountOptions : { label:string; value : string}[];
  categoryOptions : { label:string; value : string}[];
  onCreateAccount : ( name:string) =>void;
  onCreateCategory : ( name:string) =>void;


};

export const NewTransactionForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
  accountOptions,
  categoryOptions,
  onCreateAccount,
  onCreateCategory,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (values: FormValues) => {
  console.log({values});
  
  // Convert FormValues to apiFormValues format
  const apiValues: apiFormValues = {
    date: values.date,
    accountId: values.accountId,
    categoryId: values.categoryId || null,
    payee: values.payee,
    amount: values.amount,
    notes: values.notes || null,
  };
  
  onSubmit(apiValues);
};

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} 
      className="space-y-4 pt-4">
        
        <FormField
          name="accountId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account</FormLabel>
              <FormControl>
                 <Select 
                 placeholder="select account"
                 options={accountOptions}
                 onCreate={onCreateAccount}
                 value={field.value}
                 onChange={field.onChange}
                 disabled={disabled}
                 />
              </FormControl>
            </FormItem>
          )}
        />
        
        <Button className="w-full" disabled={disabled}>
          {id ? "Save changes" : "Create account"}
        </Button>
        {!!id && (
          <Button
            type="button"
            disabled={disabled}
            onClick={handleDelete}
            className="w-full"
            variant="outline"
          >
            <Trash className="size-4 pr-2" />
            Delete account
          </Button>
        )}
      </form>
    </Form>
  );
};