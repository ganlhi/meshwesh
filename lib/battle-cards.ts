import prisma from '@/lib/prisma';

export function getBattleCardsCount() {
  return prisma.battlecards.count();
}

export function getBattleCards() {
  return prisma.battlecards.findMany({ orderBy: [{ displayName: 'asc' }] });
}

export function getBattleCardByCode(code: string) {
  return prisma.battlecards
    .findUnique({
      where: {
        permanentCode: code,
      },
    })
    .catch((e) => {
      console.error(e);
      return undefined;
    });
}
