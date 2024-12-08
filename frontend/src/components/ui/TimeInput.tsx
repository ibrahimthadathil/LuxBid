import React, { useState } from "react";
import { Clock, Calendar } from 'lucide-react';
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormRegisterReturn } from "react-hook-form";

interface DateTimeSelectProps {
  id: string;
  value?: Date;
  onValidate?: UseFormRegisterReturn;
  label: string;
  onChange?: (value: Date) => void;
  error?:string
}

const DateTimeSelect=({
  id,
  value,
  onValidate,
  label,
  onChange,
  error
}: DateTimeSelectProps)=> {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);
  const [selectedTime, setSelectedTime] = useState<string>("");

  // Generate time options from 12-hour format with AM/PM
  const timeOptions = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2) % 12 || 12;
    const minute = i % 2 === 0 ? "00" : "30";
    const period = Math.floor(i / 2) < 12 ? "AM" : "PM";
    return {
      value: `${hour.toString().padStart(2, "0")}:${minute} ${period}`,
      label: `${hour.toString().padStart(2, "0")}:${minute} ${period}`,
    };
  });

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date && selectedTime && onChange) {
      const [hours, minutes] = selectedTime.split(':');
      const [time, period] = selectedTime.split(' ');
      date.setHours(
        period === 'PM' ? parseInt(hours) + 12 : parseInt(hours),
        parseInt(minutes)
      );
      onChange(date);
    }
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
    if (selectedDate && onChange) {
      const [hours, minutes] = time.split(':');
      const [_, period] = time.split(' ');
      const newDate = new Date(selectedDate);
      newDate.setHours(
        period === 'PM' ? parseInt(hours) + 12 : parseInt(hours),
        parseInt(minutes.split(' ')[0])
      );
      onChange(newDate);
    }
  };

  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium mb-1 block">
        {label}
      </label>
      <div className="flex space-x-2">
        <div className="flex-1">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MMMM d, yyyy"
            className="w-full h-8 px-3 py-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            customInput={
              <div className="flex items-center cursor-pointer">
                <Calendar className="mr-2 h-4 w-4" />
                <span>{selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select date"}</span>
              </div>
            }
          />
        </div>
        <div className="flex-1">
          <Select
            value={selectedTime}
            onValueChange={handleTimeChange}
            {...(onValidate && { ...onValidate })}
          >
            <SelectTrigger id={id} className="h-8 text-sm">
              <Clock className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              {timeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

export default DateTimeSelect

