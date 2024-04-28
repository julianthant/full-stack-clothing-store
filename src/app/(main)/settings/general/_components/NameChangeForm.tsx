'use client';

import * as z from 'zod';

import { useForm } from 'react-hook-form';
import { NameSchema } from '@/schemas';
import { ChangeName } from '@/server/actions/accountProfile/change-name';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';

import { Input } from '@nextui-org/react';
import { Icons } from '@/components/utils/Icons';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

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

  const { toast } = useToast();

  const form = useForm<z.infer<typeof NameSchema>>({
    resolver: zodResolver(NameSchema),
    defaultValues: {
      name: UserName,
    },
  });

  const onSubmit = (values: z.infer<typeof NameSchema>) => {
    startTransition(() => {
      ChangeName(values).then((data) => {
        if (data.success) {
          toast({
            title: 'Name Change',
            description: 'Your name has been successfully changed',
          });
        }

        if (data.error) {
          toast({
            title: 'Name Change',
            description: data.error,
          });
        }
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
                      key="inside"
                      {...field}
                      type="name"
                      variant="bordered"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      placeholder="John Doe"
                      radius="sm"
                      disabled={isPending}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between border-t px-6 py-3">
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
