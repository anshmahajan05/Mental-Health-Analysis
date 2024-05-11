#!/bin/bash

# Build the project
echo "Building the project..."
pip install -r requirements.txt
python manage.py collectstatic --no-input