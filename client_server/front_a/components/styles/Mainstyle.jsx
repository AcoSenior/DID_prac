import styled from 'styled-components';

const MainTemplate = styled.div`
  position: absolute;
  width: 100%;
  height: 15rem;
  margin-top: 50rem;

  .menuIcon {
    width: 100%;
    position: relative;
    padding-top: 7rem;
    & .menuFlex {
      width: 100%;
      display: flex;
      justify-content: space-around;
      padding: 0 6rem;
    }
  }
`;

export default ({ children }) => {
  return <MainTemplate>{children}</MainTemplate>;
};
