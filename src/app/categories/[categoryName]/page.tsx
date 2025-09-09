import ListPostByMetaList from '@/components/ListPostByMetaList';
import { groupMetaByCategory } from '@/utils/fetchMarkDown';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';

interface Props {
  params: Promise<{
    categoryName: string;
  }>;
}

async function OneCategoryPage({ params }: Props) {
  const { categoryName } = await params;
  const metaList = groupMetaByCategory[categoryName.toUpperCase()].toSorted(
    (a, b) => {
      return dayjs(b.date).valueOf() - dayjs(a.date).valueOf();
    },
  );

  return (
    <div className="grow sm:mx-50 mx-2 flex flex-col">
      <h3 className="self-end text-3xl my-10 font-bold">
        <FontAwesomeIcon icon={faFolderOpen} className="mr-2" />
        <span>{categoryName.toUpperCase()}</span>
      </h3>
      <ListPostByMetaList metaDataList={metaList}></ListPostByMetaList>
    </div>
  );
}
export default OneCategoryPage;

// next js
export async function generateStaticParams() {
  const categories = Object.keys(groupMetaByCategory);
  return categories.map((c) => {
    return { categoryName: c.toLowerCase() };
  });
}
