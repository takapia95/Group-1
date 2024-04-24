# Group-1

# ✈️Voyage

An interactive travel journal that provides a way for you to document your experiences and build a timeless collection of your travels. Voyage makes sure your memories are always accessible, regardless of whether you decide to share or keep your experiences to yourself or share them with others.


## ⚙️Installation

It's easy to setup; just follow these straightforward steps:

1. Configure the environment variables. The necessary environment variables may be found directly beneath this section in the 'Environment Variables' section.
   Additionally, a `.envexample` file contains all the environment variables required.

2. Run the subsequent instructions in the given order (**if running locally**):
```bash
  cd client
  npm install
  cd server
  npm install
  npm run start
```
---
**If running using our hosted backend server using render (or your own)**:
```bash
  cd client
  npm install
  npm run start
```

That's all there is to it; both the server and the client should successfully startup.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` files: 

### in `/client`:

#### If running locally:
`REACT_APP_SERVER_BASE_URL`=http://localhost:3001

#### For prod:

`REACT_APP_SERVER_BASE_URL`=https://group-1-za2p.onrender.com


### in `/server`:

`TRIPADVISOR_API_KEY`

`MONGODB_URI`

`MONGODB_DB`

`TOKEN_SECRET`


## 🎯Features

- **User Account Management**: Easy registration and login processes.

- **Security**: Secure password hashing.

- **Database Integration**: MongoDB integration for storing users and journal entries.

- **Journaling Capabilities**: Create, update, and delete journal entries. **Your journal form's status is also maintained upon refreshing**.

- **Search Functionality**: Easily locate the places you choose to write about in your journal.

- **State Management** : Global state management between components using **Zustand**.

- **Authentication**: Utilization of &&JWT tokens** and **authenticated backend routes** for security.

- **Community Journals**: View random journal entries for specific locations posted by others!

## Endpoints

### Login for existing users

```http
  GET /login
```

| Parameter  | Type     | Description            |
|:-----------| :------- |:-----------------------|
| `username` | `string` | **Required**. Username |
| `password` | `string` | **Required**. Password |

###### Example JSON body required
```json
{
  "username": "example",
  "password": "password"
}
```
--- 

### Register new user

```http
  POST /register
```

| Parameter  | Type     | Description            |
|:-----------| :------- |:-----------------------|
| `username` | `string` | **Required**. Username |
| `password` | `string` | **Required**. Password |

###### Example JSON body required
```json
{
  "username": "example",
  "password": "password"
}
```

---

### Search for a location using TripAdvisor API

```http
  GET /search
```

| Parameter  | Type     | Description            |
|:-----------| :------- |:-----------------------|
| `searchQuery` | `string` | **Required**. Search query |

###### Headers required
```
  Authorization: Bearer <token>
```

###### Example JSON body required
```
{
  "searchQuery": "Paris"
}
```

###### Response:
```json
{
  "data": [
    {
      "location_id": "23475286",
      "name": "Undefined",
      "address_obj": {
        "street1": "35 King William St.",
        "city": "Hamilton",
        "state": "Ontario",
        "country": "Canada",
        "postalcode": "L8R 1A1",
        "address_string": "35 King William St., Hamilton, Ontario L8R 1A1 Canada"
      }
    },
    {
      "location_id": "4092356",
      "name": "Lakeview Caravan Park  Lake Cargelligo",
      "address_obj": {
        "street1": "Naradhan Street",
        "city": "Lake Cargelligo",
        "state": "New South Wales",
        "country": "Australia",
        "postalcode": "2672",
        "address_string": "Naradhan Street, Lake Cargelligo, New South Wales 2672 Australia"
      }
    },
    {
      "location_id": "23095724",
      "name": "Casa Alebrije Holbox",
      "address_obj": {
        "street1": "Calle Tiburon Ballena",
        "street2": "Entre Calle Porfirio Díaz",
        "city": "Holbox",
        "state": "Quintana Roo",
        "country": "Mexico",
        "postalcode": "77310",
        "address_string": "Calle Tiburon Ballena Entre Calle Porfirio Díaz, Holbox, Holbox Island 77310 Mexico"
      }
    }
  ]
}
```

---

### Get user's journal entries

```http
  GET /journals
```

###### Headers required
```
  Authorization : Bearer <token>
```

###### Response:
```json
[]
```

---

### Add a new journal entry

```http
  POST /journals
```

| Parameter  | Type     | Description            |
|:-----------| :------- |:-----------------------|
| `locationId` | `string` | **Required**. Location ID |
| `date` | `Date` | Current date (automatically generated) |
| `location` | `string` | **Required**. Location name |
| `title` | `string` | **Required**. Journal title |
| `text` | `string` | **Required**. Journal content |
| `isPublic` | `boolean` | **Required**. Whether the journal is public or private |
|`coverPhoto` | `string` | **Required**. Cover photo URL |
|`createdAt` | `Date` | Current date (automatically generated) |

---

### Get a journal entry by ID

```http
  GET /journals/:id
```

| Parameter  | Type     | Description            |
|:-----------| :------- |:-----------------------|
| `id` | `string` | **Required**. Journal ID |
| `userId` | `string` | **Required**. User ID |

###### Headers required
```
  Authorization: Bearer <token>
```

---

### Update a journal entry

```http
  PUT /journals/:id
```

| Parameter  | Type     | Description            |
|:-----------| :------- |:-----------------------|
| `title` | `string` | **Required**. Journal title |
| `text` | `string` | **Required**. Journal content |
| `isPublic` | `boolean` | **Required**. Whether the journal is public or private |
|`coverPhoto` | `string` | **Required**. Cover photo URL |
|`lastUpdated` | `Date` | Current date (automatically generated) |

---

## Tech Stack

**Client:** React, Zustand, TailwindCSS

**Server:** Node, Express, MongoDB


## 🧑‍🏫Lessons Learned
- Global state management with Zustand
- More hands-on practice with React-router-dom
- MongoDB
- Implementing JWT for secure authentication
- Techniques for setting up authenticated routes
- Secure user authentication using hashed passwords
- Better understanding of local storage and session storage
- Dynamic component rendering based on application state


## 🌐Demo

Coming soon

## 👤 Group Members

- Maria Mills
- Shreya Kola
- Ai Tran

