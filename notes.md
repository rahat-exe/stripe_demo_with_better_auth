/*
AUTH FLOW (Better Auth + Next.js)

1. User logs in from the client.
2. Backend verifies credentials.
3. Better Auth creates a session in the database.

   Example session:
   session_id -> userId -> expiration

4. Server sends a cookie to the browser:
   better-auth.session_token = session_id

5. Browser stores the cookie.

6. For every future request the browser automatically sends the cookie.

7. Backend reads the cookie, extracts the session_id,
   finds the session in the database, and loads the user.

IMPORTANT:
Cookie contains only the session id.
User data is stored in the database, not inside the cookie.
*/

/*
SERVER COMPONENT AUTH

Server components run on the server during the request lifecycle.

Because they run on the server, they already have access to:
- request headers
- cookies

So we can directly call:

    const session = await auth()

Better Auth will:
1. Read the cookie from the request
2. Extract the session token
3. Find the session in the database
4. Load the associated user
5. Return { session, user }

No additional HTTP request is needed here.
*/

/*
CLIENT COMPONENT AUTH

Client components run in the browser.

The browser cannot directly access server session logic,
so it must request the session from the server.

useSession() internally calls an endpoint like:

    /api/auth/session

Flow:
Client component
      ↓
useSession()
      ↓
request sent to server
      ↓
server reads cookie
      ↓
Better Auth reconstructs session
      ↓
session returned

This is why client components require an extra request.
*/

/*
API ROUTE AUTH

API routes already receive the HTTP request from the browser.

The request contains the cookie with the session token.

We call:

    auth.api.getSession({ headers: headers() })

headers() provides the request headers so Better Auth can:

1. Read the cookie
2. Extract session token
3. Find the session in the database
4. Load the user

No additional HTTP request happens here.
*/


/*
SERVER ACTION AUTH

Server actions run on the server but are triggered from the client.

Because they run on the server, they can access request headers.

We pass headers() to Better Auth so it can read cookies.

Flow:
Client triggers server action
      ↓
Server action executes
      ↓
headers() provides request cookies
      ↓
Better Auth reads session token
      ↓
Session + user returned

Server actions do not require an extra request either.
*/