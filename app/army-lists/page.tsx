import { getArmyListsSummaries } from '@/lib/army-lists';
import { ArmyListsTable } from '@/app/components/ArmyListsTable';

export const dynamic = 'force-static';

export default async function ArmyListsPage() {
  const armyLists = await getArmyListsSummaries();

  return (
    <article className="container mx-auto mt-4 max-w-3xl space-y-2.5 py-4">
      <h1>Army Lists</h1>
      <ArmyListsTable armyLists={armyLists} />
    </article>
  );
}
