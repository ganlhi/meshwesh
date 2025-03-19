import { Prisma } from '@prisma/client';

export type ArmyList = Prisma.$armylistsPayload['scalars'];
export type ArmyListSummary = Pick<ArmyList, 'id' | 'name' | 'keywords'> & {
  derivedData: Prisma.$armylistsPayload['composites']['derivedData']['scalars'];
};

export type ArmylistsTroopEntriesForGeneral =
  Prisma.$ArmylistsTroopEntriesForGeneralPayload['scalars'] & {
    troopEntries: Prisma.$ArmylistsTroopEntriesForGeneralTroopEntriesPayload['scalars'][];
  };
