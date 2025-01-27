"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTheme } from "next-themes";

function Logo() {
  const { theme, resolvedTheme } = useTheme(); // Récupère le thème actuel ("light" ou "dark")

  // Définir l'image en fonction du mode
  const logoSrc = (theme === "dark" || resolvedTheme === "dark") ? "/images/logo-w.svg" : "/images/logo-b.svg";

  return (
    <Link href="/">
      <Image
        src={logoSrc}
        alt="Logo La Pince"
        width={200}
        height={100}
        priority
      />
    </Link>
  );
}

export default Logo;
