'use client';

import * as z from 'zod';
import axios from 'axios';

import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition, useState, useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { addressSchema } from '@/schemas';
import { UpdateAddress } from '@/actions/accountAddresses/update-address';

import { Icons } from '@/components/utils/Icons';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import { Spinner } from '@nextui-org/react';
import { Checkbox } from '@/components/ui/checkbox';

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

interface CountryEditProps {
  countryNames: string[];
  states: string[];
}

export function UpdateAddressForm({ countryNames, states }: CountryEditProps) {
  const [address, setAddress] = useState<Address>();
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const params = useSearchParams();

  const id = params.get('address-id');

  useEffect(() => {
    (async () => {
      const existingAddress = await axios.get(
        `/api/addresses/getUnique/${id as string}`
      );

      setAddress(existingAddress.data);
    })();
  }, [id]);

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
  });

  useEffect(() => {
    if (!!address) {
      form.reset({
        country: address?.country || '',
        fullName: address?.fullName || '',
        phoneNumber: address?.phoneNumber || '',
        streetAddress: address?.streetAddress || '',
        streetOptional: address?.streetOptional || '',
        city: address?.city || '',
        states: address?.states || '',
        zipCode: address?.zipCode,
        deliveryInstructions: address?.deliveryInstructions || '',
        defaultAddress: address?.defaultAddress,
      });
    }
  }, [address, form]);

  const onSubmit = (values: z.infer<typeof addressSchema>) => {
    startTransition(() => {
      UpdateAddress(values, id as string).then((data) => {
        if (data.success) {
          router.push(
            '/settings/?menu=Account&subMenu=Addresses&success=true&message=' +
              encodeURIComponent(data.success)
          );
        }

        if (data.error) {
          router.push(
            '/settings/?menu=Account&subMenu=Addresses&success=false&message=' +
              encodeURIComponent(data.error)
          );
        }
      });
    });
  };

  return (
    <Card className="border-0 shadow-none p-0 w-[500px]">
      <CardHeader>
        <CardTitle>Update Address</CardTitle>
        <CardDescription>Edit your existing address.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {!!address && (
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
                      defaultValue={address.country}
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
                      defaultValue={address.fullName}
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
                      defaultValue={address.phoneNumber}
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
                        defaultValue={address.streetAddress}
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
                        defaultValue={address.streetOptional as string}
                      />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-2">
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
                        defaultValue={address.city}
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
                          defaultValue={address.states as string}
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
                        defaultValue={address.zipCode}
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
                      defaultValue={address.deliveryInstructions as string}
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
                        defaultChecked={address.defaultAddress}
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
                  Update Address
                </Button>
              </div>
            </form>
          </Form>
        )}

        {!address && <Spinner color="primary" className="my-4" />}
      </CardContent>
    </Card>
  );
}
