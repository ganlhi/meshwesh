import { getArmyList } from '@/lib/army-lists';
import { notFound } from 'next/navigation';
import { formatDate } from '@/lib/format';
import { ArmyListSize, ArmylistsTroopEntriesForGeneral } from '@/app/army-lists/types';
import { getTroopTypesByCodes } from '@/lib/troop-types';
import { Fragment } from 'react';
import { getBattleCard, getBattleCardByCode } from '@/lib/battle-cards';
import Link from 'next/link';
import { getSingleStringFromSearchParams, SearchParams } from '@/lib/routing';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { NavModal } from '@/app/components/NavModal';
import { ArmyListSizeSelect } from '@/app/components/ArmyListSizeSelect';

export default async function ArmyListPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { id } = await params;
  const armyList = await getArmyList(id);
  if (!armyList) return notFound();
  console.log(armyList);

  const displayedBattleCard = await getSingleStringFromSearchParams(searchParams, 'battle-card');
  const battleCard = displayedBattleCard ? await getBattleCard(displayedBattleCard) : undefined;

  const armySize = await getArmySizeFromSearchParams(searchParams);

  return (
    <>
      <article className="container mt-4 space-y-2.5 py-4">
        <h1>{armyList.name}</h1>
        {armyList.dateRanges.map((dr) => (
          <h3 key={dr.id} className="font-normal text-gray-500">
            {formatDate(dr.startDate)}
            {dr.endDate !== dr.startDate && <> to </>}
            {formatDate(dr.endDate)}
          </h3>
        ))}
        <dl className="text-lg font-bold [&_dd]:pl-4 [&_dt]:mt-3 [&_span]:text-base [&_span]:font-normal">
          <dt>Invasion Rating</dt>
          {armyList.invasionRatings.map((ir, i) => (
            <dd key={i}>
              {ir.value} {ir.note && <span>{ir.note}</span>}
            </dd>
          ))}
          <dt>Maneuver Rating</dt>
          {armyList.maneuverRatings.map((mr, i) => (
            <dd key={i}>
              {mr.value} {mr.note && <span>{mr.note}</span>}
            </dd>
          ))}
          <dt>Home Topography</dt>
          {armyList.homeTopographies.map((ht, i) => (
            <dd key={i}>
              {ht.note && <span>{ht.note}:</span>} {ht.values.join(', ')}
            </dd>
          ))}
          <dt>General&apos;s Troop Type</dt>
          {armyList.troopEntriesForGeneral.map((troopEntry, i) => (
            <dd key={troopEntry.id}>
              {armyList.troopEntriesForGeneral.length > 1 && i === 0 && (
                <span className="inline-block min-w-20">If Present </span>
              )}
              {armyList.troopEntriesForGeneral.length > 1 && i > 0 && (
                <span className="inline-block min-w-20">Otherwise </span>
              )}
              <GeneralTroopEntry troopEntry={troopEntry} />
            </dd>
          ))}
          <dt>Army Battle Cards</dt>
          {armyList.battleCardEntries.length === 0 && <dd>None</dd>}
          {armyList.battleCardEntries.map((battleCardEntry) => (
            <dd key={battleCardEntry.id}>
              <BattleCardMinMax min={battleCardEntry.min} max={battleCardEntry.max} />
              <BattleCardEntry code={battleCardEntry.battleCardCode} />
              {battleCardEntry.note && (
                <>
                  {' '}
                  <span>{battleCardEntry.note}</span>
                </>
              )}
            </dd>
          ))}
        </dl>

        <h2>Troop Options</h2>
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="army-size">Showing troop options for:</label>
          <ArmyListSizeSelect armySize={armySize} />
        </div>
      </article>
      {battleCard && (
        <NavModal title={battleCard.displayName} backUrl={`/army-lists/${id}`}>
          <div className="text-sm">
            <MDXRemote source={battleCard.mdText} />
          </div>
        </NavModal>
      )}
    </>
  );
}

async function GeneralTroopEntry({ troopEntry }: { troopEntry: ArmylistsTroopEntriesForGeneral }) {
  const troopTypesCodes = troopEntry.troopEntries.map((t) => t.troopTypeCode);
  const troopTypes = await getTroopTypesByCodes(troopTypesCodes);

  const entries = troopEntry.troopEntries.map((t) => {
    const troopType = troopTypes.find((tt) => tt.permanentCode === t.troopTypeCode);
    return {
      id: t.id,
      displayName: troopType?.displayName ?? t.troopTypeCode,
      note: t.note,
    };
  });

  return (
    <>
      {entries.map((t, i) => (
        <Fragment key={t.id}>
          {i > 0 && ' or '}
          {t.displayName}
          {t.note && ` [${t.note}]`}
        </Fragment>
      ))}
    </>
  );
}

async function BattleCardEntry({ code }: { code: string }) {
  const battleCard = await getBattleCardByCode(code);
  if (!battleCard) return <>{code}</>;

  return <Link href={`?battle-card=${battleCard.id}`}>{battleCard.displayName}</Link>;
}

function BattleCardMinMax({ min, max }: { min?: number | null; max?: number | null }) {
  if ((min === undefined || min === null) && (max === undefined || max === null)) return null;
  return (
    <>
      <span>
        {min}-{max}
      </span>{' '}
    </>
  );
}

async function getArmySizeFromSearchParams(
  searchParams: Promise<SearchParams>,
): Promise<ArmyListSize> {
  const param = await getSingleStringFromSearchParams(searchParams, 'army-size');
  switch (param) {
    case 'grand-three':
    case 'grand-two':
    case 'grand-one':
    case 'grand-ally':
      return param;
    default:
      return 'standard';
  }
}
