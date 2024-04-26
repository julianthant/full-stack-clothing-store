'use client';

import * as z from 'zod';
import { useTransition } from 'react';

import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { addressSchema } from '@/schemas';

import { Icons } from '@/components/utils/Icons';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { AddAddress } from '@/server/actions/accountAddresses/add-new-address';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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

type CountryEditProps = {
  countryNames: string[];
  states: string[];
};

export function AddAddressForm({ countryNames, states }: CountryEditProps) {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      country: 'United States',
      states: 'California',
    },
  });

  const onSubmit = (values: z.infer<typeof addressSchema>) => {
    startTransition(() => {
      AddAddress(values).then((data) => {
        if (data.success) {
          toast.success(data.success);
          router.push('/settings/account/addresses?success=true');
        }

        if (data.error) {
          toast.error(data.error);
          router.push('/settings/account/addresses');
        }
      });
    });
  };

  return (
    <Card className="border-0 shadow-none p-0 rounded-t-3xl sm:w-[500px]">
      <CardHeader>
        <CardTitle>Address</CardTitle>
        <CardDescription>Add a new address to your account.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Form {...form}>
          <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="country">Country/Region</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isPending}
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

            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Full Name</FormLabel>
                  <Input
                    id="fullName"
                    placeholder="First and Last name"
                    onChange={field.onChange}
                    disabled={isPending}
                  />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="number">Phone Number</FormLabel>
                  <Input
                    id="phoneNumber"
                    onChange={field.onChange}
                    disabled={isPending}
                  />
                </FormItem>
              )}
            />

            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="streetAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="address">Address</FormLabel>
                    <Input
                      id="streetAddress"
                      placeholder="Street address or P.O. Box"
                      onChange={field.onChange}
                      disabled={isPending}
                    />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="streetOptional"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only" htmlFor="address">
                      Optional Address
                    </FormLabel>
                    <Input
                      id="streetOptional"
                      placeholder="Apt, suite, unit, building, floor, etc."
                      onChange={field.onChange}
                      disabled={isPending}
                    />
                  </FormItem>
                )}
              />
            </div>

            <div className="sm:flex justify-between w-full gap-2">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="city">City</FormLabel>
                    <Input
                      id="city"
                      onChange={field.onChange}
                      disabled={isPending}
                    />
                  </FormItem>
                )}
              />

              {form.watch('country') === 'United States' && (
                <FormField
                  control={form.control}
                  name="states"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="states">States</FormLabel>

                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Countries</SelectLabel>
                            {states.sort().map((state) => (
                              <SelectItem value={state} key={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="zipcode">ZIP Code</FormLabel>
                    <Input
                      id="zipCode"
                      onChange={field.onChange}
                      disabled={isPending}
                    />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="deliveryInstructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="zipcode">
                    Delivery Instructions (optional)
                  </FormLabel>
                  <Input
                    id="deliveryInstructions"
                    placeholder="Add preferences, notes, access codes and more"
                    onChange={field.onChange}
                    disabled={isPending}
                  />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="defaultAddress"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 pb-1">
                  <FormLabel className="sr-only" htmlFor="default-payment">
                    Default Address
                  </FormLabel>
                  <FormControl>
                    <Checkbox
                      className="mr-0"
                      id="defaultAddress"
                      onCheckedChange={field.onChange}
                      disabled={isPending}
                      checked={field.value}
                    />
                  </FormControl>

                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Make this my default address
                  </label>
                </FormItem>
              )}
            />

            <div className="pt-1">
              <Button disabled={isPending} className="w-full" type="submit">
                {isPending && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Add Address
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
