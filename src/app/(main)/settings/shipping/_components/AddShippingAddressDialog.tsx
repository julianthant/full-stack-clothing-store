import * as z from 'zod';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addressSchema } from '@/schemas';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useTransition } from 'react';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/Input';
import { Icons } from '@/components/utils/Icons';
import { Button } from '@/components/ui/button';
import { Divider } from '@nextui-org/react';
import { Checkbox } from '@/components/ui/checkbox';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

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
import { getStateAndCountries } from '@/server/data/get-state-and-countries';

export function AddShippingAddressDialog({ user, open, setOpen }: any) {
  const [isPending, startTransition] = useTransition();

  const queryClient = useQueryClient();

  const { data, isFetched } = useQuery({
    queryFn: async () => await getStateAndCountries(),
    queryKey: ['countries-and-states'],
  });

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: '',
      streetAddress: '',
      streetOptional: '',
      city: '',
      country: 'United States',
      zipCode: '',
      phoneNumber: '',
      states: 'California',
      deliveryInstructions: '',
      defaultAddress: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof addressSchema>) => {
    const toast = (await import('@/components/ui/use-toast')).toast;

    const AddAddress = (
      await import('@/server/actions/accountAddresses/add-new-address')
    ).AddAddress;

    startTransition(() => {
      AddAddress(values)
        .then((data) => {
          if (data.success) {
            toast({
              title: 'Shipping Address',
              description: 'Your shipping address has been successfully added!',
            });

            queryClient.invalidateQueries({
              queryKey: ['addresses', user?.id],
            });
            setOpen(false);
          }

          if (data.error) {
            toast({
              title: 'Shipping Address',
              description: data.error,
              variant: 'destructive',
            });
            setOpen(false);
          }
        })
        .catch((error) => {
          toast({
            title: 'Shipping Address',
            description: error,
            variant: 'destructive',
          });
        })
        .finally(() => {
          form.reset();
        });
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="max-sm:hidden">Add new address</Button>
      </DialogTrigger>
      <DialogContent className={cn('px-0 pt-6 pb-0 gap-0 max-sm:hidden')}>
        <DialogHeader className="px-6 pb-6">
          <DialogTitle>Add a Shipping Address</DialogTitle>
          <DialogDescription>
            Add a shipping address for{' '}
            <span className="font-bold">{user && user?.name}</span>
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="px-6 grid gap-2">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel
                      className={cn('font-light tracking-wider')}
                      htmlFor="country"
                    >
                      Country/Region
                    </FormLabel>

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
                  <FormItem className="space-y-1.5">
                    <FormLabel
                      className={cn('font-light tracking-wider')}
                      htmlFor="name"
                    >
                      Full Name
                    </FormLabel>
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
                  <FormItem className="space-y-1.5">
                    <FormLabel
                      className={cn('font-light tracking-wider')}
                      htmlFor="number"
                    >
                      Phone Number
                    </FormLabel>
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
                    <FormItem className="space-y-1.5">
                      <FormLabel
                        className={cn('font-light tracking-wider')}
                        htmlFor="address"
                      >
                        Address
                      </FormLabel>
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
                    <FormItem className="space-y-1.5">
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
                    <FormItem className="space-y-1.5">
                      <FormLabel
                        className={cn('font-light tracking-wider')}
                        htmlFor="city"
                      >
                        City
                      </FormLabel>
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
                      <FormItem className="space-y-1.5">
                        <FormLabel
                          className={cn('font-light tracking-wider')}
                          htmlFor="states"
                        >
                          States
                        </FormLabel>

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
                    <FormItem className="space-y-1.5">
                      <FormLabel
                        className={cn('font-light tracking-wider')}
                        htmlFor="zipcode"
                      >
                        ZIP Code
                      </FormLabel>
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
                  <FormItem className="space-y-1.5">
                    <FormLabel
                      className={cn('font-light tracking-wider')}
                      htmlFor="zipcode"
                    >
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
                  <FormItem className="flex items-center gap-2 pb-3 pt-2">
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
            </div>

            <Divider className="h-[1px]" />

            <DialogFooter
              className={cn(
                'flex items-center justify-between w-full sm:justify-between px-6 py-4 bg-muted/50'
              )}
            >
              <Button
                variant={'outline'}
                className={cn('hover:bg-gray-100 shadow-none')}
                type="button"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button disabled={isPending} type="submit">
                {isPending && (
                  <Icons.spinner
                    className={cn('mr-2 h-4 w-4 animate-spin shadow-none')}
                  />
                )}
                Continue
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
