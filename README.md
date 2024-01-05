This is a minimal Next.js project based on the default [`create-next-app`].
It's intended to be used as a skeleton/starter/inspiration when working with subscriptions on Sitecore OrderCloud

## Getting Started

First, do a [`npm i`] do get the latest installed and check with [`npm run dev`] that you get the standard page for a start Next.js up running

Please also check this article that shows a simple way to get this started and working: [https://www.alpha-solutions.com/us/insight/sitecore-ordercloud-subscriptions-and-the-middleware], as well as this article: [https://ordercloud.io/knowledge-base/subscriptions]. 

The intention of this repo is to provide a base skeleton/code for various features that's needed when developing a subscription feature for Sitecore OrderCloud [https://ordercloud.io/].


## Subscription Integration 
OrderCloud subscription system will call out to your middleware/endpoint once you have that configured. 
According to the documentations its following there rules:

"An hourly function that queries for active subscriptions, from an active user, with a NotificationDate within the next five hours and an EndDate that is either null or in the future"

You need to setup this Subscription Integration. You do that on the ordercloud portal or using the API. 
As an example it could look like this:
```
{
	"ApiClientID": "---some-ApiClientId---",
	"HashKey": "---some-hash-key---",
	"ElevatedRoles": null,
	"Active": true,
	"NotificationDays": 1,
	"Url": "https://3940-108-5-123-41.ngrok-free.app/api/subscriptions",
	"xp": null
}
```
This example shows a call back to ngrok [https://wwww.ngrok.com] that makes it easy to expose an endpoint locally as an public endpoint. 
Very usefull for developing a features like this from you local dev machine. 

Sitecore OrderCloud will perform these calls following the above rules, and with an ngrok running locally the request will end up as a request to your local node server, e.g. at localhost:3000. 

Please also check the references in the top here for further details.



