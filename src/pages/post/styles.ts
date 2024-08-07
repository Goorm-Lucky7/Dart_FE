import { buttonSizeMap, buttonTypeMap } from '@/styles/button';
import { colors } from '@/styles/colorPalette';
import { LayoutMap } from '@/styles/layout';
import styled from '@emotion/styled';
import Text from '@/components/Text';

export const Breakpoints = {
  tablet: 1390,
  column: 870,
  mobile: 500,
};

export const Layout = styled.div`
  container: post / inline-size;
  display: flex;
  justify-content: center;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  margin-bottom: 50px;
  width: 100%;
  max-width: 1440px;
  ${LayoutMap.pageLayout}
`;

export const Box = styled.div`
  border: 2px solid black;
  max-width: 1440px;
  min-width: 370px;
  width: 100%;
`;

export const Quit = styled.div`
  display: flex;
  justify-content: end;
  padding: 5px 10px;
  border-bottom: 2px solid black;
`;

export const Block = styled.div`
  ${LayoutMap.displayFlex}
  justify-content: center;
  height: 80px;
  border-top: solid 2px ${colors.black};
`;

export const Submit = styled.button`
  ${buttonSizeMap.smMd}
  ${buttonTypeMap.reverseRadius}
  transition : all 0.3s ease;

  &:hover {
    ${buttonTypeMap.rectangleBlack}
  }
`;

export const ModalText = styled(Text)`
  display: flex;
  justify-content: center;
`;

export const ProgressBar = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  ${LayoutMap.displayFlex};
  justify-content: center;
  z-index: 200;
`;

interface ProgressProps {
  $progress: number;
}

export const ProgressBox = styled.div`
  position: fixed;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 202;
  ${LayoutMap.displayFlex};
  justify-content: center;
  flex-direction: column;
`;

export const CircularProgress = styled.div<ProgressProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 200px;
  width: 200px;
  border-radius: 50%;
  background: ${(props) =>
    `conic-gradient(from 0deg, #03d100 ${props.$progress * 3.6}deg, #ededed 0deg)`};
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    height: 140px;
    width: 140px;
    border-radius: 50%;
    background-color: #fff;
  }
`;

export const ProgressValue = styled.span`
  position: relative;
  font-size: 32px;
  font-weight: bold;
  color: #03d100;
`;
