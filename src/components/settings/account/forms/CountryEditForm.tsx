'use client';

import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useTransition, HTMLAttributes } from 'react';

import { NameSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeCountry } from '@/actions/accountProfile/change-country';

import { cn } from '@/lib/utils';
import { Icons } from '../../../utils/Icons';

import { Button } from '../../../ui/button';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CountryEditProps extends HTMLAttributes<HTMLDivElement> {
  countryNames: string[];
}

export function CountryEditForm({
  countryNames,
  className,
  ...props
}: CountryEditProps) {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof NameSchema>>({
    resolver: zodResolver(NameSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = (values: z.infer<typeof NameSchema>) => {
    startTransition(() => {
      ChangeCountry(values).then((data) => {
        if (data.success) {
          router.push(
            '/settings/?menu=Account&subMenu=Profile&success=true&message=' +
              encodeURIComponent(data.success)
          );
        }

        if (data.error) {
          router.push(
            '/settings/?menu=Account&subMenu=Profile&success=false&message=' +
              encodeURIComponent(data.error)
          );
        }
      });
    });
  };

  return (
    <div className={cn('grid gap-6 w-[300px]', className)} {...props}>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Country</h1>
        <p className="text-sm text-muted-foreground">
          Change your current country
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-1">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only" htmlFor="country">
                    Country
                  </FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Countries</SelectLabel>
                        {countryNames.sort().map((country) => (
                          <SelectItem value={country} key={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isPending} className="mt-2" type="submit">
              {isPending && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Select country
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
