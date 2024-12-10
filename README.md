# Event Planner Application

## Overview

The **Event Planner Application** is a web-based platform designed to allow users to create, manage, and join events. It incorporates essential features such as authentication, authorisation, and event status management. Users can create their accounts, log in, and join events, while event creators can manage their events and view users who have joined. The application features a clean and modern design using **Tailwind CSS** for styling, **React** with **Inertia.js** for a dynamic, single-page application experience, and **Laravel** as the backend framework.

In this project, we've focused on user-friendliness, ensuring that both event creators and participants can seamlessly interact with the platform. The application also integrates code quality and testing tools like **Pest** for testing and **PHPStan** for static code analysis, ensuring that the application remains robust and maintainable.

## Features

### 1. **User Authentication and Authorisation**
   The system is built around a secure authentication and authorisation model. Here's how it works:
   - **Sign Up and Login**: New users can sign up for an account using a simple registration form. Once registered, users can log in using their credentials.
   - **Event Joining**: To join an event, users must first log in. Once authenticated, they can participate in any available event by clicking on the "Join" button for that event.

   The application uses Laravel’s built-in authentication system to handle login and registration. All user credentials are securely hashed, ensuring user data is protected.

### 2. **Event Creation and Management**
   Event creators, who are authenticated users, have the ability to create events. When creating an event, they can provide details such as:
   - Event Title
   - Event Description
   - Event Date and Time
   - Event Location
   - Event Status (Pending, Active, or Completed)

   The creator can also edit or delete their events as needed. Each event has three statuses:
   - **Pending**: Events that are waiting to be approved or finalised.
   - **Active**: Events that are currently live and participants can join.
   - **Completed**: Events that have already concluded.

   Only **Pending** and **Active** events will be displayed on the homepage. Completed events are hidden from the public view but remain accessible to their creators.

### 3. **Event Joining and User Dashboard**
   With or Without logging in, users can see a list of **Pending** and **Active** events on the homepage. To join an event, the user simply clicks the "Join" button, and they are added to the event's participant. Users can only join an event if they are logged in.

   Once a user joins an event, they can access a personalised dashboard that displays all the events they have joined. From this dashboard, users can:
   - View the events they are part of.
   - See event details, including the title, description, and status.
   - Leave an event if they choose to withdraw.

   Users can only interact with the events they have joined and cannot modify the event’s details or status. This ensures that only the event creator can manage the event's lifecycle.

### 4. **Event Creators’ Dashboard**
   Event creators have an exclusive dashboard where they can manage all aspects of their events. This includes:
   - Viewing all the events they have created.
   - Editing event details such as the title, description, and status.
   - Seeing a list of users who have joined their events.
   - Changing the event status from **Pending** to **Active** or **Completed**.

   Creators can only manage their events, and they are responsible for marking the event as **Completed** once it has concluded. The event’s status can be updated at any time, which will reflect on the homepage for all users to see.

### 5. **Event Status Management**
   Events in the platform are categorised into three statuses: **Pending**, **Active**, and **Completed**. The status is essential for organising the flow of events:
   - **Pending**: Initially, all events are set to **Pending**. These events are visible only to the event creators and admins.
   - **Active**: Once the event is approved and ready for participation, it is set to **Active**. This status allows users to join the event, and the event will be shown on the homepage.
   - **Completed**: After an event has finished, the event status is changed to **Completed**. These events are hidden from the homepage but remain accessible to the event creator and any users who joined the event.

### 6. **Technologies Used**

   The application is built with a modern tech stack that ensures both scalability and a great user experience:
   - **Laravel**: The backend is powered by Laravel, a PHP framework known for its simplicity and powerful features. Laravel is used for handling database migrations, routing, controllers, and authentication.
   - **React**: The frontend is built using React.js, which provides a dynamic, component-based structure for the user interface. This ensures that the application is highly interactive, with minimal page reloads, giving a smoother user experience.
   - **Inertia.js**: Inertia.js bridges the gap between React and Laravel, making it easy to create single-page applications (SPAs) without needing a dedicated API layer. Inertia allows Laravel to serve React components as pages while maintaining full backend control.
   - **Tailwind CSS**: For styling, Tailwind CSS is used. It is a utility-first CSS framework that enables rapid UI development with a clean and responsive design. Tailwind is highly customisable and fits well with the component-based structure of React.
   - **Pest**: Pest is a testing framework for PHP that works beautifully with Laravel. It simplifies the writing of tests and makes the process of running them more intuitive. Pest is used for testing the backend features of the application, ensuring that everything works correctly.
   - **PHPStan**: PHPStan is a static analysis tool that helps to detect errors in your code without actually running it. It ensures code quality by identifying potential issues, such as type errors, undefined variables, or method calls on non-object types.

### 7. **Code Quality and Testing**
   To maintain high code quality and reliability, the following tools are integrated into the project:
   - **PHPStan**: Static code analysis is performed with PHPStan to ensure that the code is free from errors and follows best practices. It checks for any type mismatches and potential bugs that might be missed during development.
   - **Pest**: Unit and feature tests are written using Pest. These tests verify the core functionalities of the application, such as user authentication, event creation, and joining, ensuring that the system works as expected.

   Code quality is an ongoing process, and by using PHPStan and Pest, the application is kept robust and maintainable.

## Installation

### Prerequisites
Before you start, ensure that you have the following installed:
- PHP 8.x or higher
- Composer
- Node.js and npm 
- MySQL or any other database that Laravel supports

## Installation

To install the Event Planner Application locally:

1. Clone the repository:
    ```bash
    git clone [https://github.com/MotibRah/EventManagerReact]
    ```

2. Navigate to the project directory:
    ```bash
    cd EventManagerReact
    ```

3. Install the dependencies:
    ```bash
    composer install
    ```

4. Set up the environment file:
    ```bash
    cp .env.example .env
    ```

5. Generate the application key:
    ```bash
    php artisan key:generate
    ```

6. Run the migrations:
    ```bash
    php artisan migrate
    ```
7. Run the migrations:
    ```bash
    php artisan db:seed
    ```

8. Start the development server:
    ```bash
    php artisan serve
    ```
8. Install npm dependencies:
    ```bash
    npm install
    ```

8. Start the client server:
    ```bash
    npm run dev
    ```

9. Run PhpStan:
    ```bash
    vendor/bin/phpstan analyse
    ```


10. Run PhpStan:
    ```bash
    vendor/bin/pest tests
    ```

Now, you can access the application at `http://localhost:8000`.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

