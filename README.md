<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project
I have designed API's to maintain address book.<br>
The endpoints are:<br>
&nbsp;&nbsp;◆ Add a new contact.<br>
&nbsp;&nbsp;◆ Add bulk contacts.<br>
&nbsp;&nbsp;◆ Fetch details of single contact.<br>
&nbsp;&nbsp;◆ Fetch phase matching results.<br>
&nbsp;&nbsp;◆ Fetch the list of contacts with pagination.<br>
&nbsp;&nbsp;◆ Update the given contact.<br>
&nbsp;&nbsp;◆ Delete the given contact.<br>


<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

To run the application, we need npm. So first install NPM.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Nameesha-bbh/Vouch-Digital.git
   ```
2. Open the folder and run terminal or git bash.

3. Install NPM packages
   ```sh
   npm install
   ```
4. Create .env file. 
5. Paste all contents of .env.example into the .env file.
6. In the .env file, add all data. You can specify the port number or by default 3000 is considered.
7. APP_KEY is used for jwt web tokens. So create and use a new app key or follow the below command.
    ```sh
    crypto.randomBytes(64).toString("hex");
    ```
8. Login to mongo Atlas account through this <a href="https://account.mongodb.com/account/login">link</a>. Create a new cluster and paste the mongo connection url in the .env file.
9. Run the code
  ```sh
  npm start
  ```
  
  
 <!-- POSTMAN -->
## Usage

Refer to the below postman documentation link to use the endpoints.
<a href="https://documenter.getpostman.com/view/19011093/VUjTihVu">Documentation link</a>
