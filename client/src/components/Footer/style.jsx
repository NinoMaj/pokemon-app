import styled from 'styled-components';

export const Footer = styled.div`
  padding: 0.01em 16px;
  padding-top: 32px;
  padding-bottom: 32px;
  background-color: #f1f1f1;
  width: auto;
  position: absolute;
  right: 0px;
  bottom: 0px;
  left: 0px;

  &:after, &:before {
    content: "";
    display: table;
    clear: both
  }
`;

export const Section = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const Link = styled.a`
  color: #000;
  text-decoration: underline;

  &:hover {
    color: #54B7D2;
  }
`;
