This is a small demo on how to integrate Keycloak with nextjs
## Getting Started

First, run Keycloak

```
yarn run keycloak
```

Open Keycloak [http://localhost:8081](http://localhost:8081) and login with admin/admin as
the credentials.

- Go to the administration console
- Create a realm named "demo" (Hover over the "Master" realm in the top left and add a new one)
- For the demo realm, create a client under Clients named "next-app" with the url http://localhost:3000
- In the demo realm also create a user manually under Users (By default automatic registration
  is disabled)

Then, run the development server:

```bash
yarn dev
```

You should be able to login with the newly created user and see your full name in the app