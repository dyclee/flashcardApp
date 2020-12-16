import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from .models import db, User, Set, Subject, Card, Like, Favorite, friendships, recommendations, messages
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.set_routes import set_routes
from .api.card_routes import card_routes
from .api.subject_routes import subject_routes
from .api.favorite_routes import favorite_routes
from .api.like_routes import like_routes

from .seeds import seed_commands

from .config import Config

app = Flask(__name__)

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(set_routes, url_prefix='/api/sets')
app.register_blueprint(card_routes, url_prefix='/api/cards')
app.register_blueprint(subject_routes, url_prefix='/api/subjects')
app.register_blueprint(favorite_routes, url_prefix='/api/favorites')
app.register_blueprint(like_routes, url_prefix='/api/likes')
db.init_app(app)
Migrate(app, db)

# Application Security


CORS(app)


@app.before_request
def redirect_https():
    print("REQUEST", request.url)
    if os.environ.get("FLASK_ENV") == "production":
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get(
                            'FLASK_ENV') == 'production' else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') == 'production' else None,
                        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')
