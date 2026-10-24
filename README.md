# Adityaraj Builders & Developers – Website + Owner Dashboard

Full-stack project: React website (`src/`, built into `dist/`) served by a Django backend (`django_backend/`).

👉 **Run it step by step: read `HOW_TO_RUN.md`.**

Short version (inside `django_backend`):

```
python -m venv venv
venv\Scripts\activate        # Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py create_owner
python manage.py runserver
```
Then open http://127.0.0.1:8000/
