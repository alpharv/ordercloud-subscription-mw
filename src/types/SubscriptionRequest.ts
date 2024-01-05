import { OrderWorksheet } from "ordercloud-javascript-sdk";

export interface SubscriptionRequest {
    Environment: string;
    OrderCloudAccessToken: string;
    OrderWorksheet: OrderWorksheet;
    UnavailableProductIDs: string[];
    ErrorCode: string;
}