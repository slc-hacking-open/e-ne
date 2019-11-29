import React, { FC } from "react";

export interface UndoProps {
  undoCount?: number;
  undo?: () => void;
}

const Undo: FC<UndoProps> = ({
  undoCount = "",
  undo = () => { }
}) => (
    <div>
      <p>{undoCount}個の投稿があります！</p>
      <button type="button" onClick={undo}>１つ戻す</button>
    </div>

  );

export default Undo;

