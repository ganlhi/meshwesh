import { TroopOptions } from '@/lib/army-lists';
import { getTroopTypesByCodes } from '@/lib/troop-types';
import { Fragment, Suspense } from 'react';
import { formatDateRange } from '@/lib/format';
import { BattleCardButton } from '@/app/components/BattleCardButton';
import { TroopSizeCell } from '@/app/components/TroopSizeCell';

type TroopsTableProps = {
  troops: TroopOptions[];
  hideBattleCards?: boolean;
};

export function TroopsTable({ troops, hideBattleCards }: TroopsTableProps) {
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
            <td className="text-center">
              <Suspense fallback={troop.min}>
                <TroopSizeCell size={troop.min} />
              </Suspense>
            </td>
            <td className="text-center">
              <Suspense fallback={troop.max}>
                <TroopSizeCell size={troop.max} />
              </Suspense>
            </td>
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
                  <BattleCardButton
                    key={battleCardEntry.id}
                    code={battleCardEntry.battleCardCode}
                    note={battleCardEntry.note}
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
