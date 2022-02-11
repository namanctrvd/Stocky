
from bs4 import BeautifulSoup
from urllib.request import urlopen
import requests
import time
import mongo_setup as mgstp


def lastPrice(symbol):
    urll = 'https://www1.nseindia.com/live_market/dynaContent/live_watch/get_quote/GetQuote.jsp?symbol='
    urll = urll + symbol
    headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36'}
    req = requests.get(urll, headers=headers)
    print(type(req))

    soup = BeautifulSoup(req.text, 'html.parser')
    data_array = soup.find(id='responseDiv').getText().strip().split(":")

    return data_array[72].split('"')[1]

def update(stock_name, collection):
    while(True):
        l = len(stock_name)
        for i in range(l):
            name = stock_name[i]
            price = lastPrice(name)
            #post = {"_id": i, "name": name, "price": price}
            #post2 = {"_id": i, "name": name, "price": 0}
            collection.update_one({"name" : name}, {"$set":{"price" : price}})
            print(name)
if __name__ == "__main__":

    stock_name = [
        "TATASTEEL",
        "HINDALCO",
        "JSWSTEEL",
        "ADANIPORTS",
        "SBILIFE",
        "BAJAJFINSV",
        "HDFC",
        "IOC",
        "M%26M",
        "NTPC",
        "BHARTIARTL",
        "COALINDIA",
        "ULTRACEMCO",
        "ITC",
        "BPCL",
        "ONGC",
        "HDFCBANK",
        "HINDUNILVR",
        "SBIN",
        "TCS",
        "WIPRO",
        "MARUTI",
        "BRITANNIA",
        "TECHM",
        "DRREDDY",
        "ASIANPAINT",
        "SHREECEM",
        "NESTLEIND",
        "INDUSINDBK",
        "HDFCLIFE",
        "LT",
        "TATAMOTORS",
        "GRASIM",
        "CIPLA",
        "HCLTECH",
        "SUNPHARMA",
        "AXISBANK",
        "ICICIBANK",
        "RELIANCE",
        "TITAN",
        "KOTAKBANK",
        "POWERGRID",
        "INFY",
        "DIVISLAB",
        "BAJFINANCE",
        "UPL",
        "EICHERMOT",
        "BAJAJ-AUTO",
        "HEROMOTOCO",
        "TATACONSUM"
    ]

    collection = mgstp.init_mongo(stock_name)
    print("Initialization Done")
    update(stock_name, collection)

    #while(True):
        #print(lastPrice('HDFCBANK'))
        #time.sleep(10)
