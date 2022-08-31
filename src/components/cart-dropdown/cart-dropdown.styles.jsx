import styled from 'styled-components';
import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton
} from '../button/button.styles.jsx'

export const CartDropdownContainer = styled.div`
    position: absolute;
    width: 240px;
    height: 340px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border: 1px solid black;
    background-color: white;
    top: 90px;
    right: 40px;
    z-index: 5;

    ${BaseButton},
    ${GoogleSignInButton},
    ${InvertedButton}{
      margin-top: auto;
      font-size: 14px;
    }
`

export const EmptyMessage = styled.span`
    font-size: 18px;
    margin: 50px auto;
`


export const CartItems = styled.div`
      height: 240px;
      display: flex;
      flex-direction: column;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        width: 20px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #d6dee1;
        border-radius: 20px;
        border: 6px solid transparent;
        background-clip: content-box;
      }
      &::-webkit-scrollbar-thumb:hover {
        background-color: #a8bbbf;
      }

`

  