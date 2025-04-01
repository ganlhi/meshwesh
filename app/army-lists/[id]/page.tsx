import {
  getArmyList,
  getEnemyArmyLists,
  separateOptionalContingentsFromAllies,
} from '@/lib/army-lists';
import { notFound } from 'next/navigation';
import { formatDateRange } from '@/lib/format';
import { ArmyListSize, ArmylistsTroopEntriesForGeneral } from '@/app/army-lists/types';
import { getTroopTypesByCodes } from '@/lib/troop-types';
import { Fragment } from 'react';
import { getBattleCard } from '@/lib/battle-cards';
import { getSingleStringFromSearchParams, SearchParams, updateQueryString } from '@/lib/routing';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { NavModal } from '@/app/components/NavModal';
import { ArmyListSizeSelect } from '@/app/components/ArmyListSizeSelect';
import { ToggleTitle } from '@/app/components/ToggleTitle';
import { TroopsTable } from '@/app/components/TroopsTable';
import { BattleCardLink } from '@/app/components/BattleCardLink';
import { ToggleCard } from '@/app/components/ToggleCard';
import Link from 'next/link';

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

  const { optionalContingents, allyOptions } = await separateOptionalContingentsFromAllies(
    armyList.allyOptions,
  );

  const enemyArmyLists = await getEnemyArmyLists(id);

  return (
    <>
      <article className="container mt-4 space-y-2.5 py-4 [&>h2]:mt-8">
        <h1>{armyList.name}</h1>
        {armyList.dateRanges.map((dr) => (
          <h3 key={dr.id} className="font-normal text-gray-500">
            {formatDateRange(dr.startDate, dr.endDate)}
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
              <BattleCardLink
                code={battleCardEntry.battleCardCode}
                note={battleCardEntry.note}
                currentSearchParams={searchParams}
              />
            </dd>
          ))}
        </dl>

        <h2>Troop Options</h2>
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="army-size">Showing troop options for:</label>
          <ArmyListSizeSelect armySize={armySize} />
        </div>

        <ToggleTitle title="Required Troops">
          These troops are part of the main army. The minimum and maximum always apply unless
          overridden by the restrictions.
        </ToggleTitle>
        <TroopsTable
          troops={armyList.troopOptions}
          armySize={armySize}
          currentSearchParams={searchParams}
        />

        <ToggleTitle title="Optional Contingents">
          These troops are part of the main army but are in an optional contingent. The minimum and
          maximum only apply if the contingent is selected. In the cases where there is more than
          one optional contingent, the player may select any or all of the optional contingents.
        </ToggleTitle>
        {optionalContingents.map((optionalContingent) => (
          <ToggleCard
            key={optionalContingent.id}
            alwaysOpen
            header={
              <>
                <h5 className="m-0">{optionalContingent.name}</h5>
                {optionalContingent.dateRange && (
                  <p className="text-sm text-gray-500">
                    {formatDateRange(
                      optionalContingent.dateRange.startDate,
                      optionalContingent.dateRange.endDate,
                    )}
                  </p>
                )}
              </>
            }
          >
            <TroopsTable
              troops={optionalContingent.troopOptions}
              armySize={armySize}
              currentSearchParams={searchParams}
              hideBattleCards
            />
          </ToggleCard>
        ))}

        <ToggleTitle title="Ally Troop Options">
          These troops are not part of the main army. The minimum and maximum only apply if the ally
          option is selected. No more than one ally option may be selected. Most ally options only
          include one allied contingent. Some ally options include two allied contingents.
        </ToggleTitle>
        {allyOptions.map((allyOption, index) => (
          <ToggleCard
            key={allyOption.id}
            header={
              <>
                <h5 className="m-0">
                  Option {index + 1}: {allyOption.allyEntries.map((e) => e.name).join(' and ')}
                </h5>
                {allyOption.dateRange && (
                  <p className="text-sm text-gray-500">
                    {formatDateRange(allyOption.dateRange.startDate, allyOption.dateRange.endDate)}
                  </p>
                )}
              </>
            }
          >
            {allyOption.allyEntries.map((allyEntry) => (
              <Fragment key={allyEntry.id}>
                {allyOption.allyEntries.length > 1 && <h6>Allied Contingent: {allyEntry.name}</h6>}
                <TroopsTable
                  troops={allyEntry.troopOptions}
                  armySize={armySize}
                  currentSearchParams={searchParams}
                  hideBattleCards
                />
                <p className="mt-3 px-2 text-sm">
                  Full Army List:{' '}
                  {allyEntry.fullArmyList ? (
                    <Link href={`/army-lists/${allyEntry.fullArmyList.id}`}>
                      {allyEntry.fullArmyList.name}
                    </Link>
                  ) : (
                    'not available'
                  )}
                </p>
              </Fragment>
            ))}
          </ToggleCard>
        ))}

        <h2>Enemies</h2>
        <ul className="space-y-1.5">
          {enemyArmyLists.map((list) => (
            <li key={list.id} className="text-xl">
              <Link href={`/army-lists/${list.id}`}>
                {list.name}{' '}
                {formatDateRange(list.derivedData.listStartDate, list.derivedData.listEndDate)}
              </Link>
            </li>
          ))}
        </ul>
      </article>
      {battleCard && (
        <NavModal
          title={battleCard.displayName}
          backUrl={`?${await updateQueryString(searchParams, { 'battle-card': undefined })}`}
        >
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
