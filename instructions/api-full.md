# The provided Service API -- full details

This document covers the inputs/outputs and status of the service endpoints.

See the service-basic-api document for more explanation.

* All entries are within the scope of one app unless marked otherwise (e.g. "Create a User" means "Create a User for an App" )
* Some entries require a valid session x-user-token for a user of that app
* Some entries require a valid session x-user-token from an admin user of that app
* All entries attempt to return JSON, even in the case of errors

All services are currently at http://sea-info6250-crud.herokuapp.com/

It is highly recommended work with your browser console open and have "Log XMLHttpRequests" turned on.
You can send sample fetch() calls from the console to validate your expectations.

## Example simple service call
```javascript
// this is the 'GET /' example
fetch('http://sea-info6250-crud.herokuapp.com/test', {
  headers: new Headers({ 'Content-Type': 'application/json' })
})
.then( (response) => { 
  if( response.ok ) {
    return response.json();
  }
  // Handle other errors
})
.then( (json) => {
  // this endpoint is just for testing, 
  // so I'll look at the results in the console.
  console.log(json);
})
.catch( (error) => {
  // You should try to say something on the UI in addition to this
  console.warn('Help! I need an adult!', error);
});
```

## Example call to log in (requires that a user was created!)
```javascript
// this is the 'POST /users/:appkey/:username/session' example
// this is after I created an account 'thehat'
// and I'm using the appkey I was assigned

fetch('http://sea-info6250-crud.herokuapp.com/users/myapp/thehat/session', {
  method: 'POST',
  headers: new Headers({ 'Content-Type': 'application/json' }),
  body: JSON.stringify( { password: 'itisasecret' })
})
.then( (response) => { 
  if( response.ok ) {
    return response.json();
  }
  // Handle other errors
})
.then( (json) => { 
  if( json.error ) {
    // If the server has an error, it does not go to the catch
    // and that error might be something like "wrong password"
    // so I need to do something about that here
  }

  // I can get the exact format of the output 
  // by first calling the service from the console
  // That lets me know what to expect

  // Token is what I need for later calls (x-user-token)
  // I can call setState if it is scope to save the value
  // or a handler in scope that has setState as a closure

  token = json.token; 

})
.catch( (error) => {
  // Etc
});
```

## Example more involved service call (uses a token from logging in)
```javascript
// this is the 'PUT /topics/:appkey/:topic ' example
fetch('http://sea-info6250-crud.herokuapp.com/', {
  method: 'PUT',
  headers: new Headers({ 
    'Content-Type': 'application/json',
    'x-user-token': loginToken  // Or whereever I stored it
  }),
  body: JSON.stringify({ toStore: your_topic_data_here })
})
.then( (response) => { 
  // Etc, etc, as above
})
.then( (json) => { 
  // Don't forget to check for json.error!
  // ...skipped for space..
})
.catch( (error) => {
  // You should try to say something on the UI in addition to this
  console.warn('Help! I need an adult!', error);
});
```
## (Work In Progress) - Documenting the API

To get the full API: (no auth required)

```GET /```

To test to see if your x-user-token header is seen and general connectivity

```(any) /test```  You can GET, POST, whatever

To confirm a user is logged in (or confirm username is/is not available) (no auth required)

```GET /users/{appkey}/{username}``` 

To logout (must be logged in as admin or named user)

```DELETE /users/{appkey}/{username}/session```

To get personal data for a user: (must be logged in as an admin or named user)

```GET /users/{appkey}/{username}/profile```

To save data for a user: (must be logged in as an admin or named user)

```PUT /users/{appkey}/{username}/profile``` The value of the 'toStore' key of your body object will replace any previous value(s)

profile values are JS objects, so they can be as complex or as simple as you want

Note - entire value will be overwritten!

To change if user is admin: ( must be admin, can't remove your own admin flag)

```PUT /users/{appkey}/{username}/admin```  

```DELETE /users/{appkey}/{username}/admin```

Data for the app: (requires you be logged in)

```GET /topics/{appkey}```   (gives topics)

```GET /topics/{appkey}/{topic}```   (returns topic data)

```POST /topics/{appkey}/{topic}```  (only if topic is new) The value of the 'toStore' key of your body object will replace any previous value(s)

```PUT /topics/{appkey}/{topic}```   (only for existing topic)  The value of the 'toStore' key of your body object will replace any previous value(s)

```DELETE /topics/{appkey}/{topic}``` Depending on your use of topics, you may not use this at all (you can set a topic to empty data instead of deleting it if you will reuse it.  That reduces any PUT vs POST effort.)

Topic values are JSON, so they can be as complex or as simple as you want.
A topic is completely overwritten on a POST/PUT.
