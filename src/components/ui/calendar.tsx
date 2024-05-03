'use client';

import * as React from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { CaptionProps, DayPicker, useNavigation } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { format } from 'date-fns';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function CustonNavbar(props: CaptionProps) {
  const { currentMonth, goToMonth, nextMonth, previousMonth } = useNavigation();

  const date = new Date(currentMonth);

  const nextYear = () => {
    const nextYearDate = new Date(currentMonth);
    nextYearDate.setFullYear(nextYearDate.getFullYear() + 1);
    goToMonth(nextYearDate);
  };

  const previousYear = () => {
    const previousYearDate = new Date(currentMonth);
    previousYearDate.setFullYear(previousYearDate.getFullYear() - 1);
    goToMonth(previousYearDate);
  };

  return (
    <div className="justify-between flex items-center">
      <div className="flex gap-2">
        <Button
          onClick={() => previousYear()}
          variant={'outline'}
          className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        >
          <DoubleArrowLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => previousMonth && goToMonth(previousMonth)}
          variant={'outline'}
          className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
      </div>

      <p className="text-sm font-medium">
        {format(props.displayMonth, 'MMM yyy')}
      </p>

      <div className="flex gap-2">
        <Button
          onClick={() => nextMonth && goToMonth(nextMonth)}
          variant={'outline'}
          className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => nextYear()}
          variant={'outline'}
          className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        >
          <DoubleArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3 text-base shadow-none', className)}
      classNames={{
        dropdown: 'text-base shadow-none',
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md'
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-8 w-8 p-0 font-normal aria-selected:opacity-100'
        ),
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground',
        day_outside:
          'day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{ Caption: CustonNavbar }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
