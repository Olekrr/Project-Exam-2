# Holidaze - Venue Booking Platform
[![Run Tests](https://github.com/Olekrr/Project-Exam-2/actions/workflows/test.yml/badge.svg)](https://github.com/Olekrr/Project-Exam-2/actions/workflows/test.yml)

Holidaze is a venue booking platform created for a school project that allows users to search, view, list, manage, and book various venues for different occasions.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Register, login, and logout functionality with secure token management.
- **Venue Search**: Simple and advanced search options to find venues based on various criteria.
- **Venue Management**: Users can manage their own venues, including creating, updating, and deleting venues.
- **Booking Management**: Users can view their upcoming bookings and manage them as needed.
- **Profile Management**: Users can view and update their profiles.
- **Responsive Design**: The application is designed to be responsive and works well on both desktop and mobile devices.

## Installation

To get started with the project, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Olekrr/Project-Exam-2.git
2. **Install Dependencies**:
   ```bash
   npm install
3. **Set up environment variables:**:
   ```bash
   Create a .env file in the root directory and add the following variable:
   REACT_APP_API_URL=https://v2.api.noroff.dev
4. **Clone the repository**:
   ```bash
   Start the development server
   npm run start
   The application should now be running on http://localhost:3000.
5. **Build the project**:
   ```bash
   npm run build
6. **Running tests**:
   ```bash
   npm run test

## Dependencies

### Runtime Dependencies
* @fullcalendar/daygrid: ^6.1.11
* @fullcalendar/interaction: ^6.1.11
* @fullcalendar/react: ^6.1.11
* @testing-library/jest-dom: ^5.17.0
* @testing-library/react: ^13.4.0
* @testing-library/user-event: ^13.5.0
* bootstrap: ^5.3.3
* date-fns: ^3.6.0
* js-cookie: ^3.0.5
* react: ^18.3.1
* react-bootstrap: ^2.10.2
* react-datepicker: ^6.9.0
* react-dom: ^18.3.1
* react-icons": "^5.2.1,
* react-router-dom: ^6.23.1
* react-scripts: 5.0.1
* web-vitals: ^2.1.4

### Development Dependencies
* @babel/plugin-proposal-private-property-in-object: ^7.21.11
* eslint: ^8.57.0
* eslint-config-prettier: ^9.1.0
* eslint-plugin-jsx-a11y: ^6.8.0
* eslint-plugin-prettier: ^5.1.3
* eslint-plugin-react: ^7.34.1
* eslint-plugin-react-hooks: ^4.6.2
* husky: ^8.0.0
* lint-staged: ^15.2.2
* prettier: ^3.2.5
* sass: ^1.77.2


## Architecture
Built with React, featuring:

* custom hooks for state management and API interactions
* components organized for hooks, utilities and styling
* secure secret management using custom authentication context

## Help
For any issues or help, please raise an issue in the repository.

## Contributing
This is a finished school project and is not open for contributions

## Contact

Ole Kristian Rasmussen - oleras94216@stud.noroff.no

This project is licensed under the ISC license - see LICENSE.md for details

## Acknowledgements

Noroff