import prisma from '@/lib/prisma';
import { ArmyList, ArmyListSummary } from '@/app/army-lists/types';
import { AllyOptions, TroopOptions } from '@prisma/client';

export function getArmyListsCount() {
  return prisma.armylists.count();
}

export function getArmyLists() {
  return prisma.armylists.findMany({ orderBy: { derivedData: { listStartDate: 'asc' } } });
}

export async function getArmyListsSummaries(): Promise<ArmyListSummary[]> {
  const armyLists = await getArmyLists();
  return armyLists.map(({ id, name, keywords, derivedData }) => ({
    id,
    name,
    keywords,
    derivedData,
  }));
}

export async function getArmyList(id: string) {
  return prisma.armylists.findUnique({ where: { id: id } }).catch((e) => {
    console.error(e);
    return undefined;
  });
}

export async function separateOptionalContingentsFromAllies(allyOptions: AllyOptions[]) {
  //TODO overlapping date ranges

  const results: {
    optionalContingents: Array<{
      id: string;
      name: string;
      dateRange: AllyOptions['dateRange'];
      troopOptions: TroopOptions[];
    }>;
    allyOptions: Array<{
      dateRange: AllyOptions['dateRange'];
      allyEntries: Array<
        AllyOptions['allyEntries'][number] & {
          armyListId: string | null;
          troopOptions: TroopOptions[];
        }
      >;
    }>;
  } = {
    optionalContingents: [],
    allyOptions: [],
  };

  for (const allyOption of allyOptions) {
    const allyOptionArmyLists = await prisma.allyarmylists.findMany({
      where: { id: { in: allyOption.allyEntries.map((e) => e.allyArmyList) } },
    });

    const allyOptionResult: (typeof results)['allyOptions'][number] = {
      dateRange: allyOption.dateRange,
      allyEntries: [],
    };

    let isContingent = false;

    for (const allyOptionEntry of allyOption.allyEntries) {
      const allyOptionArmyList = allyOptionArmyLists.find(
        (l) => l.id === allyOptionEntry.allyArmyList,
      );
      if (!allyOptionArmyList) continue;

      if (allyOptionArmyList.internalContingent) {
        results.optionalContingents.push({
          id: allyOptionEntry.id,
          name: allyOptionEntry.name,
          dateRange: allyOption.dateRange,
          troopOptions: allyOptionArmyList.troopOptions,
        });

        isContingent = true;
      } else {
        allyOptionResult.allyEntries.push({
          ...allyOptionEntry,
          armyListId: allyOptionArmyList.armyListId,
          troopOptions: allyOptionArmyList.troopOptions,
        });
      }
    }

    if (!isContingent) {
      results.allyOptions.push(allyOptionResult);
    }
  }

  return results;
}
