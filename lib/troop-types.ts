import prisma from '@/lib/prisma';

export function getTroopTypesCount() {
  return prisma.trooptypes.count();
}
