'use client';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { CardEditSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

type PaymentEditFormProps = {
  cardholderName: string;
  month: string;
  year: string;
};

export const PaymentEditForm = ({
  cardholderName,
  month,
  year,
}: PaymentEditFormProps) => {
  const form = useForm<z.infer<typeof CardEditSchema>>({
    resolver: zodResolver(CardEditSchema),
    defaultValues: {
      name: cardholderName,
      expiry_month: month,
      expiry_year: year,
    },
  });

  const onSubmit = (values: z.infer<typeof CardEditSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Name</FormLabel>

              <Input
                id="name"
                type="name"
                onChange={field.onChange}
                placeholder={cardholderName}
                required
              />

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="expiry_month"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="month">Expires</Label>

                <Select onValueChange={field.onChange} defaultValue={month}>
                  <FormControl>
                    <SelectTrigger id="month">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectItem value="1">January</SelectItem>
                    <SelectItem value="2">February</SelectItem>
                    <SelectItem value="3">March</SelectItem>
                    <SelectItem value="4">April</SelectItem>
                    <SelectItem value="5">May</SelectItem>
                    <SelectItem value="6">June</SelectItem>
                    <SelectItem value="7">July</SelectItem>
                    <SelectItem value="8">August</SelectItem>
                    <SelectItem value="9">September</SelectItem>
                    <SelectItem value="10">October</SelectItem>
                    <SelectItem value="11">November</SelectItem>
                    <SelectItem value="12">December</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expiry_year"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="year">Year</Label>

                <Select onValueChange={field.onChange} defaultValue={year}>
                  <FormControl>
                    <SelectTrigger id="year">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => (
                      <SelectItem
                        key={i}
                        value={`${new Date().getFullYear() + i}`}
                      >
                        {new Date().getFullYear() + i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-[28px]">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};
