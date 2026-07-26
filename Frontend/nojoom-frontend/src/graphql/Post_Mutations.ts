import { gql } from '@apollo/client';

export const CREATE_ORDER_MUTATION = gql`
  mutation Create_Order($Customer_Id: String!, $Items: JSON!, $Total: Int!, $Payment_Method: String!) {
    Create_Order(Customer_Id: $Customer_Id, Items: $Items, Total: $Total, Payment_Method: $Payment_Method) {
      Id
      Status
    }
  }
`;

export const UPDATE_ORDER_STATUS_MUTATION = gql`
  mutation Update_Order_Status($Order_Id: String!, $Status: String!) {
    Update_Order_Status(Order_Id: $Order_Id, Status: $Status) {
      Id
      Status
    }
  }
`;

export const ADD_TO_CART_MUTATION = gql`
  mutation Add_To_Cart($Product_Id: String!, $Quantity: Int!) {
    Add_To_Cart(Product_Id: $Product_Id, Quantity: $Quantity) {
      Product_Id
      Quantity
      Available_Stock
    }
  }
`;
