import Link from "next/link";
import Image from "next/image";
import React from "react";
import { brand } from "../../lib/data/brand";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={"grid place-content-center py-4"}>
      <div className="copy flex items-center gap-2 place-self-center text-xs opacity-70">
        <Link href={"/"} className="year text-sm font-bold">
          {brand.name}
        </Link>
        <div className="copy-text">Copyright &copy;{currentYear}</div>
      </div>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        title="Logo"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden"
      >
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </a>
    </footer>
  );
}
