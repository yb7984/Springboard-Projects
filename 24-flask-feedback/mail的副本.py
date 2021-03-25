from flask_mail import Mail
from secret import *

def config_mail(app):
    """Config flask mail"""
    app.config.update(
        MAIL_SERVER='smtp.gmail.com',
        MAIL_PORT=465,
        MAIL_USE_SSL=True,
        MAIL_USERNAME = MAIL_USERNAME,
        MAIL_PASSWORD = MAIL_PASSWORD
    )

    mail = Mail(app)

    return mail