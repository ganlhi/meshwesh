import prisma from '@/lib/prisma';

export function getBattleCardsCount() {
  return prisma.battlecards.count();
}

export function getBattleCards() {
  return prisma.battlecards.findMany({ orderBy: [{ displayName: 'asc' }] });
}
