import { useEffect, useState } from "react";

export default function OrderSummary({ session }) {
  const [stripeSession, setStripeSession] = useState(null);
  function setData() {
    setStripeSession(session);
  }
  useEffect(() => {
    setData();
  }, [session]);

  const formatAddress = (address) => {
    const { line1, line2, city, state, postal_code, country } = address;
    const formattedAddress = [line1, line2, city, state, postal_code, country]
      .filter(Boolean)
      .join(", ");
    return formattedAddress || "N/A";
  };

  if (stripeSession === null) {
    return <p> loading</p>;
  } else {
    return (
      <div>
        <h2>Order Summary</h2>
        <p>Order ID: {stripeSession.id}</p>
        <p> Status: {stripeSession.paymentStatus}</p>
        <p>Total Amount: ${stripeSession.amountTotal / 100}</p>
        <p>
          Shipping Address:{" "}
          {formatAddress(stripeSession.customerDetails.address)}
        </p>
        <div>
          <h3>Line Items</h3>
          {stripeSession.lineItems.data.map((item) => (
            <div key={item.id}>
              <p>{item.description}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.amount_total / 100}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
