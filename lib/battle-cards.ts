import prisma from '@/lib/prisma';

export function getBattleCardsCount() {
  return prisma.battlecards.count();
}

export function getBattleCards() {
  return prisma.battlecards.findMany({ orderBy: [{ displayName: 'asc' }] });
}

export function getBattleCard(id: string) {
  return prisma.battlecards.findUnique({ where: { id: id } }).catch((e) => {
    console.error(e);
    return undefined;
  });
}
