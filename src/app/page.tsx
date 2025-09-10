import { allMetaList } from '@/utils/fetchMarkDown';
import SearchableCategoryCardList from './SearchableCategoryCardList';

export default async function Home() {
  return (
    <main className="grow sm:mx-50 mx-20">
      <SearchableCategoryCardList allMetaList={allMetaList} />
    </main>
  );
}
