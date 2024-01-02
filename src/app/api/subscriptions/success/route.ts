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
    //console.log(subscriptionDataRequest);
    // TODO: Validate incomming request for sucurity and data integrity.
    if (isNotification(subscriptionDataRequest.OrderWorksheet)) {
        // This is a notification request. We need to send a notification to the user.
        sendNotification(subscriptionDataRequest.OrderWorksheet);
    }
    else {
        // This is a subscription order request. We need to create the subscription order.
        createSubscriptionOrder(subscriptionDataRequest.OrderWorksheet);
    }
    // TODO: Make sure to only return a HttpStatusCode of 200 if the request was successful. Otherwise return a 500. 
    return NextResponse.json({ HttpStatusCode: 200, UnhandledErrorBody: "" }, { status: 200 });
}

// Identify if this is a notification request or a subscription order request.
function isNotification(wrksheet: OrderWorksheet): boolean {
    if (wrksheet.Subscription?.NotificationDate) {
        // We a notification date. Let's check if it's in the past
        let notificationDate = new Date(wrksheet.Subscription?.NotificationDate);
        let notificationDiff = Date.UTC(notificationDate.getFullYear(), notificationDate.getMonth(), notificationDate.getDate(), notificationDate.getUTCHours(), notificationDate.getMinutes(), notificationDate.getSeconds(), 0) - Date.now();
        if (notificationDiff < 0) {
            // Notification is in the past, so we should send out a notification telling them thatn a subscription order is about to be created.
            // Potentially add order checks and rules to control when if and now notifications are sent.
            // Recommended to use xp's to mark if and when a notificaton has been sent, so that you have full controll if something goes wrong. 
            return true;
        } else
            return false;
    } else
        return true;
}

/// Send a notification to the user that a subscription order is about to be created.
async function sendNotification(wrksheet: OrderWorksheet) {
    console.log("Sending notification. OrderID:" + wrksheet.Order?.ID + " SubscriptionID:" + wrksheet.Subscription?.ID);
    // TODO: Send the notification.
    // 1. Create the notification.
    // 2. Populate data needed for the notifications
    // 3. Send the notification.
}

/// Create the subscription order.
async function createSubscriptionOrder(wrksheet: OrderWorksheet) {
    console.log("Creating subscription order. OrderID:" + wrksheet.Order?.ID + " SubscriptionID:" + wrksheet.Subscription?.ID);
    // TODO: Create the subscription order.
    // 1. Create the order.
    // 2. Add the line items.
    // 3. Calucate tax and shipping
    // 4. Perform the payment
    // 5. Submit the order.
}