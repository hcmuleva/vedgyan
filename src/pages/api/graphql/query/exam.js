import { gql } from "@apollo/client";

const EXAM_FILTER_QUERY = gql`
query EXAM_FILTER($filters:ExamFiltersInput){
  exams(filters:$filters
  ){
    data{
      id
      attributes{
        name
        level
        category
        difficulty
        duration
      }
    }
  }
}`

const EXAM_BY_ID = gql`
query($id:ID){
  exam(id:$id){
    data{
      id
      attributes{
      	name
        pattern
        category
        duration
        difficulty
        level
        qbs{
          data{
            id
            attributes{
              options
              quetype
              quetype
              quetitle
              difficulty
              level
              answers
              
              
            }
          }
        }
      }
    }
  }
}
`
  export {EXAM_FILTER_QUERY,EXAM_BY_ID}