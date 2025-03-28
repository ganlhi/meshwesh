import { ArmyListSize, TroopOptions } from '@/app/army-lists/types';
import { getTroopTypesByCodes } from '@/lib/troop-types';
import { Fragment } from 'react';
import { formatDateRange } from '@/lib/format';
import { BattleCardLink } from '@/app/components/BattleCardLink';
import { SearchParams } from '@/lib/routing';

type TroopsTableProps = {
  troops: TroopOptions[];
  armySize: ArmyListSize;
  hideBattleCards?: boolean;
  currentSearchParams: Promise<SearchParams>;
};

export function TroopsTable({
  troops,
  armySize,
  hideBattleCards,
  currentSearchParams,
}: TroopsTableProps) {
  let sizeMult = 1;
  if (armySize === 'grand-two') sizeMult = 2;
  if (armySize === 'grand-three') sizeMult = 3;

  // TODO mobile version
  return (
    <table className="w-full text-sm [&_td]:p-2 [&_td]:align-top [&_th]:p-2">
      <thead className="text-left">
        <tr className="border-y-2 border-gray-300 [&>th]:py-2">
          <th className="w-60">Troop Types</th>
          <th className="w-16 text-center">Min</th>
          <th className="w-16 text-center">Max</th>
          <th className="w-32 text-center">Battle Line</th>
          <th>Restrictions</th>
          {!hideBattleCards && <th>Battle Cards</th>}
        </tr>
      </thead>
      <tbody className="">
        {troops.map((troop) => (
          <tr key={troop.id} className="border-y border-gray-300 [&>td]:py-2">
            <td>
              <TroopEntries troopEntries={troop.troopEntries} />
              <br />
              <span className="italic">{troop.description}</span>
            </td>
            <td className="text-center">{troop.min * sizeMult}</td>
            <td className="text-center">{troop.max * sizeMult}</td>
            <td className="text-center">{troop.core || '\u2013'}</td>
            <td>
              {troop.dateRanges.map((dr) => (
                <div key={dr.id}>{formatDateRange(dr.startDate, dr.endDate)}</div>
              ))}
              {troop.note && <div>{troop.note}</div>}
            </td>
            {!hideBattleCards && (
              <td>
                {troop.battleCardEntries.map((battleCardEntry) => (
                  <BattleCardLink
                    key={battleCardEntry.id}
                    code={battleCardEntry.battleCardCode}
                    note={battleCardEntry.note}
                    currentSearchParams={currentSearchParams}
                  />
                ))}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

async function TroopEntries({ troopEntries }: { troopEntries: TroopOptions['troopEntries'] }) {
  const troopTypesCodes = troopEntries.map((t) => t.troopTypeCode);
  const troopTypes = await getTroopTypesByCodes(troopTypesCodes);

  const entries = troopEntries.map((t) => {
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
