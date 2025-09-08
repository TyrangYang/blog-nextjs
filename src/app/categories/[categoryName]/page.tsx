import { groupMetaByCategory } from '@/utils/fetchMarkDown';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import Link from 'next/link';

interface Props {
  params: Promise<{
    categoryName: string;
  }>;
}

async function CategoryPage({ params }: Props) {
  const { categoryName } = await params;
  const metaList = groupMetaByCategory[categoryName.toUpperCase()].toSorted(
    (a, b) => {
      return dayjs(a.date).valueOf() - dayjs(b.date).valueOf();
    },
  );

  return (
    <div className="grow sm:mx-50 mx-2 flex flex-col">
      <h3 className="self-end text-3xl my-10">
        <FontAwesomeIcon icon={faFolderOpen} className="mr-2" />
        <span>{categoryName}</span>
      </h3>
      <div className="flex flex-col space-y-2">
        {metaList.map((meta) => {
          return (
            <div
              className="flex justify-between"
              key={`category-${categoryName}-post-${meta.title}`}
            >
              <Link
                href={`/posts/${meta.postname}`}
                className="clickable-hover text-xl"
              >
                {meta.title}
              </Link>
              <div>{dayjs(meta.date).format('YYYY-MM-DD')}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default CategoryPage;

// next js
export async function generateStaticParams() {
  console.log(groupMetaByCategory);
  const categories = Object.keys(groupMetaByCategory);
  return categories.map((c) => {
    return { categoryName: c.toLowerCase() };
  });
}
