import Link from "next/link";

export function Footer() {
  return (
    <div className="pb-16 pt-64 w-full justify-center flex items-center">
      <div className=" max-w-xs md:max-w-none flex justify-center text-center flex-wrap gap-4 md:gap-8">
      <Link href="/" className="font-bold text-xs">
        Rep Finds
      </Link>
      <Link
        className="text-xs font-medium text-muted-foreground hover:opacity-80 duration-300"
        href="/"
      >
        Home
      </Link>
      <Link
        className="text-xs font-medium text-muted-foreground hover:opacity-80 duration-300"
        href="/new-find-list"
      >
        New List
      </Link>
      <a
        className="text-xs font-medium text-muted-foreground hover:opacity-80 duration-300"
        href="https://pandabuy.allapp.link/cnr0b8p0b4mgcun2c7g0"
      >
        Pandbuy Sign Up
      </a>
      <a
        href="https://github.com/ZachMcM/rep-finds"
        className="text-xs font-medium text-muted-foreground hover:opacity-80 duration-300"
      >
        Github
      </a>
      <Link
        className="text-xs font-medium text-muted-foreground hover:opacity-80 duration-300"
        href="/about"
      >
        About
      </Link>
      </div>
    </div>
  );
}
