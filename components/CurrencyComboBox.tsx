"use client";

import React, { useEffect, useState } from "react";
import { getCurrencies } from "@/lib/currencies";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMutation, useQuery } from "@tanstack/react-query";
import SkeletonWrapper from "./SkeletonWrapper";
import { UserSettings } from "@prisma/client";
import { UpdateUserCurrency } from "@/app/wizard/_actions/userSettings";
import { toast } from "sonner";

interface Currency {
  code: string;
  name: string;
}

export function CurrencyComboBox() {
  const [open, setOpen] = useState(false);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(null);
  const [loading, setLoading] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const userSettings = useQuery<UserSettings>({
    queryKey: ["userSettings"],
    queryFn: () => fetch("/api/user-settings").then((res) => res.json()),
  })

  useEffect(() => {
    if(!userSettings.data) return;
    const userCurrency = currencies.find(
      (currency) => currency.code === userSettings.data.currency
    )
    if(userCurrency) setSelectedCurrency(userCurrency);
  }, [userSettings.data]);

  useEffect(() => {
    async function fetchCurrencies() {
      try {
        const data = await getCurrencies();
        const currencyList = Object.keys(data.rates).map((code) => ({
          code,
          name: code,
        }));
        setCurrencies(currencyList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching currencies:", error);
        setLoading(false);
      }
    }

    fetchCurrencies();
  }, []);

  const mutation = useMutation({
    mutationFn: UpdateUserCurrency,
    onSuccess: (data: UserSettings) => {
      toast.success("Devise mise à jour avec succès", {
        id: "update-currency",
      });
      setSelectedCurrency(currencies.find((currency) => currency.code === data.currency) || null);
    },
    onError: (error: Error) => {
      console.error("Error updating currency:", error);
      toast.error("Erreur lors de la mise à jour de la devise", {
        id: "update-currency",
      });
    },
  })

  const selectOption = React.useCallback((currency: Currency | null) => {
    if (!currency){
      toast.error("veuillez choisir une devise");
      return;
    }
    toast.loading("Mise à jour de la devise...", {
      id: "update-currency",
  });
    mutation.mutate(currency.code);
  }, [mutation]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (isDesktop) {
    return (
      <SkeletonWrapper isLoading={userSettings.isFetching}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-fit justify-start" disabled={mutation.isPending}>
            {selectedCurrency ? <>{selectedCurrency.name}</> : <>Choisisse votre devise</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <OptionList setOpen={setOpen} setSelectedOption={selectOption} currencies={currencies} />
        </PopoverContent>
      </Popover>
      </SkeletonWrapper>
    );
  }

  return (
    <SkeletonWrapper isLoading={userSettings.isFetching}>
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-fit justify-start" disabled={mutation.isPending}>
          {selectedCurrency ? <>{selectedCurrency.name}</> : <>Choisisse votre devise</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <OptionList setOpen={setOpen} setSelectedOption={selectOption} currencies={currencies} />
        </div>
      </DrawerContent>
    </Drawer>
    </SkeletonWrapper>
  );
}

function OptionList({
  setOpen,
  setSelectedOption,
  currencies,
}: {
  setOpen: (open: boolean) => void;
  setSelectedOption: (currency: Currency | null) => void;
  currencies: Currency[];
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter currency..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {currencies.map((currency) => (
            <CommandItem
              key={currency.code}
              value={currency.code}
              onSelect={(value) => {
                setSelectedOption(
                  currencies.find((curr) => curr.code === value) || null
                );
                setOpen(false);
              }}
            >
              {currency.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
