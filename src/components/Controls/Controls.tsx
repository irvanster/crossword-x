import { Confirm, DropdownButton } from 'components';
import * as React from 'react';
import {
  checkGrid as cellsActionCheckGrid,
  checkLetter as cellsActionCheckLetter,
  checkWord as cellsActionCheckWord,
  clearGrid as cellsActionClearGrid,
  clearWord as cellsActionClearWord,
  revealGrid as cellsActionRevealGrid,
  revealLetter as cellsActionRevealLetter,
  revealWord as cellsActionRevealWord,
} from 'redux/cellsSlice';
import { useAppDispatch } from 'redux/hooks';
import './Controls.css';

interface ControlsProps {
  selectedClueGroup?: string[];
}

export default function Controls({
  selectedClueGroup,
}: ControlsProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [showCheckGridConfirm, setShowCheckGridConfirm] = React.useState(false);
  const [showRevealGridConfirm, setShowRevealGridConfirm] =
    React.useState(false);
  const [showClearGridConfirm, setShowClearGridConfirm] = React.useState(false);

  const checkMenu = React.useMemo(
    () => [
      {
        disabled: selectedClueGroup === undefined,
        onClick: () => dispatch(cellsActionCheckLetter()),
        text: 'Check letter',
      },
      {
        disabled: selectedClueGroup === undefined,
        onClick: () => {
          if (selectedClueGroup !== undefined) {
            dispatch(cellsActionCheckWord(selectedClueGroup));
          }
        },
        text: 'Check word',
      },

      { onClick: () => setShowCheckGridConfirm(true), text: 'Check grid' },
    ],
    [selectedClueGroup],
  );

  const revealMenu = React.useMemo(
    () => [
      {
        disabled: selectedClueGroup === undefined,
        onClick: () => dispatch(cellsActionRevealLetter()),
        text: 'Reveal letter',
      },
      {
        disabled: selectedClueGroup === undefined,
        onClick: () => {
          if (selectedClueGroup !== undefined) {
            dispatch(cellsActionRevealWord(selectedClueGroup));
          }
        },
        text: 'Reveal word',
      },
      { onClick: () => setShowRevealGridConfirm(true), text: 'Reveal grid' },
    ],
    [selectedClueGroup],
  );

  const clearMenu = React.useMemo(
    () => [
      {
        disabled: selectedClueGroup === undefined,
        onClick: () => {
          if (selectedClueGroup !== undefined) {
            dispatch(cellsActionClearWord(selectedClueGroup));
          }
        },
        text: 'Clear word',
      },
      { onClick: () => setShowClearGridConfirm(true), text: 'Clear grid' },
    ],
    [selectedClueGroup],
  );

  if (showCheckGridConfirm) {
    return (
      <div className="Controls">
        <Confirm
          buttonText="Confirm check grid"
          onCancel={() => setShowCheckGridConfirm(false)}
          onConfirm={() => {
            dispatch(cellsActionCheckGrid());
            setShowCheckGridConfirm(false);
          }}
        />
      </div>
    );
  }

  if (showRevealGridConfirm) {
    return (
      <div className="Controls">
        <Confirm
          buttonText="Confirm reveal grid"
          onCancel={() => setShowRevealGridConfirm(false)}
          onConfirm={() => {
            dispatch(cellsActionRevealGrid());
            setShowRevealGridConfirm(false);
          }}
        />
      </div>
    );
  }

  if (showClearGridConfirm) {
    return (
      <div className="Controls">
        <Confirm
          buttonText="Confirm clear grid"
          onCancel={() => setShowClearGridConfirm(false)}
          onConfirm={() => {
            dispatch(cellsActionClearGrid());
            setShowClearGridConfirm(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className="Controls">
      <DropdownButton menu={checkMenu} text="Check" />
      <DropdownButton menu={revealMenu} text="Reveal" />
      <DropdownButton menu={clearMenu} text="Clear" />
      <button className="Controls__button" type="button">
        Anagram helper
      </button>
    </div>
  );
}