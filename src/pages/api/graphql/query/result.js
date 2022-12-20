import { gql } from "@apollo/client";

const RESULTS_QUERY = gql`
    query($filters:ResultFiltersInput){
  results(filters:$filters){
    data{
      id
      attributes{
    score
      total
      correct
      wrong
      na
      level
      attempted
      details
      na
      exam{
          data{
            id
            attributes{
              name
            }
          }
        }
      }
    }
  }
}
`
  export {RESULTS_QUERY}