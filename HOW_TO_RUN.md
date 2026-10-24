# Adityaraj Builders – Website chalane ka Easy Guide (VS Code + Django)

Ye guide bilkul beginner ke liye hai. Bas step-by-step follow karo. 🙂

---

## 0. Pehle ye cheezein computer me honi chahiye

| Cheez | Kaise check karein | Kaha se milega |
|---|---|---|
| **Python 3.10 ya usse naya** | Terminal me `python --version` likho | https://www.python.org/downloads/ (install karte time **"Add Python to PATH"** ✅ zaroor tick karo) |
| **VS Code** | – | https://code.visualstudio.com/ |
| VS Code ka **Python extension** | VS Code → Extensions (Ctrl+Shift+X) → "Python" (Microsoft) → Install | – |

> ⚠️ **Node.js ki zaroorat NAHI hai.** Website pehle se build karke `dist` folder me rakhi hui hai. Node sirf tab chahiye jab aap website ka design/code (React) badlo (Step 9 dekho).

---

## 1. Folder VS Code me kholo

1. Zip file ko **Extract** karo (Right click → Extract All).
2. VS Code kholo → **File → Open Folder…** → woh **main folder** chuno jisme `django_backend`, `src`, `dist`, `package.json` dikhte hain.
3. Agar VS Code poochhe "Do you trust the authors?" → **Yes, I trust**.

## 2. Terminal kholo aur `django_backend` me jao

VS Code me upar menu: **Terminal → New Terminal**. Neeche terminal khulega. Likho:

```
cd django_backend
```

(Ab terminal ke aage `django_backend` likha dikhna chahiye. **Saare Django commands isi folder me chalte hain, jaha `manage.py` file hai.**)

## 3. Virtual environment banao (sirf PEHLI baar)

Ye ek chhota alag dabba hai jisme project ke packages install hote hain.

**Windows:**
```
python -m venv venv
venv\Scripts\activate
```
**Mac / Linux:**
```
python3 -m venv venv
source venv/bin/activate
```
Sahi hone par terminal ke shuru me **`(venv)`** likha aayega.

> Windows PowerShell me "running scripts is disabled" error aaye to ye likho, fir `venv\Scripts\activate` dobara chalao:
> `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`
>
> Agar `python` command na chale to `py` try karo (jaise `py -m venv venv`).

## 4. Packages install karo (sirf PEHLI baar)

```
pip install -r requirements.txt
```
Thoda time lagega. Jab "Successfully installed …" dikhe to ho gaya.

## 5. ⭐ Commands ka SAHI ORDER (sirf PEHLI baar)

Ye 2 commands **isi order me** chalao:

**① Database ki tables banao**
```
python manage.py migrate
```
*(Isse `db.sqlite3` naam ki database file ban jaati hai. "OK" likha aana chahiye.)*

**② Owner ka login + website ka starting content (projects, services, photos, reviews) daalo**
```
python manage.py create_owner
```
*(Isse login ban jaata hai: username `adityaraj_owner`, password `Adityaraj@2026`. Website ka pura text/projects bhi database me aa jaate hain.)*

> ❗ `makemigrations` chalane ki **zaroorat nahi hai** – migration files pehle se ready hain. Ye command tab chalate hain jab aap `models.py` me kuch badlo.

## 6. Server start karo

```
python manage.py runserver
```
Terminal me likha aayega: `Starting development server at http://127.0.0.1:8000/`

## 7. Browser me kholo

| Kya | Address |
|---|---|
| 🌐 **Public Website** | http://127.0.0.1:8000/ |
| 🔐 **Owner Login** | http://127.0.0.1:8000/owner/login/ |
| 📊 **Owner Dashboard** | http://127.0.0.1:8000/owner/dashboard/ |
| 🛠️ Django Admin (advanced) | http://127.0.0.1:8000/admin/ |

**Login:** Username `adityaraj_owner`  •  Password `Adityaraj@2026`

Server band karne ke liye terminal me **Ctrl + C** dabao.

## 8. Password badalna (zaroor karo, khaaskar client ko dene se pehle!)

Server band karke (Ctrl+C) ye chalao (`NAYA_PASSWORD` ki jagah apna password likho):
```
python manage.py set_owner_password NAYA_PASSWORD
```

---

## ✅ Roz ka kaam (dobara chalana ho to)

Pehle step 5 dobara nahi karna. Bas ye 3 kaam:
1. VS Code me folder kholo → New Terminal
2. `cd django_backend` → `venv\Scripts\activate` (Mac: `source venv/bin/activate`)
3. `python manage.py runserver`

## 🔄 Database ko bilkul fresh karna ho

1. Server band karo (Ctrl+C)
2. `django_backend` folder me se **`db.sqlite3`** file delete kar do
3. Dobara: `python manage.py migrate` → `python manage.py create_owner`

---

## 9. (Optional) Website ka design/code badalna ho to

Sirf tab jab aap `src` folder ke React files me changes karo. Iske liye **Node.js** (https://nodejs.org – LTS) chahiye. **Main folder me** (django_backend me nahi) ye chalao:
```
npm install --legacy-peer-deps
npm run build
```
Build hone ke baad browser refresh (Ctrl+F5) karo – Django naya `dist` folder khud utha leta hai.

---

## 📦 Naya zip lene par PURANA DATA kaise bachayein

Naye folder me aapka purana data (enquiries, photos, changes) nahi hota. Purane folder se ye copy karke naye folder me wahi jagah paste karo:

| Aap kya chalate ho | Ye file/folder copy karo |
|---|---|
| Django (`python manage.py runserver`) | `django_backend/db.sqlite3` aur `django_backend/media/` folder |
| Node (`npm run dev`, address `127.0.0.1:3000`) | `data/` folder aur `public/uploads/` folder |

Copy karne ke baad `migrate` / `create_owner` dobara chalane ki **zaroorat nahi**; seedha server chalao.

## 🟢 Agar aap Node wala (`npm run dev`, port 3000) chalate ho

Ye bhi poora chalta hai (login, dashboard, upload sab), bas data alag jagah (`data/adityaraj_db.json`) rehta hai.
```
npm install --legacy-peer-deps
npm run dev
```
Phir http://127.0.0.1:3000/ kholo. Login wahi: `adityaraj_owner` / `Adityaraj@2026`.
**Ek hi waqt me ek hi tareeka use karo** (Django ya Node), warna data do jagah bat jayega. Client ko dene ke liye Django wala (port 8000) recommend hai.

---

## 🆘 Problems aur solutions

| Problem | Solution |
|---|---|
| `python` is not recognized | Python install karte time "Add to PATH" tick nahi hua. Dobara install karo, ya `py` use karo. |
| `No module named django` | `(venv)` active nahi hai. Step 3 ka activate command dobara chalao, fir `pip install -r requirements.txt`. |
| `That port is already in use` | Pehla server abhi chal raha hai. Uska terminal band karo, ya `python manage.py runserver 8001` chalao (fir address me 8001). |
| `no such table …` | `python manage.py migrate` chalana bhool gaye. |
| Website ki jagah "Website files not found" | `dist` folder delete ho gaya. Step 9 chalao (`npm run build`). |
| Login "Incorrect username or password" | `python manage.py create_owner` chalaya? Password badla hai to naya wala use karo. Bhool gaye to: `python manage.py set_owner_password NAYA_PASSWORD` |
| Dashboard khali / login par wapas bhej raha | Browser me http://**127.0.0.1**:8000 aur http://**localhost**:8000 ek hi mat mix karo; ek hi address se login + dashboard kholo. Cookies clear karke try karo. |
| Website me fonts alag dikhte hain | Google Fonts ke liye internet chahiye. |
| Photo upload nahi ho rahi | Pehle Ctrl+F5 dabao (purana page cache me hota hai). Photo PNG/JPG/WEBP honi chahiye (iPhone HEIC nahi) aur login hona chahiye. Upload ke baad **Save** dabana mat bhoolo. |

---

## 🌍 Live server par daalna (Render / VPS / Heroku) – short notes

1. `django_backend/.env.example` ko `.env` banao: `DEBUG="False"`, lamba random `SECRET_KEY`, `ALLOWED_HOSTS="aapka-domain.com"`, `CSRF_TRUSTED_ORIGINS="https://aapka-domain.com"`.
2. `pip install -r requirements-production.txt`
3. Database: live server par **PostgreSQL** use karo (`DATABASE_URL=...`). Free hosting par SQLite file har deploy par mit jaati hai!
4. `python manage.py migrate` → `python manage.py create_owner` → `python manage.py collectstatic --noinput`
5. Start: `gunicorn adityaraj_project.wsgi:application --bind 0.0.0.0:$PORT`
6. `dist` folder bhi server par upload hona chahiye (ya `FRONTEND_DIST` me uska path do).

---

### Folder me kya kahan hai (jaankari ke liye)

- `django_backend/` → **Backend** (login, dashboard, database, API) – Python/Django
- `src/` → Website ka design code (React)
- `dist/` → Website ka **tayyar (built) version** – Django yahi dikhata hai
- `server.ts` → Purana Node/Express backend (optional alternative, `npm run dev`); asli kaam Django se hota hai
