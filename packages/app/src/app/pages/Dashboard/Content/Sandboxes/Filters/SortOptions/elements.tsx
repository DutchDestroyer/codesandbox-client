import styled, { css } from 'styled-components';
import ArrowDown from 'react-icons/lib/md/arrow-downward';

export const OptionContainer = styled.a<{ selected: boolean }>`
  transition: 0.3s ease color;
  display: flex;
  vertical-align: middle;
  align-items: center;
  margin-bottom: 0.5rem;
  color: ${props =>
    props.theme.light ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)'};
  text-decoration: none;
  cursor: pointer;
  font-weight: 600;
  appearance: none;
  background: none;
  border: none;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    color: white;
  }

  ${props =>
    props.selected &&
    css`
      color: white;
    `};
`;

export const IconContainer = styled.div`
  width: 1rem;
  margin-right: 0.5rem;
`;

export const Container = styled.div<{ hideOrder: boolean }>`
  transition: 0.3s ease opacity;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
  width: 175px;
  text-align: right;

  ${props =>
    props.hideOrder &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `};
`;

export const OverlayContainer = styled.div`
  overflow: hidden;
  box-sizing: border-box;
  right: 0;
  text-align: left;
  line-height: 1.6;
  width: 200px;
  padding: 1rem;
  z-index: 10;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;

  border-radius: 2px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.3);

  background-color: ${props => props.theme.background};
`;

export const OrderName = styled.span`
  transition: 0.3s ease color;
  color: rgba(255, 255, 255, 0.8);
  appearance: none !important;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: white;
  }
`;

export const Arrow = styled(ArrowDown)`
  transition: 0.3s ease all;

  cursor: pointer;

  font-size: 1rem;

  &:hover {
    color: white;
  }
`;
