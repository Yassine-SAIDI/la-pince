import React, { useEffect, useRef } from "react";

interface DateInputProps {
  value?: Date;
  onChange: (date: Date) => void;
}

interface DateParts {
  day: number | "";
  month: number | "";
  year: number | "";
}

const DateInput: React.FC<DateInputProps> = ({ value, onChange }) => {
  const [date, setDate] = React.useState<DateParts>(() => {
    const d = value ? new Date(value) : new Date();
    return {
      day: d.getDate(),
      month: d.getMonth() + 1, // JavaScript months are 0-indexed
      year: d.getFullYear(),
    };
  });

  const monthRef = useRef<HTMLInputElement | null>(null);
  const dayRef = useRef<HTMLInputElement | null>(null);
  const yearRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const d = value ? new Date(value) : new Date();
    setDate({
      day: d.getDate(),
      month: d.getMonth() + 1,
      year: d.getFullYear(),
    });
  }, [value]);

  const validateDate = (field: keyof DateParts, value: number): boolean => {
    // Basic range checks
    if (
      (field === "day" && (value < 1 || value > 31)) ||
      (field === "month" && (value < 1 || value > 12)) ||
      (field === "year" && (value < 1000 || value > 9999)) // Adjusted year range based on input maxLength
    ) {
      return false;
    }

    // Create the potential new date state
    const potentialDate = { ...date, [field]: value };

    // Check if all parts are actual numbers before proceeding
    const yearNum = potentialDate.year;
    const monthNum = potentialDate.month;
    const dayNum = potentialDate.day;

    // Ensure all parts are numbers and not empty strings
    if (
      typeof yearNum !== "number" ||
      typeof monthNum !== "number" ||
      typeof dayNum !== "number"
    ) {
      // If any part isn't a number, it's not a fully valid date yet.
      return false;
    }

    // Now we know all parts are numbers, perform the Date object validation
    const d = new Date(yearNum, monthNum - 1, dayNum);

    // Check if the created date is valid and matches the input numbers
    return (
      !isNaN(d.getTime()) && // Check if the date is valid
      d.getFullYear() === yearNum &&
      d.getMonth() + 1 === monthNum &&
      d.getDate() === dayNum
    );
  };

  const handleInputChange =
    (field: keyof DateParts) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value ? Number(e.target.value) : "";
      const isValid =
        typeof newValue === "number" && validateDate(field, newValue);

      // If the new value is valid, update the date
      const newDate = { ...date, [field]: newValue };
      setDate(newDate);

      // only call onChange when the entry is valid AND all parts are numbers
      if (
        isValid &&
        typeof newDate.year === "number" &&
        typeof newDate.month === "number" &&
        typeof newDate.day === "number"
      ) {
        onChange(new Date(newDate.year, newDate.month - 1, newDate.day));
      }
    };

  const initialDate = useRef<DateParts>(date);

  const handleBlur =
    (field: keyof DateParts) =>
    (e: React.FocusEvent<HTMLInputElement>): void => {
      if (!e.target.value) {
        setDate(initialDate.current);
        return;
      }

      const newValue = Number(e.target.value);
      const isValid = validateDate(field, newValue);

      if (!isValid) {
        setDate(initialDate.current);
      } else {
        // If the new value is valid, update the initial value
        initialDate.current = { ...date, [field]: newValue };
      }
    };

  const handleKeyDown =
    (field: keyof DateParts) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Allow command (or control) combinations
      if (e.metaKey || e.ctrlKey) {
        return;
      }

      // Prevent non-numeric characters, excluding allowed keys
      if (
        !/^[0-9]$/.test(e.key) &&
        ![
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
          "Delete",
          "Tab",
          "Backspace",
          "Enter",
        ].includes(e.key)
      ) {
        e.preventDefault();
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();

        // Ensure current date parts are numbers before proceeding
        const currentYear = typeof date.year === "number" ? date.year : null;
        const currentMonth = typeof date.month === "number" ? date.month : null;
        const currentDay = typeof date.day === "number" ? date.day : null;

        if (
          currentYear === null ||
          currentMonth === null ||
          currentDay === null
        ) {
          return; // Cannot increment if date is incomplete
        }

        let newDateParts = {
          year: currentYear,
          month: currentMonth,
          day: currentDay,
        };

        if (field === "day") {
          const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
          if (currentDay === daysInMonth) {
            newDateParts = {
              ...newDateParts,
              day: 1,
              month: (currentMonth % 12) + 1,
            };
            if (newDateParts.month === 1) newDateParts.year += 1;
          } else {
            newDateParts.day += 1;
          }
        }

        if (field === "month") {
          if (currentMonth === 12) {
            newDateParts = { ...newDateParts, month: 1, year: currentYear + 1 };
          } else {
            newDateParts.month += 1;
          }
        }

        if (field === "year") {
          // Add reasonable limits for year increment/decrement if needed
          newDateParts.year += 1;
        }

        // Validate the resulting date before setting state and calling onChange
        const finalDate = new Date(
          newDateParts.year,
          newDateParts.month - 1,
          newDateParts.day
        );
        if (
          !isNaN(finalDate.getTime()) &&
          finalDate.getFullYear() === newDateParts.year &&
          finalDate.getMonth() + 1 === newDateParts.month &&
          finalDate.getDate() === newDateParts.day
        ) {
          setDate(newDateParts);
          onChange(finalDate);
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();

        // Ensure current date parts are numbers before proceeding
        const currentYear = typeof date.year === "number" ? date.year : null;
        const currentMonth = typeof date.month === "number" ? date.month : null;
        const currentDay = typeof date.day === "number" ? date.day : null;

        if (
          currentYear === null ||
          currentMonth === null ||
          currentDay === null
        ) {
          return; // Cannot decrement if date is incomplete
        }

        let newDateParts = {
          year: currentYear,
          month: currentMonth,
          day: currentDay,
        };

        if (field === "day") {
          if (currentDay === 1) {
            let prevMonth = currentMonth - 1;
            let prevYear = currentYear;
            if (prevMonth === 0) {
              prevMonth = 12;
              prevYear -= 1;
            }
            // Ensure year stays within reasonable bounds if needed
            newDateParts.day = new Date(prevYear, prevMonth, 0).getDate();
            newDateParts.month = prevMonth;
            newDateParts.year = prevYear;
          } else {
            newDateParts.day -= 1;
          }
        }

        if (field === "month") {
          if (currentMonth === 1) {
            newDateParts = {
              ...newDateParts,
              month: 12,
              year: currentYear - 1,
            };
          } else {
            newDateParts.month -= 1;
          }
        }

        if (field === "year") {
          // Add reasonable limits for year increment/decrement if needed
          newDateParts.year -= 1;
        }

        // Validate the resulting date before setting state and calling onChange
        const finalDate = new Date(
          newDateParts.year,
          newDateParts.month - 1,
          newDateParts.day
        );
        if (
          !isNaN(finalDate.getTime()) &&
          finalDate.getFullYear() === newDateParts.year &&
          finalDate.getMonth() + 1 === newDateParts.month &&
          finalDate.getDate() === newDateParts.day
        ) {
          setDate(newDateParts);
          onChange(finalDate);
        }
      }

      if (e.key === "ArrowRight") {
        if (
          e.currentTarget.selectionStart === e.currentTarget.value.length ||
          (e.currentTarget.selectionStart === 0 &&
            e.currentTarget.selectionEnd === e.currentTarget.value.length)
        ) {
          e.preventDefault();
          if (field === "month") dayRef.current?.focus();
          if (field === "day") yearRef.current?.focus();
        }
      } else if (e.key === "ArrowLeft") {
        if (
          e.currentTarget.selectionStart === 0 ||
          (e.currentTarget.selectionStart === 0 &&
            e.currentTarget.selectionEnd === e.currentTarget.value.length)
        ) {
          e.preventDefault();
          if (field === "day") monthRef.current?.focus();
          if (field === "year") dayRef.current?.focus();
        }
      }
    };

  return (
    <div className="flex border rounded-lg items-center text-sm px-1">
      <input
        type="text"
        ref={monthRef}
        max={12}
        maxLength={2}
        value={date.month.toString()}
        onChange={handleInputChange("month")}
        onKeyDown={handleKeyDown("month")}
        onFocus={(e) => {
          if (window.innerWidth > 1024) {
            e.target.select();
          }
        }}
        onBlur={handleBlur("month")}
        className="p-0 outline-none w-6 border-none text-center bg-transparent"
        placeholder="M"
      />
      <span className="opacity-20 -mx-px">/</span>
      <input
        type="text"
        ref={dayRef}
        max={31}
        maxLength={2}
        value={date.day.toString()}
        onChange={handleInputChange("day")}
        onKeyDown={handleKeyDown("day")}
        onFocus={(e) => {
          if (window.innerWidth > 1024) {
            e.target.select();
          }
        }}
        onBlur={handleBlur("day")}
        className="p-0 outline-none w-7 border-none text-center bg-transparent"
        placeholder="D"
      />
      <span className="opacity-20 -mx-px">/</span>
      <input
        type="text"
        ref={yearRef}
        max={9999}
        maxLength={4}
        value={date.year.toString()}
        onChange={handleInputChange("year")}
        onKeyDown={handleKeyDown("year")}
        onFocus={(e) => {
          if (window.innerWidth > 1024) {
            e.target.select();
          }
        }}
        onBlur={handleBlur("year")}
        className="p-0 outline-none w-12 border-none text-center bg-transparent"
        placeholder="YYYY"
      />
    </div>
  );
};

DateInput.displayName = "DateInput";

export { DateInput };
