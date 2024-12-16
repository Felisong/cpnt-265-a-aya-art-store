import { useEffect, useState } from "react";

export default function OrderSummary({ session }) {
  const [stripeSession, setStripeSession] = useState(null);
  const [total, setTotal] = useState(null);
  function setData() {
    setStripeSession(session);
  }
  useEffect(() => {
    setData();
    getTotal();
  }, [session]);

  function getTotal() {
    if (session) {
      const total = session.amountTotal / 100;
      setTotal(total.toFixed(2));
    }
  }

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
      <>
        <p className="text-lg"> Please save this for your records.</p>
        <div className="w-full break-words mt-8 flex flex-col gap-4">
          <h2 className="text-2xl">Order Summary</h2>

          <p className="text-xl">
            Order ID: <span className="text-lg">{stripeSession.id}</span>
          </p>
          <p className="text-xl">
            {" "}
            Status:{" "}
            <span className="text-lg">{stripeSession.paymentStatus}</span>
          </p>
          <p className="text-xl">
            Total Amount: <span className="text-lg">$ {total}</span>
          </p>
          <p className="text-xl">
            Shipping Address:{" "}
            <span className="text-lg">
              {formatAddress(stripeSession.customerDetails.address)}
            </span>
          </p>
          <div>
            <h3 className="text-2xl">Products Ordered:</h3>
            {stripeSession.lineItems.data.map((item) => (
              <div key={item.id} className="text-lg">
                <p>{item.description}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.amount_total / 100}</p>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}
