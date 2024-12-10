# Socialgram

A modern social media app, created with **React** and **Appwrite** for a seemles backend experience.

## Motive

I built this project mainly to showcase proficiency in performing efficient, scalable HTTP calls, administering server application programming interfaces(APIs) and providing smooth staple between front-end to backend technologies.
Through Socialgram I hope to demostrate my skills in React, Typescript, Tailwind css, Appwrite and modern software development practices, and my love of solving real-world problems with code. Inspired by JSM.

## Tech Stack

![React.js](https://img.shields.io/badge/React.js-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Appwrite](https://img.shields.io/badge/Appwrite-F02E65?style=for-the-badge&logo=appwrite&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)
![shadcn](https://img.shields.io/badge/shadcn-F59E0B?style=for-the-badge&logo=radix-ui&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-00897B?style=for-the-badge&logo=dependabot&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

## Features

- User authentication with secure signup & login
- Real-time updates with tanstack query & mutations
- Responsive design for all devices

## Setup Steps

1. Clone repository & cd into socialgram
2. Install dependencies using `npm install`

### Setup Environment Variables (.env.loca)

```
VITE_APPWRITE_URL=
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_STORAGE_ID=
VITE_APPWRITE_USER_COLLECTION_ID=
VITE_APPWRITE_POST_COLLECTION_ID=
VITE_APPWRITE_SAVES_COLLECTION_ID=
```

3. Start the development server with `npm run dev`.

## Status

All current features funtional, user can create, update, edit and delete post. Comments section coming soon!.

### Todo

- [x] Create commets section in api
- [x] Create comments attribute in appwrite
- [x] Implement mutations in queries & mutations for creating comment, updating and deleting functionality
- [ ] Implement comment UI under PostCard
- [ ] Testing

![explore page](public/assets/images/explore.png)

![signup page](public/assets/images/signup.png)
