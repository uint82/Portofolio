# 🚀 Personal Portfolio

A clean, responsive Django-powered portfolio website featuring 3D objects, a blog system, and a contact page.

![image](https://github.com/user-attachments/assets/ae4060e0-bc41-42fc-8b9b-314e17c9fc6e)

## ✨ Features

- **Responsive Design** - Looks great on devices of all sizes
- **3D Objects** - Interactive 3D elements powered by Three.js and Orbit controls
- **Blog System** - Share your thoughts and projects
- **Contact Form** - Let visitors get in touch
- **Clean & Minimalist UI** - Focus on what matters most: your work

## 🛠️ Technologies

- **Backend:** Django
- **Frontend:** HTML, CSS, JavaScript
- **CSS Framework:** Bootstrap
- **3D Rendering:** Three.js with Orbit controls
- **Database:** SQLite (development) / PostgreSQL (production)

## 📁 Project Structure

```
portfolio/
├── backend/             # Django backend app
├── portfolio/           # Main Django project folder
├── static/portfolio/    # Static assets (CSS, JS, images)
├── templates/portfolio/ # HTML templates
├── manage.py            # Django management script
├── requirements.txt     # Project dependencies
└── README.md            # This file
```

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- pip
- virtualenv (recommended)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/uint82/portfolio.git
   cd portfolio
   ```

2. Create and activate a virtual environment
   ```bash
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. Install dependencies
   ```bash
   pip install -r requirements.txt
   ```

4. Set up the database
   ```bash
   python manage.py migrate
   ```

5. Create a superuser (admin)
   ```bash
   python manage.py createsuperuser
   ```

6. Run the development server
   ```bash
   python manage.py runserver
   ```

7. Open your browser and go to `http://127.0.0.1:8000/`

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the project root with the following variables:

```
DEBUG=True
SECRET_KEY=your_secret_key
DATABASE_URL=sqlite:///db.sqlite3
```

For production, you should change these values appropriately.

## 💻 Usage

- **Admin Panel:** Access the admin panel at `/admin` with your superuser credentials
- **Blog Management:** Create and manage blog posts through the admin interface
- **3D Object Settings:** Configure 3D object parameters in the admin panel

## 🤝 Contributing

Got ideas? Slide in:

1. Fork the repo.
2. Create a branch (`git checkout -b feature/your-dope-idea`).
3. Make your changes.
4. Commit (`git commit -m 'Added some next-level stuff'`).
5. Push it (`git push origin feature/your-dope-idea`).
6. Open a Pull Request and let's talk.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

If you have any questions, feel free to reach out!

- GitHub: [@uint82](https://github.com/uint82)
- LinkedIn: [Hilmi Abroor]([https://linkedin.com/in/yourname](https://www.linkedin.com/in/hilmi-abror-022123204/))
- Website: [abroor](https://abroor.pythonanywhere.com)
