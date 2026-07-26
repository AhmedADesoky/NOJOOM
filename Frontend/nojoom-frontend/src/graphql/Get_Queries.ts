import { gql } from '@apollo/client';

export const GET_PRODUCTS_QUERY = gql`
  query Get_Products($Category: String) {
    Products(Category: $Category) {
      Id
      Name
      Price
      Discount_Price
      Stock
      Color
      Category
      Image_Url
    }
  }
`;

export const GET_PRODUCT_BY_ID_QUERY = gql`
  query Get_Product_By_Id($Id: String!) {
    Product_By_Id(Id: $Id) {
      Id
      Name
      Price
      Discount_Price
      Stock
      Color
      Category
      Description
      Image_Url
    }
  }
`;

export const GET_ORDERS_QUERY = gql`
  query Get_Orders($Customer_Id: String!) {
    Orders(Customer_Id: $Customer_Id) {
      Id
      Total
      Status
      Payment_Method
      Created_At
      Items {
        Product_Id
        Quantity
        Price
        Color
        Size
      }
    }
  }
`;

export const GET_ORDER_BY_ID_QUERY = gql`
  query Get_Order_By_Id($Id: String!) {
    Order_By_Id(Id: $Id) {
      Id
      Customer_Id
      Total
      Status
      Payment_Method
      Created_At
      Items {
        Product_Id
        Quantity
        Price
        Color
        Size
      }
    }
  }
`;
