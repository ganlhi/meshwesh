import Link from 'next/link';
import { getCategories } from '@/lib/categories';

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <article className="container mt-4 space-y-2.5 py-4">
      <h1 className="text-3xl font-normal">Thematic Categories</h1>
      <p className="text-sm">
        Thematic categories are a way of grouping army lists that fit a common period and broad
        geographic region. Many army lists belong to more than one thematic category.
      </p>
      <ul className="space-y-2.5">
        {categories.map((category) => (
          <li key={category.id} className="text-2xl">
            <Link href={`/categories/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
