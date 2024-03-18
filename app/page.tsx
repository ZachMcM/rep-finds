import { FeedInit } from "@/components/feed/feed-init";
import { MarketingList } from "@/components/marketing/marketing-list";

export default function Home() {
  return (
    <div className="flex justify-center">
      <div className="w-full lg:w-2/3">
        <div className="flex flex-col md:flex-row gap-12 w-full">
          <FeedInit />
          <div className="flex flex-col gap-6 md:w-1/2">
            <MarketingList/>
          </div>
        </div>
      </div>
    </div>
  );
}
