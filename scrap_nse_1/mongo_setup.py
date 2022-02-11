import pymongo
from pymongo import MongoClient


def init_mongo(stock_name):

    cluster = MongoClient(
        'mongodb+srv://crazy_stardusts:<password>@clusname.ywg00.mongodb.net/Stocks?ssl=true&ssl_cert_reqs=CERT_NONE')

    db = cluster["Stocks"]
    collection = db["prices"]

    collection.delete_many({})
    i = 0
    for name in stock_name:
        post = {"_id": i, "name": name, "price": 0}
        collection.insert_one(post)
        i = i+1
    return collection
