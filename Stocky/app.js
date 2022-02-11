const express = require('express');

const app = express();

const morgan = require('morgan');

const mongoose = require('mongoose');
const dburl = 'mongodb+srv://Ojas:password@clusname.ywg00.mongodb.net/Stocks?retryWrites=true&w=majority';

const Uls = require('./models/userlg');

const pri = require('./models/Price');

const _ = require('lodash');

const stockn = require('./tp.js');
const { times } = require('lodash');

mongoose.connect(dburl)
    .then((result) => app.listen(3000, 'localhost', () => {
        console.log('Hosted');
    }))
    .catch((err) => console.log('Error : Database Connection'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.set('view engine', 'ejs');

let userp = new Uls();
for (let i = 0; i < 50; i++) {
    userp.stqy.push(0);
}
userp.cash = 0;
userp.ip = '0';
userp.gameid = 0;

var p = [];
for (let i = 0; i < 50; i++) {
    p.push(0);
}
function con(s) {
    s = s.replace(",", "");
    s = Number(s);
    return s;
}
function getPrice() {
    pri.find({}, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            //console.log(result[0].price);
            for (let i = 0; i < 50; i++) {
                let t = con(result[i].price);
                //console.log(t);
                p[i] = t;

                //console.log(p[i]);
            }
        }
    });
}

function sportfolio(data) {
    let total = 0;
    for (let i = 0; i < 50; i++) {
        //console.log(p[i], data.stqy[i], total);
        total += p[i] * Number(data.stqy[i]);
    }
    return total;
}



app.get('/', (req, res) => {
    //getPrice();
    let gameid = 0;
    res.render('index', { gameid });
});

app.get('/create', (req, res) => {
    let gameid = _.random(100000, 999999);
    res.render('index', { gameid });
});

app.get('/join', (req, res) => {
    res.render('join');
})

app.post('/login', (req, res) => {
    console.log(req.body.username, req.body.gameid);
    let user = new Uls(req.body);
    for (let i = 0; i < 50; i++) {
        user.stqy.push(0);
    }
    user.cash = 500000;
    let f = 0;
    Uls.find(({ username: user.username, gameid: user.gameid }), (err, result) => {
        if (err) {
            console.log(err);
        }
        //console.log(result);
        if (result.length == 1) {
            if (result[0].password == user.password) {
                f = 1;
                //console.log(result[0]);
                user = result[0];
                for (let i = 0; i < 50; i++) {
                    user.stqy[i] = result[0].stqy[i];
                }
            }
            else {
                f = 2;
            }

        }
        else if (result.length == 0) {
            user.cash = 500000;
            user.ip = req.ip;
            user.save((err) => {
                if (err) {
                    console.log(err);
                }
                //console.log(user);
            });
            f = 1;
        }

        //console.log(f);
        if (f == 1) {
            userp = user;
            for (let i = 0; i < 50; i++) {
                userp.stqy[i] = user.stqy[i];
            }
            //console.log(userp);
            res.redirect('/game');
        }
        else {
            res.redirect('/');
        }
    });
});


app.get('/game', (req, res) => {
    //console.log(userp);
    //userp.stqy[0] = 1;
    if (userp.ip != req.ip) {
        res.redirect('/');
    }
    //console.log(stockn);
    getPrice();

    var waitTill = new Date(new Date().getTime() + 1 * 1000);
    while (waitTill > new Date()) { }
    // for(let i =0;i < 50;i++){
    //     console.log(p[i]);
    // }
    let sp = sportfolio(userp);
    if (sp == NaN) {
        res.redirect('/');
    }
    console.log(sp, "Sp");
    res.render('game', { userp, sp, p, stockn });
});

function getI(s) {
    for (i = 0; i < 50; i++) {
        //console.log(stockn[i], s);
        if (stockn[i] == s) {
            return i;
        }
    }
    return -1;
}
app.post('/trade', (req, res) => {
    console.log(req.body);
    //console.log(req.body.symbol);
    let s = req.body.symbol;
    pi = getI(s);
    console.log(pi);
    let a = req.body.act;
    let q = req.body.quantity;
    q = Number(q);
    if (a == 'B') {
        let tl = p[pi] * q;
        if (tl <= userp.cash) {
            console.log(tl);
            Uls.deleteOne({ userp }, (err) => {
                if (err) {
                    console.log(err);
                }
            });
            userp.stqy[pi] += q
            userp.cash -= tl;
            userp.save((err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
    }
    else if (a == 'S') {
        if (q <= userp.stqy[pi]) {
            Uls.deleteOne({ userp }, (err) => {
                if (err) {
                    console.log(err);
                }
            });
            userp.stqy[pi] -= q;
            userp.cash += p[pi] * q;
            userp.save((err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
    }
    res.redirect('/game');
});

app.get('/ranklist', (req, res) => {
    if (userp.gameid == 0) {
        res.redirect('/');
    }
    var r = [];
    var us = [];
    Uls.find(({ gameid: userp.gameid }), (err, result) => {
        if (err) {
            console.log(err);
        }
        for (let i = 0; i < result.length; i++) {
            us.push(result[i].username);
            r.push(result[i].cash);
            //console.log(r[i], us[i]);
            console.log(result[i].username, result[i].cash);
        }
        console.log(us);
        console.log(r); 
        res.render('rank', { r, us });
    });
});
app.use((req, res) => {
    res.redirect('/');
});
