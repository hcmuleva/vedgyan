import { gql } from "@apollo/client";
const CREATE_RESULT=gql`
mutation($ResultInput:ResultInput!){
    createResult(data:$ResultInput){
      data{
        id
        attributes{
          total
        }
      }
    }
  }
  `
  export {CREATE_RESULT}