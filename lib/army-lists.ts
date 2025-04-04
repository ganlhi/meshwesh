import prisma from '@/lib/prisma';
import { AllyOptions, Prisma, TroopOptions } from '@prisma/client';
import { ReadonlyURLSearchParams } from 'next/navigation';

export type ArmyList = Prisma.$armylistsPayload['scalars'];
export type ArmyListSummary = Pick<ArmyList, 'id' | 'name' | 'keywords'> & {
  derivedData: Prisma.$armylistsPayload['composites']['derivedData']['scalars'];
};

export type ArmylistsTroopEntriesForGeneral = Prisma.$TroopEntriesForGeneralPayload['scalars'] & {
  troopEntries: Prisma.$TroopEntryPayload['scalars'][];
};

export type ArmyListSize = 'standard' | 'grand-three' | 'grand-two' | 'grand-one' | 'grand-ally';

export type { AllyOptions, TroopOptions };

export function getArmySizeFromSearchParams(searchParams: ReadonlyURLSearchParams): ArmyListSize {
  const param = searchParams.get('army-size');
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
      id: string;
      dateRange: AllyOptions['dateRange'];
      allyEntries: Array<
        AllyOptions['allyEntries'][number] & {
          fullArmyList: { id: string; name: string } | null;
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
    const allyOptionFullArmyLists = await prisma.armylists.findMany({
      where: {
        id: {
          in: allyOptionArmyLists.reduce<string[]>(
            (acc, a) => (a.armyListId ? [...acc, a.armyListId] : acc),
            [],
          ),
        },
      },
    });

    const allyOptionResult: (typeof results)['allyOptions'][number] = {
      id: allyOption.id,
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
        const armyList = allyOptionFullArmyLists.find(
          (a) => a.id === allyOptionArmyList.armyListId,
        );

        allyOptionResult.allyEntries.push({
          ...allyOptionEntry,
          fullArmyList: armyList ? { id: armyList.id, name: armyList.name } : null,
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

export async function getEnemyArmyLists(id: string) {
  const xrefs = await prisma.enemyxrefs.findMany({
    where: { OR: [{ armyList1: id }, { armyList2: id }] },
  });

  const ids = xrefs.map((x) => {
    if (x.armyList1 !== id) return x.armyList1;
    return x.armyList2;
  });

  return prisma.armylists.findMany({
    where: { id: { in: ids } },
    orderBy: { name: 'asc' },
  });
}

export async function getRelatedArmyLists(id: string, listId: number) {
  return prisma.armylists.findMany({
    where: { id: { not: id }, listId: listId },
    orderBy: { name: 'asc' },
  });
}

export async function getThematicCategories(id: string) {
  const xrefs = await prisma.thematiccategorytoarmylistxrefs.findMany({
    where: { armyList: id },
  });

  const ids = xrefs.map((x) => {
    return x.thematicCategory;
  });

  return prisma.thematiccategories.findMany({
    where: { id: { in: ids } },
    orderBy: { name: 'asc' },
  });
}
