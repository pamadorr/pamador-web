// @/lib/graphql-client.ts

import { GraphQLClient } from 'graphql-request'
import { gql } from 'graphql-request'

// Create an instance of GraphQLClient pointing to your GraphQL API
export const graphQLClient = new GraphQLClient(`${process.env.NEXT_PUBLIC_GRAPHQL_URI}`)
export const GET_MENU_ITEMS = gql`
  query GetRestaurantBySlug($slug: String!, $languageId: String = "tm") {
    restaurants: restaurants(where: { slug: { _eq: $slug } }) {
      id
      images
      logo
      imagesBlurhash: images_blurhash
      appTheme
      productsView
      phoneNumbers: phone_numbers
      services
      openTime: open_time
      closeTime: close_time
      translations: restaurant_translations(where: { language_id: { _eq: $languageId } }) {
        title
        slogan
        address
      }
      menus(order_by: { order: asc }, where: { products: {} }) {
        id
        image
        imageBlurhash: image_blurhash
        translations: menu_translations(where: { language_id: { _eq: $languageId } }) {
          title
        }
        products(where: { stopped: { _eq: false } }) {
          id
          images
          imagesBlurhash: images_blurhash
          price
          discount
          hasCutlery: has_cutlery
          portionSize: portion_size
          preparationTime: preparation_time
          translations: product_translations(where: { language_id: { _eq: $languageId } }) {
            title
            description
          }
          options: product_options(order_by: { order: asc }) {
            id
            required
            multiCheck: multi_check
            translations: product_option_translations(
              where: { language_id: { _eq: $languageId } }
            ) {
              title
              description
            }
            metas: product_options_meta(order_by: { order: asc }) {
              id
              price
              discount
              translations: product_option_meta_translations(
                where: { language_id: { _eq: $languageId } }
              ) {
                title
              }
            }
          }
        }
      }
    }
  }
`
