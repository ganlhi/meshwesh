import prisma from '@/lib/prisma';

export function getArmyListsCount() {
  return prisma.armylists.count();
}
