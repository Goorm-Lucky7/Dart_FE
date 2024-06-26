import { colors } from '@/styles/colorPalette';
import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 65px);
`;

export const ScrollableContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: end;
  padding: 20px;
  flex: 1;
  height: 100%;
  overflow-y: scroll;
  gap: 40px;

  /* 스크롤 스타일 */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(150, 150, 150, 0.5);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(85, 85, 85, 0.5);
  }
`;

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InputBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 70px;
  padding: 10px;
  border-top: 1px solid ${colors.black};
`;

export const Input = styled.input`
  width: 100%;
  height: 80%;
  padding: 0 10px;
  border-radius: 10px;
  border: 1px solid ${colors.black};
`;

export const ChatBox = styled.div<{ isAuthor: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ isAuthor }) => (isAuthor ? 'flex-start' : 'flex-end')};
  gap: 5px;
  margin-top: 20px;

  > p {
    margin-left: 20px;
    padding: 10px;
    background: ${colors.white};
    border-radius: ${({ isAuthor }) =>
      isAuthor ? '0px 10px 10px 10px' : '10px 0px 10px 10px'};
  }
`;

export const SenderBlock = styled.div<{ isAuthor: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-direction: ${({ isAuthor }) => (isAuthor ? 'row-reverse' : 'row')};

  cursor: pointer;

  p {
    color: ${({ isAuthor }) => (isAuthor ? colors.red : colors.black)};
  }
`;
