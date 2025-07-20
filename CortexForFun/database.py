import sqlite3

print(1)
db = sqlite3.connect('users.db')
def fetch_data_as_dicts(db_path, table_name):
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM {table_name}")
    rows = cursor.fetchall()
    data = []
    for row in rows:
        # Преобразуем каждую строку в словарь
        data.append(dict(row))

    return data
    conn.close()
    

db.row_factory = sqlite3.Row

c = db.cursor() # создаю курсор в самйо таблице
c.execute("""CREATE TABLE IF NOT EXISTS users (
name TEXT,
surname TEXT,
patronymic TEXT,
job_status TEXT,
work_starts INTEGER
)
""")
c.execute("""INSERT INTO users VALUES ('Alice', 'кто-то', 'кто-тович', 'Engineer', '21'),
( 'Bob', 'кто-то', 'кто-тович', 'Маг', '21' )""")
c.execute("SELECT rowid, * FROM  users ")


def delete_persion(id):
    c.execute("DELETE FROM users WHERE rowid = {id}")


def add_persion(id):
    c.execute("INSERT INTO users VALUES ("", "", "", "", {id})")

def update_persion(part, data, id):
    c.execute("UPDATE users SET {part} = {data} WHERE rowid = {id}")

c.fetchall()
  
db.commit()


db.close()