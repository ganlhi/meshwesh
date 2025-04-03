import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCategories, getCategoryWithLists } from '@/lib/categories';

type CategoryPageParams = { id: string };

export const revalidate = 300;
export const dynamicParams = false;

export async function generateStaticParams(): Promise<CategoryPageParams[]> {
  const categories = await getCategories();
  return categories.map((c) => ({ id: c.id }));
}

export default async function CategoryPage({ params }: { params: Promise<CategoryPageParams> }) {
  const { id } = await params;

  const data = await getCategoryWithLists(id);
  if (!data) return notFound();

  const { category, lists } = data;

  return (
    <article className="container mt-4 py-4">
      <h1>{category.name}</h1>
      <h2>Army Lists</h2>
      <ul className="space-y-1.5">
        {lists.map((list) => (
          <li key={list.id} className="text-xl">
            <Link href={`/army-lists/${list.id}`}>{list.name}</Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
