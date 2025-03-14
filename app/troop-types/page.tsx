import { getTroopTypesByCategory } from '@/lib/troop-types';
import { Fragment } from 'react';
import { TroopTypeCard } from '@/app/components/TroopTypeCard';

export default async function TroopTypesPage() {
  const troopTypesByCategory = await getTroopTypesByCategory();

  return (
    <article className="container mt-4 space-y-8 py-4">
      <h1>Troop Types</h1>

      {Object.entries(troopTypesByCategory).map(([title, troopTypes]) => (
        <Fragment key={title}>
          <h2 className="italic">{title}</h2>
          <section className="grid grid-cols-2 gap-8">
            {troopTypes.map((troopType) => (
              <TroopTypeCard key={troopType.id} troopType={troopType} />
            ))}
          </section>
        </Fragment>
      ))}
    </article>
  );
}
