import { gql } from "@apollo/client";



const PROFILE_QUERY = gql`
  query PROFILE_QUERY($id: ID!) {
    
        profiles(filters:{userid:{id:{eq:$id}}}){
          data{
            id
            attributes{
              firstname
              lastname
              mobile
              photo{
                data{
                  attributes{
                    formats
                  }
                }
              }
            }
          }
        }
  }
`;
export {PROFILE_QUERY}