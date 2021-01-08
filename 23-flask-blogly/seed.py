"""Seed file to make sample data for db."""

from models import User, db
from app import app

# Create all tables
db.drop_all()
db.create_all()


u1 = User(first_name='f1' , last_name='l1' , image_url='https://static.onecms.io/wp-content/uploads/sites/20/2020/12/01/12-14-2020-tout.jpg')
u2 = User(first_name='f2' , last_name='l2' , image_url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXzdlVaF5YKdu99_xQstMmajy0KnntSMn06w&usqp=CAU')
u3 = User(first_name='f3' , last_name='l3')
u4 = User(first_name='f4' , last_name='l4')

db.session.add_all([u1 , u2 , u3 , u4])
db.session.commit()

p1 = Post(title="t1" , content="c1" , user_id=u1.id)
p2 = Post(title="t2" , content="c2" , user_id=u2.id)
p3 = Post(title="t3" , content="c3" , user_id=u1.id)
p4 = Post(title="t4" , content="c4" , user_id=u2.id)


db.session.add_all([p1 ,p2 , p3 , p4])
db.session.commit()

t1 = Tag(name="t1")
t2 = Tag(name="t2")
t3 = Tag(name="t3")
t4 = Tag(name="t4")

db.session.add_all([t1 ,t2 , t3 , t4])
db.session.commit()

p1.tags.extend([t1 , t2])
p2.tags.extend([t3 , t4 , t1])
p3.tags.extend([t2])

db.session.add_all([p1 , p2 , p3])
db.session.commit()