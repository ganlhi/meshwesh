import { ReactNode } from 'react';

export default function BattleCardsLayout(props: { children: ReactNode; modal: ReactNode }) {
  return (
    <>
      {props.modal}
      {props.children}
    </>
  );
}
