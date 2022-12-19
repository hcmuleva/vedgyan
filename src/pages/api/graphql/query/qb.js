import { gql } from "@apollo/client";

const QB_FILTER = gql`
query QB_FILTER($filters:QbFiltersInput){
  qbs(filters:$filters
  ){
    data{
      id
      attributes{
        quetype
        level
        quetitle
        quephoto{
          data{
            id
            attributes{
              url
            }
          }
        }
        difficulty
        description
        options
        answers
        explainations
        exam{
          data{
            id

          }
          
        }
      }
    }
  }
}`
  export {QB_FILTER}