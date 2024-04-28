'use client';

import * as z from 'zod';

import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { NameSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { ChangeCountry } from '@/server/actions/accountProfile/change-country';

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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getCountries } from '@/server/data/getStateAndCountries';

export function CountryChangeForm({ UserCountry }: any) {
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof NameSchema>>({
    resolver: zodResolver(NameSchema),
    defaultValues: {
      name: UserCountry,
    },
  });

  const { data: countries, isFetched } = useQuery({
    queryFn: async () => await getCountries(),
    queryKey: ['countries'],
  });

  const onSubmit = (values: z.infer<typeof NameSchema>) => {
    startTransition(() => {
      ChangeCountry(values)
        .then((data) => {
          if (data.success) {
            toast({
              title: 'Country Change',
              description: 'Your country has been successfully changed!',
            });
          }

          if (data.error) {
            toast({
              title: 'Country Change',
              description: data.error,
            });
          }
        })
        .catch((error) => {
          toast({
            title: 'Country Change',
            description: error,
          });
        });
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Country</CardTitle>
        <CardDescription>
          Please select the country you are currently residing in.
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
                        {isFetched &&
                          countries.sort().map((country: string) => (
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
