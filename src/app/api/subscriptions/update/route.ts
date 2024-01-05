import { NextRequest, NextResponse } from "next/server";
import { WebhookRequest } from "./../../../../types/WebhookRequest";

// Read this for base information on the web hooks from OrderCloud: https://ordercloud.io/knowledge-base/using-webhooks
// https://ordercloud.io/knowledge-base/subscriptions
export async function POST(request: NextRequest) {
    try {
        const webhookRequest: WebhookRequest = await request.json();
        console.log("webhookRequest:", webhookRequest);
        console.log("webhookRequest.VERB:", webhookRequest.Verb);

        if (webhookRequest.Verb === 'DELETE') {
            let subscriptionID = webhookRequest.RouteParams.subscriptionID;
            console.log("Subscription deleted [DELETE] - subscriptionID=" + subscriptionID);
            // TODO: Delete the subscription from your system
        } else if (webhookRequest.Verb === 'POST') {
            let subscriptionID = webhookRequest.Response.Body.ID;
            console.log("Subscription created [POST - subscriptionID=" + subscriptionID);
            // TODO: Create the subscription in your system
        } else if (webhookRequest.Verb === 'PATCH') {
            let subscriptionID = webhookRequest.Response.Body.ID;
            console.log("Subscription updated [PATCH] - subscriptionID=" + subscriptionID);
            // TODO: Update the subscription in your system
        } else if (webhookRequest.Verb === 'PUT') {
            let subscriptionID = webhookRequest.Response.Body.ID;
            console.log("Subscription updated/created  [PUT] - subscriptionID=" + subscriptionID);
            // TODO: Update the subscription in your system
        }
        return NextResponse.json({ HttpStatusCode: 200, UnhandledErrorBody: "" }, { status: 200 });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({}, { status: 500 });
    }
}

