"""Seed file to make sample data for db."""

from models import Pet, db
from app import app

# Create all tables
db.drop_all()
db.create_all()


p1 = Pet(
    name='f1' , 
    species='Cat' , 
    photo_url = 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQUm7keDmUGnJAb51ze2rXZ57lV8NA6Zw9aY65Xa43vI6YHX2JSXiny9ay93HM7hLOYMn-oXcwDcdyyg2A6TMVMiGOsFy74tOtbppv-ew8&usqp=CAc' ,
    age = 3 ,
    notes = '' ,
    available = True)
p2 = Pet(
    name='f2' , 
    species='Dog' , 
    photo_url='https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT_xXu76TD0Pz0JKUiFT7K-I92mKmr6wG8iJT5yZYUEphcqzzEUQH5I6hWhYy7WYjh25MRnBZ9wAV0_gOc_Zw0zVkA_WM82tFiw5uODFXAN&usqp=CAc' ,
    age = 3 ,
    notes = '' ,
    available = True)
p3 = Pet(
    name='f3' , 
    species='Cat' , 
    photo_url='https://ichef.bbci.co.uk/news/1024/cpsprodpb/151AB/production/_111434468_gettyimages-1143489763.jpg' ,
    age = 5,
    notes = '' ,
    available = True)
p4 = Pet(
    name='f4' , 
    species='Porcupine' , 
    photo_url='https://upload.wikimedia.org/wikipedia/commons/8/8c/PorcupineCabelasSpringfield0511.jpg' ,
    age = 3 ,
    notes = '' ,
    available = True)
db.session.add_all([p1 , p2 , p3 , p4])
db.session.commit()