Here’s the updated `README.md` reflecting that **Mystry_MSG** is a **Next.js** project:

---

# Mystry_MSG

[![Vercel Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-00C7B7)](https://mystry-msg-j665.vercel.app/)

**Mystry_MSG** is an anonymous messaging and feedback website built using **Next.js**. It allows users to send anonymous messages and feedback without revealing their identity, while providing a dashboard for users to manage messages effectively.

## Features

- **Anonymous Messaging**: Users can send feedback or messages anonymously.
- **User Authentication**: Secure login and registration using **NextAuth**.
- **Message Management**: Users can view, accept, or delete messages from the dashboard.
- **Schema Validation**: Ensures valid data input using **Zod**.
- **Responsive Design**: Built with **ShadcnUi** components and **Tailwind CSS** for a clean and mobile-friendly interface.
- **API Integration**: Uses RESTful APIs for message management.

## Technologies Used

- **Next.js**: A React framework with server-side rendering and static site generation.
- **MongoDB**: A NoSQL database to store user details and messages.
- **NextAuth**: Authentication library for handling user login and registration.
- **Axios**: For making API requests to the backend.
- **ShadcnUi**: A modern UI components library.
- **Zod**: JavaScript schema validation to ensure data correctness.
- **Tailwind CSS**: A utility-first CSS framework for building responsive designs.
- **Vercel**: Platform for seamless deployment and hosting.

## Project Setup

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v14+)
- **MongoDB** (local instance or MongoDB Atlas)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Akashpatel9/Mystry_MSG.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Mystry_MSG
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

### Environment Variables

Create a `.env.local` file in the root of the project and configure the following environment variables:

```bash
NEXT_PUBLIC_MONGODB_URI=<Your MongoDB URI>
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<Your NextAuth secret>
```

### Running Locally

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to view the application.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

You can then start the production server using:

```bash
npm start
```

## Deployment

The project is deployed on **Vercel**. To deploy your own version:

1. Push your code to a GitHub repository.
2. Connect the repository to **Vercel**.
3. Set the required environment variables in Vercel’s dashboard.
4. Deploy the app!

## Folder Structure

```bash
├── components          # Reusable React components
├── pages               # Next.js pages
│   ├── api             # API routes for message handling
│   └── auth            # Authentication pages (NextAuth)
├── public              # Static assets
├── styles              # Global styles
├── utils               # Utility functions and validation schemas
└── ...
```

## Screenshots

### Dashboard

![image](https://github.com/user-attachments/assets/4626630d-465f-415b-8c4c-8224381ae570)
![image](https://github.com/user-attachments/assets/7f739e7f-93c9-4972-a01c-3652b9b47723)
![image](https://github.com/user-attachments/assets/73d00134-c0d1-4f7a-a47a-07d44d6476f3)

## License

This project is licensed under the **MIT License**. Check the [LICENSE](LICENSE) file for more details.
