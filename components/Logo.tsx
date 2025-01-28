"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function Logo() {
  const [currentLogo, setCurrentLogo] = useState("/images/logo-black-transparent.svg");
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setCurrentLogo(
        resolvedTheme === "dark" 
          ? "/images/logo-white-transparent.svg" 
          : "/images/logo-black-transparent.svg"
      );
    }
  }, [resolvedTheme, mounted]);

  return (
    <Link href="/" className="relative block">
      <Image
        src={currentLogo}
        alt="Logo La Pince"
        width={140}
        height={1}
        priority
        className="transition-opacity duration-300" 
        style={{
          opacity: mounted ? 1 : 0
        }}
      />
    </Link>
  );
}

export default Logo;
