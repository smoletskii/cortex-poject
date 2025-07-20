import sqlite3

def add_empty_position(id):
    c.execute('''
        INSERT INTO positions (rowid, Position_name, Department)
        VALUES (?, ?, ?)
    ''', (id, 'fhd', 'fdgh'))
    db.commit()



keys_users = ['id', 'name', 'surname', 'patronymic', 'job_status', 'work_starts']
keys_positions = ['id', 'Position_name', 'Department']
db = sqlite3.connect('users.db')
c = db.cursor()


def get_positions_data():
    c.execute("SELECT rowid, * FROM positions ")
    data = c.fetchall()
    people = [dict(zip(keys_positions, row)) for row in data]
    return people

c.execute("""CREATE TABLE IF NOT EXISTS users (
name TEXT,
surname TEXT,
patronymic TEXT,
job_status TEXT,
work_starts INTEGER
)
""")


def get_users_data():
    c.execute("SELECT rowid, * FROM users ")
    data = c.fetchall()
    people = [dict(zip(keys_users, row)) for row in data]

    return people



def delete_persion(id):
    c.execute(f"DELETE FROM users WHERE rowid = {id}")
    db.commit()


def add_nullstr(id):
    c.execute(f"""INSERT INTO users(rowid,
    name,
    surname,
    patronymic,
    job_status,
    work_starts)
    VALUES({id}, '', '', '','', '' )""")
    db.commit()


def update_persion(name, surname, patronymic, job_status, work_starts, rowid):
    c.execute('''
        UPDATE users SET
        name = ?, surname = ?, patronymic = ?, job_status = ?, work_starts = ?
        WHERE rowid = ?
    ''', (name, surname, patronymic, job_status, work_starts, rowid))
    db.commit()


#def add_person(id, name, surname, patronymic, job_status, work_starts):
#   c.execute(f"INSERT INTO users({id},{name},{surname},{patronymic},{job_status},#####{work_starts})")
#    db.commit()

db.commit()





c = db.cursor()











#c.execute("INSERT INTO positions VALUES ('CEO', 'director')")
#c.commit()

#c.execute("""INSERT INTO users VALUES ('Alice', 'кто-то', 'кто-тович', #'Engineer', '21'),
#( 'Bob', 'кто-то', 'кто-тович', 'Маг', '21' )""")




def delete_position(id):
    c.execute(f"DELETE FROM positions WHERE rowid = {id}")
    db.commit()



def update_position(Position_name, Department, rowid):
    c.execute('''
        UPDATE positions SET
        Position_name = ?, 
        Department = ?
        WHERE rowid = ?
    ''', (Position_name, Department, rowid))
    db.commit()


#def add_person(id, name, surname, patronymic, job_status, work_starts):
#   c.execute(f"INSERT INTO users({id},{name},{surname},{patronymic},{job_status},#####{work_starts})")
#    db.commit()

db.commit()

c.execute("""CREATE TABLE IF NOT EXISTS positions (
Position_name TEXT,
Department TEXT) 
""")
db.commit()



