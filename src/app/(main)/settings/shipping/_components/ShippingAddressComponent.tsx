import * as z from 'zod';

import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { useTransition } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

import { zodResolver } from '@hookform/resolvers/zod';
import { addressSchema } from '@/schemas';
import { RemoveAddress } from '@/server/actions/accountAddresses/remove-address';
import { getStateAndCountries } from '@/server/data/get-state-and-countries';

import { Input } from '@/components/ui/Input';
import { Icons } from '@/components/utils/Icons';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

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

export function ShippingAddressComponent({
  shippingAddress,
  refetch,
  index,
  userName,
}: any) {
  const [isLoading, startTransition] = useTransition();

  const queryClient = useQueryClient();

  const { data, isFetched } = useQuery({
    queryFn: async () => await getStateAndCountries(),
    queryKey: ['countries-and-states'],
  });

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      country: shippingAddress?.country,
      fullName: shippingAddress?.fullName,
      phoneNumber: shippingAddress?.phoneNumber,
      streetAddress: shippingAddress?.streetAddress,
      streetOptional: shippingAddress?.streetOptional,
      city: shippingAddress?.city,
      states: shippingAddress?.states,
      zipCode: shippingAddress?.zipCode,
      deliveryInstructions: shippingAddress?.deliveryInstructions,
      defaultAddress: shippingAddress?.defaultAddress,
    },
  });

  const { mutateAsync: removeShippingAddress, isPending } = useMutation({
    mutationFn: () => RemoveAddress(shippingAddress.id),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });

      const toast = (await import('@/components/ui/use-toast')).toast;

      toast({
        duration: 5000,
        title: 'Payment Method: Remove',
        description: 'Payment method removed successfully!',
      });
    },
    onError: async () => {
      const toast = (await import('@/components/ui/use-toast')).toast;

      toast({
        duration: 5000,
        variant: 'destructive',
        title: 'Payment Method: Remove',
        description: 'Failed to remove payment method!',
      });
    },
  });

  const onSubmit = async (values: z.infer<typeof addressSchema>) => {
    const toast = (await import('@/components/ui/use-toast')).toast;

    const UpdateAddress = await import(
      '@/server/actions/accountAddresses/update-address'
    ).then((mod) => mod.UpdateAddress);

    startTransition(() => {
      UpdateAddress(values, shippingAddress.id)
        .then((data) => {
          if (data.success) {
            toast({
              title: `${values.fullName}'s Shipping Address`,
              description: 'Your shipping has been successfully updated!',
            });

            refetch();
          }

          if (data.error) {
            toast({
              title: `${values.fullName}'s Shipping Address`,
              description: data.error,
              variant: 'destructive',
            });
          }
        })
        .catch((error) => {
          toast({
            title: `${values.fullName}'s Shipping Address`,
            description: error,
            variant: 'destructive',
          });
        });
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {shippingAddress.fullName}&apos;s{' '}
          {shippingAddress.defaultAddress && 'Default '}
          Shipping Address
        </CardTitle>
        <CardDescription>
          <span className="font-bold">{userName}&apos;s</span> Address Line{' '}
          {index + 1}
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-3">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="country">Country/Region</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={shippingAddress?.country}
                    value={field.value}
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
                        {isFetched &&
                          data?.countries &&
                          data.countries
                            ?.toSorted((a, b) => a.localeCompare(b))
                            ?.map((country) => (
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
                    defaultValue={field.value}
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
                    defaultValue={field.value}
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
                      defaultValue={field.value}
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
                      defaultValue={field.value}
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
                  <FormItem className="w-full">
                    <FormLabel htmlFor="city">City</FormLabel>
                    <Input
                      id="city"
                      onChange={field.onChange}
                      disabled={isPending}
                      defaultValue={field.value}
                    />
                  </FormItem>
                )}
              />

              {form.watch('country') === 'United States' && (
                <FormField
                  control={form.control}
                  name="states"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel htmlFor="states">States</FormLabel>

                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={shippingAddress?.country}
                        disabled={isPending}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>States</SelectLabel>
                            {isFetched &&
                              data?.states &&
                              data.states
                                ?.toSorted((a, b) => a.localeCompare(b))
                                ?.map((state) => (
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
                  <FormItem className="w-full">
                    <FormLabel htmlFor="zipcode">ZIP Code</FormLabel>
                    <Input
                      id="zipCode"
                      onChange={field.onChange}
                      defaultValue={field.value}
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
                    defaultValue={field.value}
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
                      defaultChecked={field.value}
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
          </CardContent>

          <CardFooter className="flex justify-between gap-2 border-t px-6 py-3">
            <CardDescription className="w-full">
              Your address will be permanently removed from your account.
            </CardDescription>
            <div className="flex items-center justify-end gap-3">
              <Button
                disabled={isPending}
                variant={'destructive'}
                onClick={() => removeShippingAddress()}
                type="button"
              >
                {isPending && (
                  <Icons.spinner
                    className={cn('mr-2 h-4 w-4 animate-spin shadow-none')}
                  />
                )}
                Remove
              </Button>

              <Button disabled={isLoading} variant={'outline'} type="submit">
                {isLoading && (
                  <Icons.spinner
                    className={cn('mr-2 h-4 w-4 animate-spin shadow-none')}
                  />
                )}
                Save
              </Button>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
