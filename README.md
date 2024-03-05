# Group-1

# ✈️Voyage

An interactive travel journal that provides a way for you to document your experiences and build a timeless collection of your travels. Voyage makes sure your memories are always accessible, regardless of whether you decide to share or keep your experiences to yourself or share them with others.


## ⚙️Installation

It's easy to setup; just follow these straightforward steps:

1. Configure the environment variables. The necessary environment variables may be found directly beneath this section in the 'Environment Variables' section.
   Additionally, a `.envexample` file contains all the environment variables required.

2. Run the subsequent instructions in the given order:
```bash
  cd client
  npm install
  cd server
  npm install
  npm run start
```
That's all there is to it; both the server and the client should successfully startup.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file

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

