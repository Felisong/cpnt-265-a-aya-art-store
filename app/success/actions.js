"use server";

import Stripe from "stripe";

export const getServerSideProps = async (context) => {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const stripe = new Stripe(stripeSecret, {
    apiVersion: "2023-10-16",
  });

  if (typeof context !== "string") {
    return {
      notFound: true,
    };
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(context, {
      expand: ["line_items.data.price.product"],
    });

    const stipeDetails = {
      id: session.id,
      amountTotal: session.amount_total,
      paymentStatus: session.payment_status,
      currency: session.currency,
      customerDetails: session.customer_details,
      lineItems: session.line_items,
    };

    return {
      stripeSession: stipeDetails,
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};
