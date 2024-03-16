import Link from "next/link";

export function Footer() {
  return (
    <div className="py-16 w-full justify-center flex items-center gap-8">
      {/* TODO */}
      <Link href="/" className="font-bold text-sm">
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
        Pandbuy Signup
      </a>
      <Link
        className="text-xs font-medium text-muted-foreground hover:opacity-80 duration-300"
        href="/about"
      >
        About
      </Link>
    </div>
  );
}
