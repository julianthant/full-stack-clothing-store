'use client';

import * as z from 'zod';

import { useForm } from 'react-hook-form';
import { dateSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/utils/Icons';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from '@radix-ui/react-icons';

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

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function DOBChangeForm({ UserDOB }: any) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof dateSchema>>({
    resolver: zodResolver(dateSchema),
    defaultValues: {
      date: new Date(UserDOB),
    },
  });

  const onSubmit = async (values: z.infer<typeof dateSchema>) => {
    const toast = (await import('@/components/ui/use-toast')).toast;

    const ChangeDOB = await import(
      '@/server/actions/accountProfile/change-dateOfBirth'
    ).then((mod) => mod.ChangeDOB);

    startTransition(() => {
      ChangeDOB(values)
        .then((data) => {
          if (data.success) {
            toast({
              title: 'Date of Birth Change',
              description: 'Your date of birth has been successfully changed!',
            });
          }

          if (data.error) {
            toast({
              title: 'Date of Birth Change',
              description: data.error,
              variant: 'destructive',
            });
          }
        })
        .catch((error) => {
          toast({
            title: 'Date of Birth Change',
            description: error,
            variant: 'destructive',
          });
        });
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Date of Birth</CardTitle>
        <CardDescription>Please select your date of birth.</CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="sr-only" htmlFor="date">
                    Date Of Birth
                  </FormLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[full] h-10 shadow-none pl-3 text-left text-base font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value.getUTCDay() ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        onSelect={field.onChange}
                        selected={field.value}
                        defaultMonth={UserDOB}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex justify-between gap-2 border-t px-6 py-3">
            <CardDescription>
              This will help us provide you with the best experience.
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
