'use client';

import * as z from 'zod';

import { useForm } from 'react-hook-form';
import { NameSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';

import { Input } from '@/components/ui/Input';
import { Icons } from '@/components/utils/Icons';
import { Button } from '@/components/ui/button';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function NameChangeForm({ UserName }: any) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NameSchema>>({
    resolver: zodResolver(NameSchema),
    defaultValues: {
      name: UserName,
    },
  });

  const onSubmit = async (values: z.infer<typeof NameSchema>) => {
    const toast = (await import('@/components/ui/use-toast')).toast;

    const ChangeName = await import(
      '@/server/actions/general/change-name'
    ).then((mod) => mod.ChangeName);

    startTransition(() => {
      ChangeName(values)
        .then((data) => {
          if (data.success) {
            toast({
              title: 'Name Change',
              description: 'Your name has been successfully changed!',
            });
          }

          if (data.error) {
            toast({
              title: 'Name Change',
              description: data.error,
              variant: 'destructive',
            });
          }
        })
        .catch((error) => {
          toast({
            title: 'Name Change',
            description: error,
            variant: 'destructive',
          });
        });
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Name</CardTitle>
        <CardDescription>
          Please enter your full name, or a display name you are comfortable
          with.
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only" htmlFor="email">
                    Name
                  </FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      type="name"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      placeholder="John Doe"
                      disabled={isPending}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between gap-2 border-t px-6 py-3">
            <CardDescription>
              Please use 32 characters at maximum.
            </CardDescription>
            <Button disabled={isPending} type="submit">
              {isPending && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
