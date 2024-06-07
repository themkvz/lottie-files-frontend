import { gql } from '@apollo/client'

export const GET_ANIMATIONS = gql`
  query GetAnimations($page: Int, $nameRegex: RegExpAsString) {
    animations(
      page: $page
      filter: { _operators: { name: { regex: $nameRegex } } }
    ) {
      items {
        id
        jsonName
        name
        slug
        createdAt
      }
      pageInfo {
        itemCount
        pageCount
        currentPage
      }
    }
  }
`
