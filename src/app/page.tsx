import { groupMetaByCategory } from '@/utils/fetchMarkDown';
import CategoryCard from '@/components/CategoryCard';

export default async function Home() {
  return (
    <main className="grow sm:mx-50 mx-20">
      <div className="flex flex-wrap justify-between">
        {Object.entries(groupMetaByCategory).map(([category, metaList]) => {
          return (
            <CategoryCard
              key={`category-card-${category}`}
              title={category}
              metaDataList={metaList}
            />
          );
        })}
      </div>
    </main>
  );
}
