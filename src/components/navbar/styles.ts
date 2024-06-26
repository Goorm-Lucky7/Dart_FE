import { colors } from '@/styles/colorPalette';
import { LayoutMap } from '@/styles/layout';
import styled from '@emotion/styled';
import Text from '../Text';

export const Container = styled.div`
  height: 80px;
  width: 100%;
  background-color: ${colors.gray50};
  ${LayoutMap.displayFlex}
  ${LayoutMap.pageLayout}
  justify-content: center;
`;

export const MaxWidthWrapper = styled.div`
  max-width: 1440px;
  min-width: 800px;
  width: 100%;
  padding: 0px 80px;
  ${LayoutMap.displayFlex}
  justify-content: space-between;
`;

export const MainLogo = styled.img`
  width: fit-content;
  height: fit-content;
  cursor: pointer;
`;

export const ButtonBox = styled.div`
  ${LayoutMap.displayFlex}
  gap: 40px;
`;

export const UserBoxContainer = styled.div`
  ${LayoutMap.displayFlex}
  gap: 10px;
  position: relative;
  cursor: pointer;
`;

export const MoreBox = styled.div`
  position: absolute;
  ${LayoutMap.displayFlex}
  flex-direction: column;
  background-color: ${colors.white};
  bottom: 0;
  transform: translate(-25%, 110%);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: var(--detailList-zindex);
`;

export const MoreItem = styled(Text)<{ isLast: boolean }>`
  ${LayoutMap.displayFlex}
  justify-content:center;
  width: 120px;
  padding: 10px 0;
  border-bottom: 1px solid ${colors.gray100};
  :hover {
    background-color: ${colors.gray100};
  }
`;

export const NavItem = styled(Text)`
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;

  &:hover::after {
    width: 100%;
    left: 0;
  }

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -2px;
    left: 50%;
    background-color: black;
    transition:
      width 0.3s ease,
      left 0.3s ease;
  }
`;
