/*

1. 

Write a function that takes username and password.
Make sure the function returns a promise.
Function returns a unique ID for the logged In user.
Function returns an error object with appropriate failed messages with status codes
{
    user not found: 404,
    Incorrect username/password: 400,
    Internal Server error: 500          // Any other error
} 
Add setTimeout and Make sure the function resolves or rejects the data after atleast 4 second.

The generated ID should be expired after 2 minutes.

2.

Write a function to get information about the user's profile.

Note: You can only call this function if you are logged In and your ID is not expired.

This function also returns a promise of the user data or appropriate error code.
{
    user not found: 404,
    UnAuthorized: 403, // Expired
    UnAuthenticated: 401 // Not signedIn
    Internal Server Error: 500 // any other error
} 

The function should take 3 seconds . Use setTimeout to cause delay.


3.

Write a function to get information about the user's todo's list

Note: You can only call this function if you are logged In and your ID is not expired.
The function should take 2 seconds . Use setTimeout to cause delay.

The function should return list of to-do's for the user who is calling the function.
or appropriate error message
{
    UnAuthorized: 403, // Expired
    UnAuthenticated: 401 // Not signedIn
    Internal Server Error: 500 // any other error
} 

*/
