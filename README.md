# Mental Health Analysis Project 

- [Problem Statement](#Problem-Statement)
- [Objective](#objective)
- [Installation and Setup Guide](#Project-Setup-Guide)
- BE: http://172.208.81.190/
- FE: http://20.51.220.248/

## Problem Statement
In recent years, global concerns about mental health (MH) have risen, impacting both well-being and productivity. Despite the prevalence of MH challenges, the tech workplace faces a notable stigma, hindering employees from addressing their mental health issues. This is especially critical in the high-stress tech industry. The objective is to investigate attitudes toward MH in tech workplaces and identify company features influencing employees' recognition and treatment-seeking for Mental Health Disorders (MHD). By exploring the experiences of tech industry professionals, the study aims to inform strategies for creating a supportive and conducive environment for mental well-being, contributing to targeted interventions and policies within tech companies.

## Objective
**Assessment and Analysis :** Users will engage in structured questions to evaluate their mental health status and concerns. Intelligent analysis of responses will determine the severity and nature of mental health issues.

**Treatment Recommendations :** The system generates personalized treatment recommendations, suggesting self-care strategies, coping mechanisms, therapy options, or referrals to mental health professionals based on user information.

**Supportive Conversational Interface :** Featuring a chatbot, the system provides a supportive and non-judgmental environment for users to express feelings, seek advice, or discuss mental health concerns through interactive conversations.

## Project Setup Guide
The project uses following tech stack:
1. ReactJS + Vite
2. Django
3. PostgresSQL

### Setting up PostgreSQL Database:

1. **Install PostgreSQL:**
   - Download and install PostgreSQL from the [official website](https://www.postgresql.org/download/).

2. **Create a Database:**
   - Once PostgreSQL is installed, open it and create a new database named "MentalHealthAnalysis".

### Backend Setup:

Ensure that your Python environment setup is complete: [python](https://www.python.org/downloads/)

To learn more about Django  follow [this](https://www.w3schools.com/django/django_getstarted.php). 

**Create Virtual Environment:**

   ```bash
   cd BE
   virtualenv env -p python3
   .\env\Scripts\activate
   ```

Install the necessary libraries using cmd:
   ```bash
   pip install -r requirements.txt
   ```
    
After installing the requirements, create a .env file in `./BE/mentalhealthbot` and add the following code snippet into .env file.

```bash
PGENGINE="django.db.backends.postgresql_psycopg2"
PGHOST="{server-host}"
PGUSER="{server-user}"
PGPORT="{server-port}"
PGDATABASE="{database-name}"
PGPASSWORD="{server-password}"
GOOGLE_API_KEY = "{google-api-key}"
```

 You can change the Database config in setting.py ( for local db setup ) 

**Migrate the tables using command :**

Run the following commands:

  a. To make the migrations 
  ```bash
  python manage.py makemigrations
   ```
  b. To migrate the table in the database
   ```bash
  python manage.py migrate
   ```
 c. Run the backend server
  ```bash
  python manage.py runserver 8000
   ```

### Frontend Setup:

**Installation and Setup**

a. Install React.js and npm if not already installed.

[React.js](https://reactjs.org/)
<br>[npm](https://www.npmjs.com/)

b. Install all the requirements using cmd
 ```bash
  npm i
 ```

**Running the Server**
 ```bash
  npm run dev
 ```






 



