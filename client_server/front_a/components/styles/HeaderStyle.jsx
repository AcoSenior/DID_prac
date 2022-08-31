import styled from 'styled-components';

const HeaderTemplate = styled.div`
  position: 'absolute';
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #fff;
  width: 100%;
  height: 4rem;
  border-bottom: 0.08rem solid #000;
  line-height: 4rem;
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
  padding: 0;

  ul,
  li {
    list-style: none;
  }

  .header {
    & > .logo {
      width: 15%;
    }
    & > .menu {
      width: 65%;

      & > Center {
        width: 15%;
        text-align: center;
      }
    }
    & > .user {
      width: 20%;
      display: flex;
      justify-content: space-evenly;
      & > Button {
        width: 35%;
        transform: translateY(25%);
      }
    }
  }

  .menuHover {
    width: 100%;
    height: 35rem;
    position: absolute;
    background: #fff;
    z-index: 1;
    border-bottom: 0.1rem solid #000;
  }
`;

export default ({ children }) => {
  return <HeaderTemplate>{children}</HeaderTemplate>;
};
