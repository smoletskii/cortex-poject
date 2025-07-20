from flask import Flask, render_template, request, jsonify
import database as db

#import sqlite3
app = Flask(__name__)

@app.route('/')
def main_page():
    return render_template('main_page.html')

@app.route('/persons')
def persons():
    print(db.get_positions_data())
    return render_template('persons.html', people=db.get_users_data(), positions=db.get_positions_data())

@app.route('/positions')
def positions():
    return render_template('positions.html', positions=db.get_positions_data())






@app.route('/update', methods=['POST'])
def update_employees():
    data = request.get_json()
    id = data['id']
    # Место для изменения строки в бд через схожесть в id
    db.update_persion(data["name"], data["surname"], data["patronymic"], data["job_status"], data["work_time"], id)
    
    
    return jsonify({"status": "success"})

@app.route('/create_person', methods=['POST'])
def create_person():
    data = request.get_json()
    id = data['id']
    print(id)
    # Место для добавления пустой строки в бд с id
    #db.add_nullstr(2)
    db.add_nullstr(id)

    return jsonify({"status": "success"})



@app.route('/delete_person', methods=['POST'])
def delete_person():
    data = request.get_json()
    id = data['id']
    print(id + " deleted")
    # Место для удаления строки в бд
    db.delete_persion(id)
    return jsonify({"status": "success"})





@app.route('/update_position', methods=['POST'])
def update_position():
    data = request.get_json()
    departament = data['departament']
    position = data['job_status']
    id = data['id']
    print(id)
    # Место для изменения строки в бд через схожесть в id
    db.update_position(position, departament, id)
    


    return jsonify({"status": "success"})

@app.route('/create_position', methods=['POST'])
def create_position():
    data = request.get_json()
    id = data['id']
    print(id)
    # Место для добавления пустой строки в бд с id
    db.add_empty_position(id)

    return jsonify({"status": "success"})



@app.route('/delete_position', methods=['POST'])
def delete_position():
    data = request.get_json()
    id = data['id']
    print(id + " deleted")
    # Место для удаления строки в бд
    db.delete_position(id)
    return jsonify({"status": "success"})





        
   


if __name__ == '__main__':
    app.run(debug=True)











#people = [
#    {"name": "Alice", "surname": "кто-то", "patronymic": "кто-тович", "job_status": #"Engineer", "work_starts": "21", "id": "0"},
#    {"name": "Bob", "surname": "кто-то", "patronymic": "кто-тович", "job_status": "Маг", #"work_starts": "21", "id": "1"},
#    {"name": "Charlie", "surname": "кто-то", "patronymic": "кто-тович", "job_status": #"Берсерк", "work_starts": "21", "id": "2"},
#]