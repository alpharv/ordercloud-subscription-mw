import { NextRequest, NextResponse } from "next/server";
import { OrderWorksheet } from "ordercloud-javascript-sdk";

interface SubscriptionRequest {
    Environment: string,
    OrderCloudAccessToken: string,
    OrderWorksheet: OrderWorksheet,
    UnavailableProductIDs: string[],
    ErrorCode: string;
}

// Read this for base information on the integration calls from OrderCloud to the middleware: https://ordercloud.io/knowledge-base/subscriptions
export async function POST(request: NextRequest) {
    let subscriptionDataRequest: SubscriptionRequest = await request.json();
    console.log(subscriptionDataRequest);
    // TODO: Validate request.

    // TODO: Reading the OrderWorksheet and the ErrorCode and identify what actions to perform.
    // This is being called if something didn't go well. 

    return NextResponse.json({ HttpStatusCode: 200, UnhandledErrorBody: "" }, { status: 200 });
}

async function sendNotification() {
}

