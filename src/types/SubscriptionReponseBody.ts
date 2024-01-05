import { Payment } from "ordercloud-javascript-sdk";

export interface SubscriptionReponseBody {
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