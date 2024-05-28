import { css } from '@emotion/react';
import { colors } from './colorPalette';

export const buttonSizeMap = {
  small: css`
    font-size: 12px;
    width: 80px;
    height: 30px;
  `,
  medium: css`
    font-size: 24px;
    width: 150px;
    height: 50px;
  `,
  large: css`
    font-size: 32px;
    width: 280px;
    height: 80px;
  `,
  full: css``,
};

export const buttonTypeMap = {
  rectangleBlack: css`
    background-color: ${colors.black};
    color: ${colors.white};
  `,
  rectangleGray: css`
    background-color: ${colors.gray200};
    color: ${colors.gray500};
  `,
  rectangleWhite: css`
    background-color: ${colors.white};
    color: ${colors.black};
  `,
  reverseRectangleGray: css`
    background-color: ${colors.white};
    border: 2px solid ${colors.gray100};
    color: ${colors.gray500};
  `,
  reverseRectangleWhite: css`
    background-color: inherit;
    border: 2px solid ${colors.white};
    color: ${colors.white};
  `,
  RoundBlack: css`
    background-color: ${colors.black};
    border: 1px solid ${colors.black};
    color: ${colors.white};
    border-radius: 30px;
  `,
  reverseRoundBlack: css`
    background-color: inherit;
    border: 1px solid ${colors.black};
    color: ${colors.white};
    border-radius: 30px;
  `,
  reverseRounDash: css`
    background-color: ${colors.white};
    border: 1px dashed ${colors.black};
    color: ${colors.gray500};
    border-radius: 30px;
  `,
  reverseRadius: css`
    background-color: ${colors.white};
    border: 2px solid ${colors.gray500};
    color: ${colors.gray500};
    border-radius: 10px;
  `,
};

export type ButtonType = keyof typeof buttonTypeMap;
export type ButtonSize = keyof typeof buttonSizeMap;
