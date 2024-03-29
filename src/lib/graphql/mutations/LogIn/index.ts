import { gql } from 'apollo-boost'

export const LOG_IN = gql`
  mutation LogIn($input: LoginInInput){
    logIn(input: $input) {
      id
      token
      avatar
      hasWallet
      didRequest
    }
  }
`;