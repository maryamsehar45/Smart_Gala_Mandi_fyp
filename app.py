from flask import Flask, render_template

app = Flask(__name__)

# =========================
# HOME PAGE ROUTE
# =========================
@app.route('/')
def home():
    return render_template('index.html')


# =========================
# ABOUT PAGE ROUTE
# =========================
@app.route('/about')
def about():
    return render_template('about.html')


# =========================
# CONTACT PAGE ROUTE
# =========================
@app.route('/contact')
def contact():
    return render_template('contact.html')


# =========================
# LOGIN PAGE ROUTE
# =========================
@app.route('/login')
def login():
    return render_template('login.html')


# =========================
# MARKETPLACE PAGE ROUTE
# =========================
@app.route('/marketplace')
def marketplace():
    return render_template('marketplace.html')

# =========================
# DASHBOARD PAGE ROUTE
# =========================
@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

if __name__ == '__main__':
    app.run(debug=True)