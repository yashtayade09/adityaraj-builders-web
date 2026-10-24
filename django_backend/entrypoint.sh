#!/bin/sh

echo "Running database migrations..."
python manage.py migrate --noinput

echo "Starting server with Gunicorn..."
exec gunicorn adityaraj_project.wsgi:application --bind 0.0.0.0:8000
