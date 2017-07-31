# The provided Service API

The full API is forthcoming, but here is a high level overview of what it can/can't do:

API is mostly RESTful and does not use url params (which are not forbidden by REST, they just aren't used here)

## Overview

### App
Each project has an identifying token (safe to share) called 'appkey'
This appkey separates your data from other projects
This appkey is not security the way some API keys are - it is merely an identifier

### Users
Each project has users, and the ability to create new users
Each user has their own profile data that is stored on the server
There is a service endpoint to log users in - this returns a user token cookie  

#### ~User-token cookie~
The plan to use the common practice of a user token cookie was scrapped because of security issues without uncommon practice of allowing the webservice call from anywhere.  It is replaced by the User token header below.  (Note: We don't care about security for the project, but your browser isn't willing to trust me about that).

### User-token header
The user-token is a value the server recognizes.  You will obtain this from calling the login endpoint and have to add it to the headers of any request requiring authorization.

The service will validate the value against the list of currently valid sessions to confirm who the user is (authentication) and that they are allowed to take the action requested (authorization)

This token value is NOT the user's password.  It is a semi-random value made during login that the server temporarily records as being related to the user.

This may seem stateful...and it is.  The HTTP connection itself is stateless, but this puts the app somewhat stateful.  
This means the application (server-side) needs to be careful to not break any of the assumptions that anyone would put on the site.  Generally, that means no data is stored server-side with regard to the _session_ other than if the user is/is not currently logged in.

More information on authentication and authorization is available in the project security document.

### Inventory
Each project has an 'inventory' that is available to and shared among all users

The inventory can hold multiple 'topics'

The 'inventory' and 'topic' concepts are specific to this service, not general industry concepts

#### Inventory Topics
A topic is any subset of data that you want to work with
Your app can store all the app data in one topic, a few, or many
BUT - the data for a topic is all loaded at once and all replaced at once, so find a good match for your needs
A topic holds JSON, so it can be deeply nested or just a single value

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
Note - entire value will be overwritten!

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
