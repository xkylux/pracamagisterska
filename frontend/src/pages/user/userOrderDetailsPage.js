import UserOrderDetailsPageComp from "../../components/user/userOrderDetailsPageComp";
import { useSelector } from "react-redux";
import axios from 'axios';
import { loadScript } from "@paypal/paypal-js";
//import { Button } from "react-bootstrap";

const getOrder = async (orderId) => {
  const { data } = await axios.get("/api/zamowienia/uzytkownik/" + orderId);
  return data;
}

const payPalScript = (cartSubtotal, cartItems, orderId, updateStateAfterOrder) => {
  loadScript({ "client-id": "AaPatEaRM2gnIbm82qM0cRKB46QJ2-pVL_G5NtsOYosoW_Gu78VhrgZuP4ZhvgE9sl9LQhAYykHLx2s-" })
    .then(paypal => {
      paypal
        .Buttons(buttons(cartSubtotal, cartItems, orderId, updateStateAfterOrder))
        .render("#paypal-container-element");
    })
    .catch(err => {
      console.error("failed to load the PayPal JS SDK script", err);
    })
}

const buttons = (cartSubtotal, cartItems, orderId, updateStateAfterOrder) => {
  return {
    createOrder: function (data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: cartSubtotal,
              breakdown: {
                item_total: {
                  currency_code: "USD",
                  value: cartSubtotal,
                }
              }
            },
            items: cartItems.map(product => {
              return {
                name: product.name,
                unit_amount: {
                  currency_code: "USD",
                  value: product.price,
                },
                quantity: product.quantity,
              }
            })
          }
        ]
      })
    },
    onCancel: onCancelHandler,
    onApprove: function (data, actions) {
      return actions.order.capture().then(function (orderData) {
        var transaction = orderData.purchase_units[0].payments.captures[0];
        if (transaction.status === "COMPLETED" && Number(transaction.amount.value) === Number(cartSubtotal)) {
          updateOrder(orderId).then(data => {
            if (data.isPaid) {
              updateStateAfterOrder(data.paidAt);
            }
          }).catch((err) => console.log(err));
        }
      })
    },
    onError: onErrorHandler,
  }
}


const onCancelHandler = function () {
  console.log("cancel");
}

const onErrorHandler = function (err) {
  console.log("error");
}

const updateOrder = async (orderId) => {
  const { data } = await axios.put("/api/zamowienia/oplacone/" + orderId);
  return data;
}

const UserOrderDetailsPage = () => {
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

  const getUser = async () => {
    const { data } = await axios.get("/api/uzytkownicy/profil/" + userInfo._id);
    return data;
  }

  return <UserOrderDetailsPageComp userInfo={userInfo} getUser={getUser} getOrder={getOrder} payPalScript={payPalScript} />;
};

export default UserOrderDetailsPage;

