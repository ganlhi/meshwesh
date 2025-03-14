import { TroopType } from '@/lib/troop-types';

import * as Images from '@/app/images/troop-types';
import Image, { StaticImageData } from 'next/image';
import { ImageModal } from '@/app/components/ImageModal';

const IMAGE_MAPPING: Record<string, StaticImageData> = {
  ARC: Images.Archers,
  PAV: Images.Pavisiers,
  SKM: Images.Skirmishers,
  BLV: Images.BowLevy,
  LFT: Images.LightFoot,
  LSP: Images.LightSpear,
  RDR: Images.Raiders,
  WBD: Images.Warband,
  RBL: Images.Rabble,
  EFT: Images.EliteFoot,
  SPR: Images.Spears,
  WRR: Images.Warriors,
  HFT: Images.HeavyFoot,
  PIK: Images.Pike,
  HRD: Images.Horde,
  ECV: Images.EliteCavalry,
  HBW: Images.HorseBow,
  JCV: Images.JavelinCavalry,
  BAD: Images.BadHorse,
  KNT: Images.Knights,
  CAT: Images.Cataphracts,
  CHT: Images.Chariots,
  BTX: Images.BattleTaxi,
  WWG: Images.WarWagon,
  ART: Images.Artillery,
  ELE: Images.Elephants,
};

export function TroopTypeCard({ troopType }: { troopType: TroopType }) {
  const img = IMAGE_MAPPING[troopType.permanentCode] ?? Images.NoImage;
  return (
    <div className="grid grid-cols-[1fr_max-content] grid-rows-2 gap-3">
      <header>
        <h3 className="mt-0">{troopType.displayName}</h3>
        <p className="text-2xl">{troopType.cost} Points</p>
        <p className="text-2xl">{troopType.order} Order</p>
      </header>
      <ImageModal image={img} altText={troopType.displayName}>
        <Image src={img} alt={troopType.displayName} height={175} />
      </ImageModal>
      <p className="col-span-2 text-sm">{troopType.description}</p>
    </div>
  );
}
