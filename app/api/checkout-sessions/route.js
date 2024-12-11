import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function POST(request) {
  console.log("do i appear?");
  if (request.method === "POST") {
    // when requesting, be sure to submit the data i receive from my cart.
    const body = await request.json();
    console.log(body);

    const { cartItems, returnUrl, userId } = body;

    // map cart items to stripe line format
    const line_items = cartItems.map((item) => {
      return {
        price_data: {
          currency: "cad",
          product_data: {
            name: item.product_title,
          },
          unit_amount: item.price_per * 100,
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      client_reference_id: userId,
      line_items,
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      success_url: `${body.returnUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${returnUrl}/cancel`,
    });
    // console.log(session.id);
    return NextResponse.json({ sessionId: session.id });
  }

  return new Response("Method Not Allowed", { status: 405 });
}
