import prisma from '@/lib/prisma';

export function getCategoriesCount() {
  return prisma.thematiccategories.count();
}

export function getCategories() {
  return prisma.thematiccategories.findMany({ orderBy: [{ name: 'asc' }] });
}

export async function getCategoryWithLists(id: string) {
  const category = await prisma.thematiccategories.findUnique({ where: { id: id } });
  if (!category) return undefined;

  const mapping = await prisma.thematiccategorytoarmylistxrefs.findMany({
    where: {
      thematicCategory: id,
    },
  });
  const listIds = mapping.map((m) => m.armyList);
  const lists = await prisma.armylists.findMany({
    where: {
      id: { in: listIds },
    },
    orderBy: {
      name: 'asc',
    },
  });

  return { category, lists };
}
