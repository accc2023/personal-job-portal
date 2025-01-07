<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![project_license][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/accc2023/personal-job-portal">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">My Job Vault</h3>

  <p align="left">
    I have created a personalised job portal for students and professionals to use to enhance their career search. The project consists of a backend built using (Java) Spring Boot utilizing a REST API (to save data into a database). The backend queries job-platform Adzuna for JSON data based on certain parameters (passes through the frontend) using the Adzuna API.
    <br /><br />
    The frontend was built by adapting a frontend template using Node.js and React. The frontend is responsible for collecting and passing user input as well as displaying the result of the API querying from the backend in an appealing manner.
    <br /><br />
    Overall, using this application allows an indiviudal to search for jobs based on job description, country, location (within country), salary, and company. Furthermore, individuals can bookmark jobs from this search to save into their "Job Vault" that is displayed on the home page. Users can also delete jobs they are not interested anymore from their Job Vault.
    <br /><br />
    <a href="https://github.com/accc2023/personal-job-portal"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/accc2023/personal-job-portal">View Demo</a>
    ·
    <a href="https://github.com/accc2023/personal-job-portal/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/accc2023/personal-job-portal/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![Product Name Screen Shot][product-screenshot]
<!-- (example.com) -->

<!-- Here's a blank template to get started. To avoid retyping too much info, do a search and replace with your text editor for the following: `github_username`, `repo_name`, `twitter_handle`, `linkedin_username`, `email_client`, `email`, `project_title`, `project_description`, `project_license` -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

<!-- * [![Next][Next.js]][Next-url] -->

* ![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white)
* ![REST API](https://img.shields.io/badge/REST-02569B?style=for-the-badge&logo=rest&logoColor=white)
* ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
* [![React][React.js]][React-url]
* ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
<!-- * [![JQuery][JQuery.com]][JQuery-url] -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

<!-- This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps. -->

### Prerequisites

<!-- This is an example of how to list things you need to use the software and how to install them. -->
Ensure that following technologies are installed:

- Install [Java 17+](https://www.oracle.com/java/technologies/javase-downloads.html) (required for Spring Boot backend).
- Install [Node.js and npm](https://nodejs.org/) (required for the React frontend).
- Install [PostgreSQL](https://www.postgresql.org/download/) and [pgAdmin](https://www.pgadmin.org/download/) (required for the database).

<!-- * npm
  ```sh
  npm install npm@latest -g
  ``` -->


### Installation

1. Install PostgreSQL and create a new database (e.g., `jobportal`).
2. Open `pgAdmin` and set up a new user with a username and password.
3. Create a table in the database using the schema below:

```sql
CREATE TABLE job_post (
    post_id BIGINT PRIMARY KEY,
    post_desc CHARACTER VARYING(1000),
    post_profile CHARACTER VARYING(255),
    post_tech_stack CHARACTER VARYING(255)[],
    req_experience INTEGER,
    company CHARACTER VARYING(255),
    location CHARACTER VARYING(255),
    post_date CHARACTER VARYING(255),
    redirect_url CHARACTER VARYING(255),
    salary_max DOUBLE PRECISION,
    salary_min CHARACTER VARYING(255),
    salary DOUBLE PRECISION
);
```

4. Clone the repo
   ```sh
   git clone https://github.com/accc2023/personal-job-portal.git
   ```

5. Navigate to src/main/resources/application.properties<br />
  Add your PostgreSQL username, password, and database name:
    ```properties
    spring.datasource.url=jdbc:postgresql://localhost:5432/your_database_name
    spring.datasource.username=your_username
    spring.datasource.password=your_password
    ```

6. Get a free API Key and Application ID at [https://developer.adzuna.com](https://developer.adzuna.com)
7. Generate an API key and Application ID. Navigate to the JobRestController class in the backend (src/main/java/com/example/jobportal/JobRestController.java).
8. Replace the placeholders for APP_ID and API_KEY with your actual API credentials:
   ```java
    private static final String APP_ID = "your_app_id";
    private static final String API_KEY = "your_api_key";
   ```

9. Configure Lombok annotations (click "yes" on the pop ups) and then click "Run" button on the IDE.<br /> If this does not appear by default, navigate to (job-portal-backend/src/java/com.arhan.springbootrest/SpringBootRestApplication).<br /> Then the "Run" button should now appear on your IDE.

10. Navigate (on IDE terminal) to job-portal-frontend and then install NPM packages:
   ```sh
   npm install
   ```

11. After successfully installing, start NPM.
   ```sh
   npm start
   ```

12. NPM start should navigate you to localhost::3000 and the job portal is now live. Enjoy the application!

13. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin accc2023/personal-job-portal
   git remote -v # confirm the changes
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

<!-- Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources. -->

![Product Screen Shot 1][product-screenshot-1]

Here is a screenshot of myself on the page after clicking the "Hunt Jobs" button on the navbar. Here you can type in input parameters so that the backend can send an API request to the Adzuna servers to search for jobs based on the preferences.
<br /><br />
The only required parameters are "Search" and "Country". The rest are optional and the backend is able to handle omission of input in the optional fields.
<br /><br />

![Product Screen Shot 2][product-screenshot-2]

This is a screenshot taken right after inputting a search query. As shown, the page is updated dynamically to display the results from the API request. On this page, I can browse through the jobs and click the "+" to add to my favourites (which are the jobs on the home page). After "+" is clicked, a message of "Added" is displayed and the job has been added to the Postgres database and will now be visible on your home page.
<br /><br />

![Product Screen Shot 3][product-screenshot-3]

This is the page right after clicking the "Search" button on the top right of the page for my input search term. The jobs displayed here are selected from my favourites (on home page) based on your search query matches. It is now much more easier to search for jobs you have saved rather than going through a large list of jobs on the home page if you would only like to see a few at a time.
<br /><br />

The job posts themselves are clickable which take you to the redirect URL for the job postings (either the job is listed on Adzuna directly or a third-party website).

<!-- _For more examples, please refer to the [Documentation](https://example.com)_ -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Add ability to save jobs to favorites (Home)
- [x] Search a wide variety of countries
- [ ] Additional safety features
    - [ ] Handling of API credentials
    - [ ] Basic authentication

<!-- See the [open issues](https://github.com/accc2023/personal-job-portal/issues) for a full list of proposed features (and known issues). -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Top contributors:

<a href="https://github.com/accc2023/personal-job-portal/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=accc2023/personal-job-portal" alt="contrib.rocks image" />
</a>



<!-- LICENSE -->
## License

Distributed under the MIT license.
<!-- Distributed under the MIT license. See `LICENSE.txt` for more information. -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Arhan Chhabra - arhanc21@gmail.com

Project Link: [https://github.com/accc2023/personal-job-portal](https://github.com/accc2023/personal-job-portal)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
<!-- ## Acknowledgments

* []()
* []()
* []()

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/accc2023/personal-job-portal.svg?style=for-the-badge
[contributors-url]: https://github.com/accc2023/personal-job-portal/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/accc2023/personal-job-portal.svg?style=for-the-badge
[forks-url]: https://github.com/accc2023/personal-job-portal/network/members
[stars-shield]: https://img.shields.io/github/stars/accc2023/personal-job-portal.svg?style=for-the-badge
[stars-url]: https://github.com/accc2023/personal-job-portal/stargazers
[issues-shield]: https://img.shields.io/github/issues/accc2023/personal-job-portal.svg?style=for-the-badge
[issues-url]: https://github.com/accc2023/personal-job-portal/issues
[license-shield]: https://img.shields.io/github/license/accc2023/personal-job-portal.svg?style=for-the-badge
[license-url]: https://github.com/accc2023/personal-job-portal/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/arhan-chhabra
[product-screenshot]: images/ex.png
[product-screenshot-1]: images/ExSearchWithoutResult.png
[product-screenshot-2]: images/ExSearchWithResult.png
[product-screenshot-3]: images/ExSearchLocal.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
