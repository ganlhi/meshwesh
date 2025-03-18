'use client';

import { ArmyListSummary } from '@/app/army-lists/types';
import { PropsWithChildren, useMemo, useState } from 'react';
import { formatDate } from '@/lib/format';
import Link from 'next/link';

type ArmyListsTableProps = {
  armyLists: ArmyListSummary[];
};

type SortCriteria = { col: 'name' | 'start-date' | 'end-date'; dir: -1 | 1 };

function compareNames(a: ArmyListSummary, b: ArmyListSummary, dir: -1 | 1) {
  return a.name.trim().localeCompare(b.name.trim()) * dir;
}

function compareStartDates(a: ArmyListSummary, b: ArmyListSummary, dir: -1 | 1) {
  return (a.derivedData.listStartDate - b.derivedData.listStartDate) * dir;
}

function compareEndDates(a: ArmyListSummary, b: ArmyListSummary, dir: -1 | 1) {
  return (a.derivedData.listEndDate - b.derivedData.listEndDate) * dir;
}

function getSortFunction(sortBy: SortCriteria) {
  return function sortFn(a: ArmyListSummary, b: ArmyListSummary): number {
    switch (sortBy.col) {
      case 'name': {
        let cmp = compareNames(a, b, sortBy.dir);
        if (cmp !== 0) return cmp;
        cmp = compareStartDates(a, b, sortBy.dir);
        if (cmp !== 0) return cmp;
        return compareEndDates(a, b, sortBy.dir);
      }
      case 'start-date': {
        let cmp = compareStartDates(a, b, sortBy.dir);
        if (cmp !== 0) return cmp;
        cmp = compareEndDates(a, b, sortBy.dir);
        if (cmp !== 0) return cmp;
        return compareNames(a, b, sortBy.dir);
      }
      case 'end-date': {
        let cmp = compareEndDates(a, b, sortBy.dir);
        if (cmp !== 0) return cmp;
        cmp = compareStartDates(a, b, sortBy.dir);
        if (cmp !== 0) return cmp;
        return compareNames(a, b, sortBy.dir);
      }
    }
  };
}

export function ArmyListsTable({ armyLists }: ArmyListsTableProps) {
  const [sortBy, setSortBy] = useState<SortCriteria>({ col: 'start-date', dir: 1 });
  const [searchTerm, setSearchTerm] = useState('');
  const [includeKeywords, setIncludeKeywords] = useState(false);

  const armiesToDisplay = useMemo(() => {
    return armyLists
      .filter((a) => {
        if (a.name.toLowerCase().includes(searchTerm.toLowerCase())) return true;

        if (
          includeKeywords &&
          a.keywords.some((k) => k.toLowerCase().includes(searchTerm.toLowerCase()))
        )
          return true;

        return false;
      })
      .sort(getSortFunction(sortBy));
  }, [sortBy, searchTerm, includeKeywords, armyLists]);

  return (
    <div className="mt-6 flex w-full flex-col items-stretch gap-8">
      <div className="flex items-center gap-4">
        <input
          aria-label="search"
          placeholder={`Search by name${includeKeywords ? ' and keywords' : ''}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="searchbox min-w-3xs"
        />

        <span>
          <input
            type="checkbox"
            checked={includeKeywords}
            onChange={(e) => setIncludeKeywords(e.target.checked)}
          />{' '}
          Include keywords in search
        </span>
      </div>
      <table className="">
        <thead className="text-left">
          <tr className="border-y-2 border-gray-300 [&>th]:py-2">
            <th>
              <SortIndicator col="name" currentSort={sortBy} onSortChange={setSortBy}>
                Army List Name
              </SortIndicator>
            </th>
            <th>
              <SortIndicator col="start-date" currentSort={sortBy} onSortChange={setSortBy}>
                Start Date
              </SortIndicator>
            </th>
            <th>
              <SortIndicator col="end-date" currentSort={sortBy} onSortChange={setSortBy}>
                End Date
              </SortIndicator>
            </th>
          </tr>
        </thead>
        <tbody className="">
          {armiesToDisplay.map((armyList) => (
            <tr key={armyList.id} className="border-y border-gray-300 [&>td]:py-2">
              <td>
                <Link href={`/army-lists/${armyList.id}`}>{armyList.name}</Link>
              </td>
              <td>{formatDate(armyList.derivedData.listStartDate)}</td>
              <td>{formatDate(armyList.derivedData.listEndDate)}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SortIndicator({
  col,
  currentSort,
  onSortChange,
  children,
}: PropsWithChildren<{
  col: SortCriteria['col'];
  currentSort: SortCriteria;
  onSortChange(s: SortCriteria): void;
}>) {
  return (
    <button
      onClick={() => {
        onSortChange({ col, dir: currentSort.dir === 1 ? -1 : 1 });
      }}
      className="flex cursor-pointer items-center gap-1"
    >
      {children} {col !== currentSort.col ? null : currentSort.dir === -1 ? downArrow : upArrow}
    </button>
  );
}

const downArrow = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M7 9.5L12 14.5L17 9.5H7Z" fill="#636B74" />
  </svg>
);

const upArrow = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M7 14L12 9L17 14H7Z" fill="#636B74" />
  </svg>
);
