import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <div className="mt-16 flex w-full justify-center items-center">
      <div className="flex flex-col gap-32 md:gap-64 md:max-w-5xl">
        <div className="flex flex-col gap-3 md:gap-6 items-center text-center">
          <div className="flex flex-col items-center gap-4">
            <Badge className="w-fit">About</Badge>
            <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl">
              Say Goodbye To Spreadsheets
            </h1>
          </div>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
            Never look through a rep spreadsheet again. Like, share, comment on,
            and create your on spreadsheet with a user first experience and
            interface.
          </p>
          <Link href="/sign-up">
            <Button variant="secondary">
              Sign Up Today
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
        <div className="w-full grid md:grid-cols-2 gap-6 md:gap-12 items-start">
          <div className="w-full flex flex-col gap-2 md:gap-4 order-last md:order-none">
            <h3 className="font-bold text-2xl md:text-4xl">Why We Started</h3>
            <p className="text-muted-foreground text-sm md:text-base">
              Rep Finds was created to make purchasing reps more accessible. We
              want to make it so people don't have to look through reddit and
              tik tok to find spreadsheets with bad UX and UI. So we created Rep
              Finds, a social media platform specifically for the rep community.
            </p>
          </div>
          <div className="w-full">
            <AspectRatio ratio={5184 / 3456} className="bg-muted rounded-md">
              <Image
                src="/images/about.jpg"
                fill
                alt="sneakers"
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </div>
        </div>
        <div className="w-full grid md:grid-cols-2 gap-6 md:gap-12 items-start">
          <AspectRatio ratio={5184 / 3456} className="bg-muted rounded-md">
            <Image
              src="/images/about2.jpg"
              fill
              alt="sneakers"
              className="object-cover rounded-md"
            />
          </AspectRatio>
          <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-2 md:gap-4">
              <h3 className="font-bold text-2xl md:text-4xl">How It Works</h3>
              <p className="text-muted-foreground text-sm md:text-base">
                Users can add items from a database of hundreds of thousands of
                fashion items to a list. Other users can share like and comment
                on these lists to help other people find out about these rep
                items.
              </p>
            </div>
            <Link href="/new-find-list">
              <Button>
                Post A List
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
