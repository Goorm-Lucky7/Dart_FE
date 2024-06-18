import { colors } from '@/styles/colorPalette';
import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 65px);
`;

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 20px;
  padding: 20px;
  flex: 1;
  overflow-y: auto;

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

export const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  section {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;