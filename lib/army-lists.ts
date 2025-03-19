import prisma from '@/lib/prisma';
import { ArmyListSummary } from '@/app/army-lists/types';

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
