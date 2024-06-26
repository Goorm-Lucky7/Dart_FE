import styled from '@emotion/styled';

const Dimmed = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.35);
  z-index: var(--dimmed-zindex);
`;

export default Dimmed;