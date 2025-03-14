import prisma from '@/lib/prisma';

export function getBattleCardsCount() {
  return prisma.battlecards.count();
}
