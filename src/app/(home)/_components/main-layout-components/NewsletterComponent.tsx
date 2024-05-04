'use client';

import * as z from 'zod';
import Link from 'next/link';

import { Input } from '@nextui-org/input';
import { Icons } from '@/components/utils/Icons';
import { Button } from '@/components/ui/button';
import { IntegralCF } from '@/fonts/fonts.config';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';

import { useForm } from 'react-hook-form';
import { EmailSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';

export const NewsletterComponent = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
  });

  const onSubmit = (values: z.infer<typeof EmailSchema>) => {
    startTransition(() => {
      console.log(values);
    });
  };

  return (
    <div className="main-container relative z-10">
      <div className="bg-black rounded-[23px] flex items-center justify-between lg:h-48 h-full lg:px-20 max-lg:flex-col max-lg:py-6 max-lg:gap-y-4 max-sm:px-4">
        <div className="lg:w-[650px] w-full lg:px-0 lg:text-left md:px-8 sm:text-center ">
          <p
            className={`text-white lg:text-5xl sm:text-4xl text-3xl font-bold ${IntegralCF.className}`}
          >
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </p>
        </div>

        <div className="space-y-3 max-lg:w-full px-0 max-lg:px-24 max-md:px-8 max-sm:px-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only" htmlFor="email">
                      Email
                    </FormLabel>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      classNames={{
                        inputWrapper:
                          'rounded-full lg:w-[350px] w-full lg:h-[48px] h-[44px] bg-white',
                      }}
                      startContent={
                        <Icons.mailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      suppressHydrationWarning={true}
                    />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          <Button
            type="submit"
            asChild
            variant={'outline'}
            className="bg-white text-black rounded-full lg:w-[350px] w-full lg:h-12 h-11"
          >
            <Link href={'/'}>Subscribe to Newsletter</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
