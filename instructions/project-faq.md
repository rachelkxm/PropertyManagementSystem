# Frequently Asked Questions regarding the final project

## There are SO MANY criteria?  How can I possibly get this done in time?

* It's not as bad as it looks - many of the criteria are things you'd do anyway.
* Definitely start small, get that much working, then expand, getting each addition working and clean before moving to the next.
* I recommend _against_ writing the entire thing and then trying to make it work
* I recommend _against_ putting off cleaning the code up until the end - get a piece working, then make sure that piece is good enough to submit before turning it in.  You would loose more points by having a fully working app that didn't match other criteria than if you had a partially complete app that does match the criteria.  Likewise, a buggy application that has good code quality is better than a fully working app that doesn't demonstrate that you've learned anything in class.

## I don't fully understand 'status state' or 'status state transitions' - what are they?

The items in your project must have a "status" (you can call it whatever you like in your project).  This status reflects whatever items your project is tracking.

For example, a library would track books, and the status would say if it was in the library or out, such as the statuses of 'On Shelf', 'On Loan', and 'Returned'.

Another example: a maternity ward might track pregnant women with statuses like 'Expecting', 'In Delivery', 'In Recovery', and 'At Home'.

There can be many statuses (minimum 3).  Your status doesn't have to cover every real-world possibility, but should match the most common situations.  

'Status state' refers to which status the item is currently in.

A status can (but does not have to) have a related piece of data.  For example, a library book 'On Loan' might say who it is on loan to.

'Status state transition' is talking about going from one state to another.  For example, changing an expectant mother from 'Expecting' to 'In Delivery'.
You must have at least one transition that isn't allowed because it doesn't make sense.  For example, an expectant mother doesn't go from 'In Delivery' to 'In Home' - she must be 'In Recovery' first.  Likewise (in our simple world) a library book does not go from 'On Loan' to 'On Shelf' directly, it must be 'Returned' first.

For the project, you cannot allow the user to type these statuses in an edit mode, or even have a drop-down to pick one.
* You must have some sort of "action" you can take that will set the status.  For example, a book that has that status 'On Shelf' might have a button labeled 'Check Out' or 'Loan'.  Clicking this button would result in the status changing to 'On Loan'  (There may or may not be steps in between).
* The actions do not have to match the name of the status ('Check Out' is not 'On Loan'), but I need to understand the connection.  
* The actions that are not allowed should not even appear.  (A book 'On Shelf' would have no 'Return Book' action shown, while one 'On Loan' would)
* The status should be displayed in the listing.
* The actions can be anywhere that is appropriate.

## Do I need an 'edit' screen in addition to the listing?

It is not required, but it is permitted, and may or may/not make sense based on your UI choices.

A project might have a listing, and clicking on a gear icon allows you to edit fields in place in that line of the listing is fine (don't forget to be able to cancel!).  Or, the listing might include a link that changes the screen into an edit screen for that one item.  

The choice is yours, so long as it is discoverable, understandable, and meets the criteria.

## Can I...?

If it is about adding features to the application: so long as it doesn't violate the criteria, you may add features (which may earn extra credit).  However, I must be able to understand and discover those features.  You should first build the base application to meet all the criteria before adding features.

If it is not about adding features, you should ask me directly (and it never hurts to ask even if it is about adding features)
