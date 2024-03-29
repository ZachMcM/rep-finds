import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function MarketingList() {
  return (
    <div className="flex flex-col gap-6 ">
      <Link href="/new-find-list">
        <Button className="w-full">
          Post a find list <ArrowRight className="ml-2 h-4 w-4" />{" "}
        </Button>
      </Link>
      <div className="px-3 py-6 border rounded-sm flex flex-col items-center gap-6">
        <p className="text-sm font-medium text-center whitespace-break-spaces">
          Use the QR code below to signup to Pandabuy and use code 'sheets' for
          a discount off your first order! Or click the{" "}
          <a
            href="https://pandabuy.allapp.link/cnr0b8p0b4mgcun2c7g0"
            className="underline hover:opacity-80 duration-300"
          >
            link
          </a>{" "}
          here.
        </p>
        <Image
          src="/images/pandabuy-affiliate.png"
          width={225}
          height={225}
          alt="pandabuy affiliate qr code"
          className="p-1 bg-primary rounded-sm"
        />
      </div>
    </div>
  );
}
