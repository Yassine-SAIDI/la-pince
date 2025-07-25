"use client";

import React, { useState } from "react";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {  Button, buttonVariants } from "./ui/button";
import { UserButton } from "@clerk/nextjs";
import { ThemeSwitcherBtn } from "./ThemeSwitcherBtn";
import {Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle} from "./ui/sheet";
import { Menu } from "lucide-react";

const path = [ "/", "/wizard", "/sign-in", "/sign-up" ]; 


function Navbar() {
	const pathname = usePathname();
  return (
	<>
	{!path.includes(pathname) && (
	  <>
		<DesktopNavbar />
		<MobileNavbar />
	  </>
	)}
	</>
  );
};

const items = [
	{ label: "Dashboard", link: "/dashboard" },
	{ label: "Transactions", link: "/transactions" },
	{ label: "Catégories", link: "/manage" },
	];




function MobileNavbar() {
  const[isOpen, setIsOpen] = useState(false);

  return (
    <div className="block border-separate bg-background md:hidden">
      <nav className="container flex items-center justify-between px-4">
        <div className="flex items-center gap-x-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu/>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]" side="left">
              <SheetHeader>
                <SheetTitle>Menu de Navigation</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 pt-4">
                {items.map((item) => (
                  <NavbarItem 
                    key={item.label} 
                    link={item.link}
                    label={item.label}
                    clickBack={() => setIsOpen((prev) => !prev)}
                  />
                ))}
              </div>
            </SheetContent>
          </Sheet>
          <Logo />
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitcherBtn />
          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>
    </div>
  );
}

function DesktopNavbar() {
  return (
	<div className="hidden border-separate border-b bg-background md:block">
	  <nav className=" h-[70px]  flex items-center justify-between mx-10">
			<Logo />
			<div className="flex h-full ">
				{items.map((item) => (
					<NavbarItem 
					key={item.label} 
					link={item.link}
					label={item.label}
					/>
				))}
			</div>
		{/* </div> */}
		<div className="flex items-center gap-2">
			<ThemeSwitcherBtn />
			<UserButton afterSignOutUrl="/" />
		</div>
	  </nav>
	</div>
  );
}

function NavbarItem({ link, label, clickBack }: {
	link: string;
	label: string;
	clickBack?: () => void;
}){
	const pathName = usePathname();
	const isActive = pathName === link;

	return(
		<div className="relative flex items-center">
			<Link href={link} className={
				cn(
					buttonVariants({
						variant: "ghost",
					}),
					"w-full justify-start text-xl text-muted-foreground hover:text-foreground",
					isActive && "text-foreground"
				)}
				onClick={() => {
					if(clickBack) {
						clickBack();
				}
			}}
				>
					{label}
			</Link>
			{isActive && (
				<div className="absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl bg-foreground md:block" />
			)}
		</div>
	)
}
  

export default Navbar;
