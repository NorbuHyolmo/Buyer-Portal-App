# Buyer Portal App

## Overview
This is a small buyer portal demo app made with the combination of Django (backend) and React (frontend)

## Features 
- JWT Authentication using djangorestframework-simplejwt (tokens stored in localStorage)
- Email based login 
- Dashboard with collection of Property and allows adding to favourites

## Running the Project
1. Clone the repository
   git clone git@github.com:NorbuHyolmo/Buyer-Portal-App.git

Using Docker (Recommended)
docker compose build 
docker compose up 

## Running Without Docker:
### Backend
cd backend
python -m venv venv
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate     # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

cd frontend 
npm install 
npm start

- Backend: http://localhost:8000
- Frontend: http://localhost:3000 (redirects to login if no user is logged in )

----- recommended to accesss the frontend url as backend shows the api calls --------

### if database is empty, you can populate sample data
cd backend 
python populate_properties.py


## Used default database 
### To use PostgreSQL, update backend/main/settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': '<your_db_name>',
        'USER': '<your_db_user>',
        'PASSWORD': '<your_password>',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

then run migrations 
python manage.py migrate 
