import React, { useState, useContext, createContext } from 'react'
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client'

const authContext = createContext()

export function AuthProvider({ children }) {
  const auth = useProvideAuth()

  return (
    <authContext.Provider value={auth}>
      <ApolloProvider client={auth.createApolloClient()}>{children}</ApolloProvider>
    </authContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(authContext)
}

function useProvideAuth() {
    const [user,setUser] = useState(null)
  const [authToken, setAuthToken] = useState(null)
  
  const getAuthHeaders = () => {
    if (!authToken) return null

    return {
      authorization: `Bearer ${authToken}`
    }
  }

  function createApolloClient() {
    const link = new HttpLink({
      uri: `${process.env.NEXT_PUBLIC_ENV_STRAPI_GRAPHQL}`,
      headers: getAuthHeaders()
    })

    return new ApolloClient({
      link,
      cache: new InMemoryCache()
    })
  }


  const signIn = async ({ identifier, password }) => {
    const client = createApolloClient()
    const LoginMutation = gql`
      mutation LoginMutation($identifier: String!, $password: String!) {
        login(input:{identifier: $identifier, password: $password}) {
          jwt
          user {
            id
            username
            
          }
        }
      }
    `

    const result = await client.mutate({
      mutation: LoginMutation,
      variables: { identifier, password }
    })

    if(result){
        localStorage.setItem('jwt',result.data.login.jwt)
        localStorage.setItem('user',JSON.stringify(result.data.login.user))
        setAuthToken(result.data.login.jwt)
        setUser(result.data.login.user)
        return {jwt:result.data.login.jwt, user:result.data.login.user}
    }
    // if (result?.data?.login?.jwt) {
    //   setAuthToken(result.data.login.jwt)
    //   return result
    // }
  }

  const isSignedIn = () => {
    if (typeof window !== 'undefined') {
       const  usertoken=localStorage.getItem('jwt')
    if (authToken||usertoken) {
      return true
    } else {
      return false
    }
    }
    //  if (authToken) {
    //   return true
    // } else {
    //   return false
    // }
    
  }
  
  const signOut = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt')
        localStorage.removeItem('user')
    }
    setAuthToken(null)
  }
  const getUser =()=>{
    if (typeof window !== 'undefined') {
        const  usertoken=localStorage.getItem('jwt')
        const user=localStorage.getItem('user')
     if (user) {
       return JSON.parse(user)
     } else {
       return false
     }
  }
  }
  return {
    createApolloClient,
    signIn,
    signOut,
    isSignedIn,
    getUser
  }
}
