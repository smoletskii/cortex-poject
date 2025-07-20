import sqlite3

print(1)

keys = ['id', 'Position_name', 'Departament']

c = db.cursor()


def data_to_dyct():
    c.execute("SELECT rowid, * FROM  positions ")
    data = c.fetchall()
    people = [dict(zip(keys, row)) for row in data]
    print(people)
    return people



c.execute("""CREATE TABLE IF NOT EXISTS positions (
position name TEXT,
Department TEXT,
)
""")
#c.execute("""INSERT INTO users VALUES ('Alice', 'кто-то', 'кто-тович', #'Engineer', '21'),
#( 'Bob', 'кто-то', 'кто-тович', 'Маг', '21' )""")

c.execute("SELECT * FROM  positions ")


def delete_position(id):
    c.execute(f"DELETE FROM positions WHERE rowid = {id}")
    db.commit()


def add_nullstry(id):
    c.execute(f"""INSERT INTO positions(rowid,
    Position name,
    Department,
   )
    VALUES({id}, '', '')""")
    db.commit()


def update_position(Position_name, Departament, rowid):
    c.execute('''
        UPDATE users SET
        Position_name = ?, Departament = ?,
        WHERE rowid = ?
    ''', (Position_name, Departament, rowid))
    db.commit()


#def add_person(id, name, surname, patronymic, job_status, work_starts):
#   c.execute(f"INSERT INTO users({id},{name},{surname},{patronymic},{job_status},#####{work_starts})")
#    db.commit()

db.commit()
