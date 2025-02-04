import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "@/components/Logo";
import { CurrencyComboBox } from "@/components/CurrencyComboBox";
import { prisma } from "@/lib/prisma";

export default async function Page() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

   const existingUserSettings = await prisma.userSettings.findUnique({
    where: {
        userId: user.id,
    },
});

if (existingUserSettings && existingUserSettings.currency) {
    redirect("/dashboard");
}



  return (
    <div className="container flex max-w-2xl flex-col items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl text-center">
          Bienvenue, <span className="font-bold ml-2">{user.firstName} </span>{" "}
          !
        </h1>
        <h2 className="mt-4 text-center text-base text-muted-foreground">
          Vous êtes sur le point de configurer votre application
        </h2>
        <h3 className="mt-2 text-center text-sm text-muted-foreground">
          vous pouvez changer ces informations à tout moment
        </h3>
      </div>
      <Separator />
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Devise</CardTitle>
          <CardDescription>
            La devise que vous choisissez sera utilisée pour les transactions
            financières
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CurrencyComboBox />
        </CardContent>
      </Card>
      <Separator />
      <Button className="w-full" asChild>
        <Link href={"/"}>Continuer</Link>
      </Button>
      <div className="">
        <Logo />
      </div>
    </div>
  );
}
