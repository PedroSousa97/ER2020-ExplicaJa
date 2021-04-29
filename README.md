# ER2020-ExplicaJa

<p align="center">
    <h3 align="center">Project Overview</h3>
</p>

![Image description](https://github.com/PedroSousa97/ER2020-ExplicaJa-MariaDB-NodeJS-AngularJS/blob/main/ReadFile_Img/screenshot.PNG)

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#Project-Scope">Project Scope</a>
    </li>
     <li>
      <a href="#Project-Overview">Project Overview</a>
    </li>
    <li>
      <a href="#Get-Started">Get Started</a>
      <ul>
        <li><a href="#Prerequisites">Prerequisites</a></li>
        <li><a href="#Installation">Installation</a></li>
        <li><a href="#Testing-the-Web-App">Testing the Web App</a></li>
      </ul>
    </li>
    <li><a href="#Contact">Contact</a></li>
  </ol>
</details>

## Project Scope

This project has as main goal to serve as a model for an Online Tutoring Management System, through a fictitious company named “ExplicaJa”. It was developed for the Requirement Engineering Discipline of University of Madeira, Computer Engineering Course

Contextualizing the company “ExplicaJa”, it is a company that aimed, in a pre-pandemic period, to provide tutoring services, in person, of students from elementary and high school. Given the current epidemiological circumstances, the company was forced to reinvent itself, that is, to redefine its area of operation in order to respect the rules of social distance and to ensure its economic subsistence. Therefore, the company chose to “modernize” and start providing its services in the most secure way possible, that is, online.

Initially, it would only be supposed to create an interactive prototype that implements the main functional requirements of the webapp to be developed. However, enthusiasm took over me, and I ended up creating a fully functional prototype, that is, a full-stack web-app that aims to implement in a simplified way the features to be integrated in the final project.

## Project Overview

In more detail, the company with this project intends to obtain an application for the management of its tutoring system. This application must allow innumerable management services.
Among the services, in general, it should:
* Manage explanations.
* Manage teachers (lists and assignment, depending on availability).
* Manage the schedules / achievements of the tutors.
* Manage payments (for example, monthly fees, annual fees).
* Manage and organize the different access plans (depending on the payment plan).
* Allow each student to evaluate the quality of their classes.
* Allow the instructor to have access to the above information.
* Allow each tutor to organize their schedule, access resources (for example extra exercises) and their individual progress as a tutor.
* Allow monitoring by parents / guardians (access the progress of their students, for example).
* Allow, through various feedbacks, to evaluate the explainers and the explanation service (at the end of each school year, for example).
* Allow the registration of clients / professionals.

## Get Started

Being a full-stack web application, this project involved various technologies, middleware and packages. This section gives a brief description of the technologies used in its development, list of prerequisites that you need to have installed in order to test this application with the exact same environment that was used in development and a brief instruction on how to run it.

<b>Note:</b> This project was completed in a period of around one week, having that in mind, some of the back-end security essentials were not implemented due to the time I had available to finish it. With that said, although password encryption is present, the web application is lacking the AuthGuard and JWT Interceptor, required to protect the different routes and API requests, having into account the user authentication and role. I did implement the JWT creation upon user login and return it from the Rest API, so the referred security guidelines are easily implemented using the existing code.

### Prerequisites

My webapp uses MariaDB as a database, AngularJS as UI / UX Framework and NodeJS + Express for the Back-end. We will start with the prerequisites:

<ul>
    <li>To be able to have exactly the same development environment, I recommend installing a href="https://www.heidisql.com/download.php"> HeidiSQL /a>, which will serve as SQL Server and software of visualization and management of your database. This software is intuitive and from a safe source, however it is optional as there are other good options for the same purpose;</li>
    <li>For the Text Editor, although also optional, I used the a href="https://code.visualstudio.com/"> VSCode /a> current most popular worldwide and with extensions that allows a workflow much more efficient for any programmer. This point would perhaps be excused as I calculate that you must have already installed it, however I recommend the following extensions:
        <ul>
            <li>Angular Essentials (Version 11)</li>
            <li>Angular Language Service</li>
            <li>Angular Snippets (Version 11)</li>
        </ul>
    </li>
    <li><a href="https://nodejs.org/en/"> NodeJS </a> installed in your environment is a mandatory requirement. It is with the same that the Angular CLI will be installed, as well as the creation of the initial project, and installation of facilities, such as the UI - Angular Material bookstore. In addition, NodeJS is used for the creation of our Back-end (Rest API), so it will also be necessary for that purpose and to install the necessary packages for its functioning, namely the Express - NodeJS framework. </li>
</ul>

### Installation

Now let's move on to the description of the installation. Do the following steps:

1. Clone this repository:
   ```sh
   git clone https://github.com/PedroSousa97/ER2020-ExplicaJa-MariaDB-NodeJS-AngularJS.git
   ```
2. cd to the project folder:
   ```sh
   npm install -g @angular/cli
   ```
3. And then install the packages and dependencies:
   ```sh
   npm install
   ```


### Testing the Web App

You are now able to test the Web App. The application is intuitive, and in cases where it may not be so clear, tooltips have also been used. The Web App has 3 generic users (Admin, HR, and CFO), the natural process of using our Web App is:
* Login with Admin (admin@mail.com - User.1234 (this password is the generic one for all users);
* Create courses with Admin so that Explainers can register with them;
* Login with HR (rh@mail.com - User.1234);
* Generate a new registration Token for the new hired accountant to be able to register on the web app, otherwise any non-hired or unqualified person could register;
* Register Explainer uses the generated Registration Token;
* Login with the Explainer and creation of course content, link, and availability;
* Registration of a new supervisor and later of his student;
* Login with the student, enrollment in the course, consumption of course content and creation of feedbacks;
* The Explainer can now view the feedbacks created, and with HR he can view his explainers, view feedbacks, view assessors' explanations or create new assessments, and in the worst case, eliminate explainers with poor performance (dismissal);
* By logging in with the parent / guardian, you can view your students' data and progress, view amounts owed, change the payment method and finally pay tuition fees. It is interesting to make a payment in case of tests to see the next step;
* After explanations have been paid by supervisors, the CFO can log into (cfo@mail.com - User.1234) and view all invoices created to date.

<b>Note:</b> Since password hashes were created on another machine, they may not work when they are validated on your computer. If that is the case, in principle, just create a new record, and bcrypt should automatically be able to decrypt the remaining passwords, as the hash and salt will be the same.

That said, to initialize the application you must:
* Turn on the SQL Server;
* At command line of your application, within the Explica-Online directory, start with the API:
   ```sh
   npm run start:server 
   ```
* You should be notified of the success of the initialization;
* The Rest API is now available at http://localhost:3000/, if you want to test it via Postman;
* Open a new terminal;
* CD to the Explica-Online directory, start Angular's Development Server now:
   ```sh
   ng serve 
   ```
* You can finally access the Web App at: http://localhost:4200/;

## Contact

If you encounter any difficulties, please contact via: henriquesantos293@gmail.com
