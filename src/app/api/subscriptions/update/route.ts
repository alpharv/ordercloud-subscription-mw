import { IncomingHttpHeaders } from "http";
import { NextRequest, NextResponse } from "next/server";
import { Payment } from "ordercloud-javascript-sdk";

type StandardHeaders = {
    [K in keyof IncomingHttpHeaders as string extends K
    ? never
    : number extends K
    ? never
    : K]: IncomingHttpHeaders[K];
};

interface WebhookRequest {
    Route: string;
    RouteParams: { [key: string]: string };
    QueryParams: { [key: string]: string };
    Verb: string;
    Date: Date;
    LogID: string;
    UserToken: string;
    Request: { Body: JSON, Headers: StandardHeaders },
    Response: { Body: SubscriptionReponseBody, Headers: StandardHeaders },
    ConfigData: []
}

interface SubscriptionReponseBody {
    ID: string;
    Frequency: number;
    Interval: string;
    NextOrderDate: Date;
    LastOrderDate: Date;
    NotificationDate: Date
    EndDate: Date;
    Active: boolean;
    FromCompanyID: string;
    FromUserID: string;
    ToCompanyID: string;
    Payment: Payment;
    BillingAddressID: string;
    ShippingAddressID: string;
    xp: null
}

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
        } else if (webhookRequest.Verb === 'POST') {
            let subscriptionID = webhookRequest.Response.Body.ID;
            console.log("Subscription created [POST - subscriptionID=" + subscriptionID);
        } else if (webhookRequest.Verb === 'PATCH') {
            let subscriptionID = webhookRequest.Response.Body.ID;
            console.log("Subscription updated [PATCH] - subscriptionID=" + subscriptionID);
        } else if (webhookRequest.Verb === 'PUT') {
            let subscriptionID = webhookRequest.Response.Body.ID;
            console.log("Subscription updated/created  [PUT] - subscriptionID=" + subscriptionID);
        }
        return NextResponse.json({ HttpStatusCode: 200, UnhandledErrorBody: "" }, { status: 200 });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({}, { status: 500 });
    }
}

