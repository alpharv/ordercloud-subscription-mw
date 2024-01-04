import { NextRequest, NextResponse } from "next/server";
import { OrderWorksheet } from "ordercloud-javascript-sdk";

interface SubscriptionRequest {
    Environment: string;
    OrderCloudAccessToken: string;
    OrderWorksheet: OrderWorksheet;
    UnavailableProductIDs: string[];
    ErrorCode: string;
}

// Read this for base information on the integration calls from OrderCloud to the middleware:
// https://ordercloud.io/knowledge-base/subscriptions
export async function POST(request: NextRequest) {
    try {
        const subscriptionDataRequest: SubscriptionRequest = await request.json();
        // TODO: Validate incoming request for security and data integrity.

        if (isNotification(subscriptionDataRequest.OrderWorksheet)) {
            // This is a notification request. Send a notification to the user.
            await sendNotification(subscriptionDataRequest.OrderWorksheet);
        } else {
            // This is a subscription order request. Create the subscription order.
            await createSubscriptionOrder(subscriptionDataRequest.OrderWorksheet);
        }

        return NextResponse.json({ HttpStatusCode: 200, UnhandledErrorBody: "" }, { status: 200 });
    } catch (error) {
        let message;
        if (error instanceof Error)
            message = error.message
        else
            message = String(error);
        console.error("Error processing request:", error);
        return NextResponse.json({ HttpStatusCode: 500, UnhandledErrorBody: message }, { status: 500 });
    }
}

// Identify if this is a notification request or a subscription order request.
function isNotification(wrksheet: OrderWorksheet): boolean {
    if (wrksheet.Subscription?.NotificationDate) {
        // We have a notification date. Check if it's in the past.
        const notificationDate = new Date(wrksheet.Subscription?.NotificationDate);
        const notificationDiff =
            Date.UTC(
                notificationDate.getFullYear(),
                notificationDate.getMonth(),
                notificationDate.getDate(),
                notificationDate.getUTCHours(),
                notificationDate.getMinutes(),
                notificationDate.getSeconds(),
                0
            ) - Date.now();

        return notificationDiff < 0;
    }

    return true;
}

// Send a notification to the user that a subscription order is about to be created.
async function sendNotification(wrksheet: OrderWorksheet) {
    console.log("Sending notification. OrderID:", wrksheet.Order?.ID, "SubscriptionID:", wrksheet.Subscription?.ID);

    // TODO: Implement notification logic.
}

// Create the subscription order.
async function createSubscriptionOrder(wrksheet: OrderWorksheet) {
    console.log("Creating subscription order. OrderID:", wrksheet.Order?.ID, "SubscriptionID:", wrksheet.Subscription?.ID);

    // TODO: Implement order creation logic.
}