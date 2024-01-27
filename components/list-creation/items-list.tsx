import { ItemCard } from "./item-card";
import { ListFormItem } from "./item-form";

export function ItemsList({
  items,
}: {
  items: ListFormItem[];
}) {
  return (
    <div className="flex flex-col space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 w-full">
        {items && items.map((item) => <ItemCard item={item} />)}
      </div>
    </div>
  );
}
