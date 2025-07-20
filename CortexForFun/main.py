from flask import Flask, render_template, request, jsonify
import database as db

import sqlite3
app = Flask(__name__)

# Sample data
people = [
db.fetch_data_as_dicts('users.db', 'users')
]
    

@app.route('/')
def index():
    return render_template('index2.html', people=people)

@app.route('/update', methods=['POST'])
def update_employees():
    data = request.get_json()
    name = data['name']
    id = data['id']
    print(f"Name: {name}, Job: {job}, ID: {id}")
    # Место для изменения строки в бд через схожесть в id
    db.update_persion(2, "name", "bibier")
    
    
    return jsonify({"status": "success"})

@app.route('/create_person', methods=['POST'])
def create_person():
    data = request.get_json()
    id = data['id']
    print(id)
    # Место для добавления пустой строки в бд с id
    db.add_persion(2)

    return jsonify({"status": "success"})




@app.route('/delete_person', methods=['POST'])
def delete_person():
    data = request.get_json()
    id = data['id']
    print(id + " deleted")
    # Место для удаления строки в бд
    db.delete_persion(23)
    return jsonify({"status": "success"})



        

        
   


if __name__ == '__main__':
    app.run(debug=True)











#people = [
#    {"name": "Alice", "surname": "кто-то", "patronymic": "кто-тович", "job_status": #"Engineer", "work_starts": "21", "id": "0"},
#    {"name": "Bob", "surname": "кто-то", "patronymic": "кто-тович", "job_status": "Маг", #"work_starts": "21", "id": "1"},
#    {"name": "Charlie", "surname": "кто-то", "patronymic": "кто-тович", "job_status": #"Берсерк", "work_starts": "21", "id": "2"},
#]