from flask import Flask, render_template, request

app = Flask(__name__)

# =========================
# HOME PAGE
# =========================
@app.route('/')
def home():
    return render_template('index.html')


# =========================
# ABOUT PAGE
# =========================
@app.route('/about')
def about():
    return render_template('about.html')


# =========================
# CONTACT PAGE (GET + POST)
# =========================
@app.route('/contact', methods=['GET', 'POST'])
def contact():

    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']

        print("Contact Form Data:")
        print(name, email, message)

        return "Message Sent Successfully"

    return render_template('contact.html')


# =========================
# LOGIN PAGE (GET + POST)
# =========================
@app.route('/login', methods=['GET', 'POST'])
def login():

    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        print("Login Data:")
        print(email, password)

        return "Login Success"

    return render_template('login.html')


# =========================
# SIGNUP PAGE (GET + POST)
# =========================
@app.route('/signup', methods=['GET', 'POST'])
def signup():

    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        phone = request.form['phone']
        whatsapp = request.form['whatsapp']
        city = request.form['city']
        password = request.form['password']

        print("Signup Data:")
        print(name, email, phone, whatsapp, city, password)

        return "Account Created Successfully"

    return render_template('signup.html')


# =========================
# MARKETPLACE PAGE
# =========================
@app.route('/marketplace')
def marketplace():
    return render_template('marketplace.html')


# =========================
# DASHBOARD PAGE
# =========================
@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')


# =========================
# RUN APP
# =========================
if __name__ == '__main__':
    app.run(debug=True)
    