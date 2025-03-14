import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCategoryWithLists } from '@/lib/categories';

export const dynamic = 'force-static';

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
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
