import styled from 'styled-components';

export { Menu } from 'semantic-ui-react';

export const HamburgerIcon = styled.div`
  width: 30px;
  height: 22px;
  position: absolute;
  top: 17px;
  right: 2%;
  transform: rotate(0deg);
  transition: .5s ease-in-out;
  cursor: pointer;
  z-index: 1000;

  @media (min-width: 768px) {
    display: none;
  }
}
`;

const HamburgerDash = styled.span`
  display: block;
  position: absolute;
  height: 5px;
  width: 100%;
  background: #54B7D2;
  border-radius: 5px;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: .25s ease-in-out;
`;

export const HamburgerDashTop = HamburgerDash.extend`
  top: 0px;
  transform-origin: left center;

  &.open {
    transform: rotate(45deg);
    top: -1.5px;
    left: 4px;
  }
`;

export const HamburgerDashMiddle = HamburgerDash.extend`
  top: 9px;
  transform-origin: left center;

  &.open {
    width: 0%;
    opacity: 0;
  }
`;

export const HamburgerDashBottom = HamburgerDash.extend`
  top: 18px;
  transform-origin: left center;

  &.open {
    transform: rotate(-45deg);
    top: 19.5px;
    left: 4px;
  }
`;
