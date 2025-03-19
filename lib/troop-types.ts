import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export type TroopType = Prisma.$trooptypesPayload['scalars'];

export function getTroopTypesCount() {
  return prisma.trooptypes.count();
}

const TROOP_CATEGORIES = {
  'Bow Armed Infantry': ['ARC', 'PAV', 'SKM', 'BLV'],
  'Open Order Infantry': ['LFT', 'LSP', 'RDR', 'WBD', 'RBL'],
  'Close Order Infantry': ['EFT', 'SPR', 'WRR', 'HFT', 'PIK', 'HRD'],
  Mounted: ['ECV', 'HBW', 'JCV', 'BAD'],
  'Heavy Mounted': ['KNT', 'CAT'],
  Chariots: ['CHT', 'BTX'],
  'Specialty Troops': ['WWG', 'ART', 'ELE'],
};

export async function getTroopTypesByCategory() {
  const troopTypes = await prisma.trooptypes.findMany();

  return Object.entries(TROOP_CATEGORIES).reduce<{ [title: string]: typeof troopTypes }>(
    (acc, [title, codes]) => {
      const troopTypesInCategory: typeof troopTypes = [];
      for (const code of codes) {
        const troopType = troopTypes.find(({ permanentCode }) => permanentCode === code);
        if (troopType) troopTypesInCategory.push(troopType);
      }
      return { ...acc, [title]: troopTypesInCategory };
    },
    {},
  );
}

export function getTroopTypesByCodes(codes: string[]) {
  return prisma.trooptypes.findMany({
    where: {
      permanentCode: { in: codes },
    },
  });
}
