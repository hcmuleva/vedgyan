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
  const [authToken, setAuthToken] = useState(null)
  const [user,setUser] = useState(null)
  const getAuthHeaders = () => {
    if (!authToken) return null

    return {
      authorization: `Bearer ${authToken}`
    }
  }

  function createApolloClient() {
    const link = new HttpLink({
      uri: 'http://localhost:1337/graphql',
      headers: getAuthHeaders()
    })

    return new ApolloClient({
      link,
      cache: new InMemoryCache()
    })
  }

  const signOut = () => {
    setAuthToken(null)
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
            role {
              id
              name
            }
          }
        }
      }
    `
    const result = await client.mutate({
      mutation: LoginMutation,
      variables: { identifier, password }
    })

    console.log("Is it resolved",result)
    if(result){
        console.log("inside first if",result.data.login.jwt)
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
    if (authToken) {
      return true
    } else {
      return false
    }
  }
  const getUser =()=>{
    if(authToken){
        return user
    }else {
        return null
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
