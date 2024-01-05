import { StandardHeaders } from "./StandardHeaders";
import { SubscriptionReponseBody } from "./SubscriptionReponseBody";

export interface WebhookRequest {
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