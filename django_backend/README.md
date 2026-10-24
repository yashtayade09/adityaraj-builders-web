# Adityaraj Builders – Django Backend

Ye backend poori website + owner login + dashboard + API serve karta hai.

**Step-by-step beginner guide:** ../HOW_TO_RUN.md

Quick start:

```
cd django_backend
python -m venv venv && venv\Scripts\activate      # Mac: source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py create_owner
python manage.py runserver
```

- Website: http://127.0.0.1:8000/
- Owner login: http://127.0.0.1:8000/owner/login/  (`adityaraj_owner` / `Adityaraj@2026` – badal dena!)
- Password change: `python manage.py set_owner_password NAYA_PASSWORD`
