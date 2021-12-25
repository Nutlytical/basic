from flask import Flask, render_template,request
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    products = ['a','b','o','u','t']
    return render_template('about.html', products = products)

@app.route('/admin')
def admin():
    name = 'who2'
    age = 18
    data = {'name': name, 'age': age}
    return render_template('admin.html', data = data)

@app.route('/sendData')
def signup():
    name = request.args.get('name')
    description = request.args.get('description')
    return render_template('thankyou.html', data = {'name': name, 'description': description})


if __name__ == '__main__':
    app.run(debug=True)