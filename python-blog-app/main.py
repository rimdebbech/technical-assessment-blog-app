from pymongo import MongoClient

from typing import Optional

from fastapi import FastAPI

from pydantic import BaseModel

from bson.objectid import ObjectId

from fastapi.middleware.cors import CORSMiddleware

from bson.binary import UuidRepresentation

import json

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Blog(BaseModel):
    title: str
    author: str
    content:str
    upvote: int
    downvote: int
    
def connect():
    # connect to database
    mongodb_uri = "mongodb+srv://rim-debbech-97:rim-debbech-97@cluster0.g4jmc.mongodb.net/blogs_app_db?retryWrites=true&w=majority"
    port = 8000
    client = MongoClient( mongodb_uri, port )
    # get database
    db = client.get_database( 'blogs_app_db' )
    # get collection
    collection = db.blogs
    return collection
    
@app.get("/blogs")
def get_all_blogs():
    collection = connect()
    items = list(collection.find({},{ "_id": 0, "title": 1, "author": 1, "content": 1 , "upvote": 1, "downvote": 1 }))
    ids_str = format(list(collection.find({},{ "_id": 1})))
    
    ids_str = ids_str.replace("ObjectId(","")
    ids_str = ids_str.replace(")","")
    ids_str = ids_str.replace("\'","\"")
    ids_json = json.loads(ids_str)
    
    i = 0
    results=[]
    for item in items:
        print(item)
        res = {"id":ids_json[i]['_id'],
               "title": item['title'],
               "author": item['author'],
               "content": item['content'],
               "upvote": item['upvote'],
               "downvote": item['downvote']}
        results.append(res)
        i = i+1
    return results

@app.get("/get_blog_by_id/{blog_id}")
def get_blog_by_id(blog_id: str):
    collection = connect()
    return list(collection.find({ "_id":  ObjectId(blog_id) },{ "_id": 0, "title": 1, "author": 1, "content": 1 , "upvote": 1, "downvote": 1 }))

@app.post("/add_blog")
def add_blog(blog: Blog):
    collection = connect()
    return format(collection.insert_one(blog).inserted_id)

@app.put("/update_blog_by_id/{blog_id}")
def update_blog_by_id(blog_id: str, blog: Blog):
    collection = connect()
    query = { "_id":  ObjectId(blog_id) }
    blog = { "$set": { "upvote": blog.upvote, "downvote": blog.downvote } }
    return format(collection.update_one(query, blog))

@app.delete("/delete_blog_by_id/{blog_id}")
def delete_blog_by_id(blog_id: str):
    collection = connect()
    return format(collection.delete_one({"_id": ObjectId(blog_id)}))
