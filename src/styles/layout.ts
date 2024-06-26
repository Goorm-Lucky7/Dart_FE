import { css } from '@emotion/react';

export const LayoutMap = {
  pageLayout: css`
    padding: 0 80px;
  `,
  displayFlex: css`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  absoluteCenter: css`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  `,
  flexBoxScrollbar: css`
    flex: 1;
    overflow: scroll;
    overflow-x: hidden;
  `,
  noneScrollbar: css`
    ::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE와 Edge */
  `,
};
