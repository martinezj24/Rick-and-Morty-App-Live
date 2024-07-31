import { gql } from "urql";

export const GET_CHARACTERS = gql`
    query GetCharacters {
        characters {
            results {
                id,
                name,
                image
            }
        }
    }
`
export const GET_CHARACTER = gql`
    query GetCharacters {
        characters(id: ID!) {
            id,
            name,
            image,
            episode { 
                name,
                episode
            }
            
        }
    }
`

