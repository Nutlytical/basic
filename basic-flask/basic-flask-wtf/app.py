from flask import Flask, render_template, session, flash
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, BooleanField, RadioField, SelectField, TextAreaField
from wtforms.validators import DataRequired

app = Flask(__name__)
app.config['SECRET_KEY'] = 'myKey'

class MyForm(FlaskForm):
    name = StringField('Input Your Name', validators=[DataRequired()])
    gender = RadioField('Gender', choices = [('M','male'), ('F', 'female'), ('O', 'other')])
    skill = SelectField('Skills', choices = [('english'), ('Chinese'), ('Japanese')])
    address = TextAreaField('Address')
    isAccept = BooleanField('Agree Our Terms Policy')
    submit = SubmitField('Submit')


@app.route('/', methods=['GET', 'POST'])
def index():
    form = MyForm()

    if form.validate_on_submit():
        flash('Success')
       
        session['name'] = form.name.data
        session['gender'] = form.gender.data
        session['skill'] = form.skill.data
        session['address'] = form.address.data
        session['isAccept'] = form.isAccept.data

        form.name.data = ''
        form.gender.data = ''
        form.skill.data = ''
        form.isAccept.data = ''
        
    return render_template('index.html', form=form)

if __name__ == '__main__':
    app.run(debug=True)