'use client';

import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useTransition, HTMLAttributes } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { genderSchema } from '@/schemas';
import { ChangeGender } from '@/server/actions/accountProfile/change-gender';

import { cn } from '@/lib/utils';
import { Icons } from '../../../../../../../../components/utils/Icons';
import { Button } from '../../../../../../../../components/ui/button';
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
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PhoneNumberEditForm extends HTMLAttributes<HTMLDivElement> {}

export function GenderForm({ className, ...props }: PhoneNumberEditForm) {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof genderSchema>>({
    resolver: zodResolver(genderSchema),
  });

  const onSubmit = (values: z.infer<typeof genderSchema>) => {
    startTransition(() => {
      ChangeGender(values).then((data) => {
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
        <h1 className="text-2xl font-semibold tracking-tight">Gender</h1>
        <p className="text-sm text-muted-foreground">Change your gender</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only" htmlFor="email">
                  Gender
                </FormLabel>

                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isPending} className="mt-2 w-full" type="submit">
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Set Gender
          </Button>
        </form>
      </Form>
    </div>
  );
}
