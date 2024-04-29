'use client';

import * as z from 'zod';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { genderSchema } from '@/schemas';
import { useTransition } from 'react';

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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function GenderChangeForm({ UserGender }: any) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof genderSchema>>({
    resolver: zodResolver(genderSchema),
    defaultValues: {
      gender: UserGender,
    },
  });

  const onSubmit = async (values: z.infer<typeof genderSchema>) => {
    const toast = (await import('@/components/ui/use-toast')).toast;

    const ChangeGender = await import(
      '@/server/actions/accountProfile/change-gender'
    ).then((mod) => mod.ChangeGender);

    startTransition(() => {
      ChangeGender(values)
        .then((data) => {
          if (data.success) {
            toast({
              title: 'Gender Change',
              description: 'Your gender has been successfully changed',
            });
          }

          if (data.error) {
            toast({
              title: 'Gender Change',
              description: data.error,
              variant: 'destructive',
            });
          }
        })
        .catch((error) => {
          toast({
            title: 'Gender Change',
            description: error,
            variant: 'destructive',
          });
        });
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gender</CardTitle>
        <CardDescription>Please choose your gender.</CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only" htmlFor="country">
                    Gender
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
                        <SelectLabel>Gender</SelectLabel>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="others">Others</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

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
