import { gql } from "@apollo/client";

const SUBJECT_FILTER_QUERY = gql`
query SUBJECT_FILTER($filters:SubjectFiltersInput){
    subjects(filters:$filters
    ){
      data{
        id
        attributes{
          name
          class
        }
      }
    }
  }`
  export {SUBJECT_FILTER_QUERY}