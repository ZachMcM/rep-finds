import { FeedInit } from "@/components/feed/feed-init";
import { SearchBar } from "@/components/search/search-bar";

export default function Home() {
  return (
    <div className="flex flex-col  items-center">
      <div className="flex flex-col gap-8 w-full md:w-3/5 lg:w-2/5">
        <SearchBar />
        <div className="flex flex-col gap-24">
          <FeedInit />
        </div>
      </div>
    </div>
  );
}
