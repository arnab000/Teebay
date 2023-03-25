import {gql} from '@apollo/client'

export const SIGN_UP_USER =gql`mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      name
      email
    }
  }`

export const LOGIN_USER =gql`query($email: String!) {
    user(email: $email) {
      id,
      password
    }
  }` 

  export const GET_PRODUCTS_BY_SELLER_ID =gql`
  query($id:Int!){
    productsBySellerId(id:$id){
      id,
      title,
      description,
      price,
      rent,
      rentType,
      categories{
        name
      }
      
    }
    
  }
  `

  export const ADD_PRODUCT =gql`mutation addProuduct($createProductInput:CreateProductInput!) {
    createProduct(createProductInput: $createProductInput) {
     id
  }
  
  }

  `

  export const DELETE_PRODUCT=gql`mutation($id:Int!){
    removeProduct(id:$id){
      id
    }
  }`

  export const GET_PRODUCT_BY_ID=gql`
  query($id:Int!){
    product(id:$id){
      title,
      price,
      rent,
      categories{
        id,
        name
      }
      description
      rentType
    }
  }
  `
  export const EDTT_PRODUCT = gql`
  mutation($updateProductInput: UpdateProductInput!){
    updateProduct(updateProductInput:$updateProductInput){
      id
    }
  }`

  export const GET_ALL_PROD =gql`
  query{
    products{
      id,
    
      description,title,categories{
        id,name
      },
      price,rent,rentType
    }
  }`
  export const BUY =gql`
  mutation($updateBoughtStatus:updateBoughtStatus!){
    updateBoughtStatus(updateBoughtStatus:$updateBoughtStatus){
      id
    }
  }
  `
  export const RENT =gql`
  mutation($endTime: DateTime!,
    $productId: Int!,
    $startTime: DateTime!,
    $userId: Int!){
  updateRentStatus(userId:$userId,productId:$productId,startTime:$startTime,endTime:$endTime){
    id
  }
}
  `