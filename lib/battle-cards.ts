import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export type BattleCard = Prisma.$battlecardsPayload['scalars'];

export function getBattleCardsCount() {
  return prisma.battlecards.count();
}

export function getBattleCards() {
  return prisma.battlecards.findMany({ orderBy: [{ displayName: 'asc' }] });
}

export function getBattleCard(id: string) {
  return prisma.battlecards.findUnique({ where: { id: id } });
}
