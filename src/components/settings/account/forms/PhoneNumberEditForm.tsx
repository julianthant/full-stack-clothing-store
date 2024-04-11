'use client';

import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { PhoneNumberSchema } from '@/schemas';
import { ChangePhoneNumber } from '@/actions/accountProfile/change-phone-number';

import { cn } from '@/lib/utils';
import { Icons } from '../../../utils/Icons';
import { Input } from '@nextui-org/react';
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

interface PhoneNumberEditForm extends React.HTMLAttributes<HTMLDivElement> {
  phoneCodes: { name: string; dialCode: string }[];
}

export function PhoneNumberEditForm({
  className,
  phoneCodes,
  ...props
}: PhoneNumberEditForm) {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof PhoneNumberSchema>>({
    resolver: zodResolver(PhoneNumberSchema),
    defaultValues: {
      code: 'United States of America (+1)',
    },
  });

  const onSubmit = (values: z.infer<typeof PhoneNumberSchema>) => {
    startTransition(() => {
      ChangePhoneNumber(values).then((data) => {
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

  const formatPhoneNumber = (input: string) => {
    const cleaned = ('' + input).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      return '(' + match[1] + ')-' + match[2] + '-' + match[3];
    }
    return input;
  };

  return (
    <div className={cn('grid gap-6 w-[300px]', className)} {...props}>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Primary Phone Number
        </h1>
        <p className="text-sm text-muted-foreground">Enter your new number</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-1">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only" htmlFor="email">
                      Email
                    </FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue="United States of America-1"
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="United States of America (+1)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Countries</SelectLabel>
                          {phoneCodes
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((phoneCode) => (
                              <SelectItem
                                value={`${phoneCode.name}-${phoneCode.dialCode}`}
                                key={`${phoneCode.name}-${phoneCode.dialCode}`}
                              >
                                {phoneCode.name} (+{phoneCode.dialCode})
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only" htmlFor="email">
                      Phone Number
                    </FormLabel>

                    <FormControl>
                      <Input
                        key="inside"
                        {...field}
                        variant="bordered"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        placeholder="(000)-000-0000"
                        radius="sm"
                        disabled={isPending}
                        onChange={(e) => {
                          const value = e.target.value;
                          const formatted = formatPhoneNumber(value);
                          field.onChange(formatted);
                        }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button disabled={isPending} className="mt-2 w-full" type="submit">
              {isPending && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Set Phone Number
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
