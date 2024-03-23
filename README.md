For Database,
1. Install PostgreSQL
2. Create a Database with name: **MentalHealthAnalysis**

For Backend, 
1. Open BE Folder.
2. Create a Virtual Environment using cmd: **Virtualenv env -p python3**
3. Activate the Virtual Environment using cmd: **.\env\Scripts\activate**
4. Change the Database config in setting.py, search "DATABASES" and change the database username and password and the database config.
5. Migrate the tables usign command:
a. **python manage.py makemigrations**
b. **python manage.py migrate**
