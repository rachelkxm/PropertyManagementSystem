# The provided Service API

The full API is forthcoming, but here is a high level overview of what it can/can't do:

API is mostly RESTful and does not use url params (which are not forbidden by REST, they just aren't used here)

## Overview

### App
* Each project has an identifying token (safe to share) called 'appkey'
* This appkey separates your data from other projects
* This appkey is not security the way some API keys are - it is merely an identifier

### Users
* Each project has users, and the ability to create new users
* Each user has their own profile data that is stored on the server
* There is a service endpoint to log users in - this returns a user token cookie  

#### User-token cookie
* The user-token is a value the server recognizes.  As a cookie, it is sent on every request, and the service will validate the value against the list of currently valid sessions to confirm who the user is (authentication) and that they are allowed to take the action requested (authorization)
* This cookie value is NOT the user's password.  It is a semi-random value that the server records as being related to the user
* This may seem stateful...and it is.  The HTTP connection itself is stateless, but this puts the app in a stateful way
* This means the application (server-side) needs to be careful to not break any of the assumptions that anyone would put on the site.  Generally, that means no data is stored server-side with regard to the _session_ other than the cookie. 
* The stateful nature of this sort of connection is not ideal - in recent years new methods of authenticating users that are truly stateless have been developed (such as JSON Web Tokens (JWT).  However, cookie-based authentication tokens are still the most common, so we will use that

#### User server session
* Logging in creates a user-token and an associated session, and tells the browser to set the cookie
* All connections using that token are part of the same 'session'
* If the same username logs in while that username is already logged in (for example, logging in as the user from two different browsers), a second user-token will be issued, and both tokens will work and are tracked independently
* Because of how cookies work, generally you will find that two tabs/windows of the same browser will share the cookie, but seperate browsers (on the same computer or not) will not.
* Two tabs will be treated as the same user, and as long as the server stores no state for the session other than being logged in, the two tabs can both interact with the site without problem, until the token is no longer valid.

For our application, a user will be logged out after 10 minutes of inactivity, or when the logout service call is made.

### Inventory
* Each project has an 'inventory' that is available to and shared among all users
* The inventory can hold multiple 'topics'
* The 'inventory' and 'topic' concepts are specific to this service, not general industry concepts

#### Inventory Topics
* A topic is any subset of data that you want to work with
* Your app can store all the app data in one topic, a few, or many
* BUT - the data for a topic is all loaded at once and all replaced at once, so find a good match for your needs
* A topic holds JSON, so it can be deeply nested or just a single value

## High Level API 

I will provide a fully(ish) documented API, but here is a high-level view of what the API can/can't do

To get the full API: (no auth required)

`GET /`

To create a user  (no auth required)

`POST /user/{appkey}/{username}`      {username, password}

To login: (no auth required)

`POST /user/{appkey}/{username}/session`  {username, password}

To get list of users: (no auth required)

`GET /users/{appkey}`

To confirm a user is logged in (or confirm username is/is not available) (no auth required)

`GET /users/{appkey}/{username}` 

To logout (must be admin or named user)

`DELETE /users/{appkey}/{username}/session`

To save data for a user: (must be an admin or named user)

`PUT /user/{appkey}/{username}/profile` { profile: }

profile values are JSON, so they can be as complex or as simple as you want

*Note* - entire profile value will be overwritten!

To change if user is admin: ( must be admin, can't remove your own admin flag)

`PUT /user/{appkey}/{username}/admin`  

`DELETE /user/{appkey}/{username}/admin`

Data for the app: (requires auth)

`GET /inventory/{appkey}`   (gives topics)

`GET /inventory/{appkey}/{topic}`   (returns topic data)

`POST /inventory/{appkey}/{topic}`  (only if topic is new) 

`PUT /inventory/{appkey}/{topic}`   (only for existing topic)

`DELETE /inventory/{appkey}/{topic}`  

topic values are JSON, so they can be as complex or as simple as you want
A topic is completely overwritten on a POST/PUT.
