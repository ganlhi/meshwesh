'use client';

import { ArmyListSummary } from '@/lib/army-lists';
import { useMemo, useState } from 'react';
import Link from 'next/link';

const MAX_DISPLAYED_RESULTS = 20;

export function SearchInput({ armyLists }: { armyLists: ArmyListSummary[] }) {
  const [searchTerm, setSearchTerm] = useState('');

  const { results, tooMany } = useMemo(() => {
    const filtered = searchTerm
      ? armyLists.filter((a) => a.name.toLowerCase().includes(searchTerm.toLowerCase()))
      : [];

    return {
      results: filtered.slice(0, MAX_DISPLAYED_RESULTS),
      tooMany: filtered.length > MAX_DISPLAYED_RESULTS,
    };
  }, [armyLists, searchTerm]);

  return (
    <div className="relative">
      <input
        aria-label="Quick Search"
        placeholder="Quick Search"
        className="searchbox"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      {searchTerm && (
        <div className="absolute flex w-96 flex-col bg-secondary p-2 opacity-95 shadow [&>*]:text-white">
          {results.length === 0 && <p className="text-sm italic">No matching army lists</p>}
          {results.map((r) => (
            <Link
              key={r.id}
              href={`/army-lists/${r.id}`}
              onClick={() => {
                setSearchTerm('');
              }}
            >
              {r.name}
            </Link>
          ))}
          {tooMany && <p className="text-sm italic">Too many results...</p>}
        </div>
      )}
    </div>
  );
}
