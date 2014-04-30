/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * img-opt.js ~ 2014/04/30 11:12:59
 * @author yankun(yankun01@baidu.com)
 * @version 0.1.0 
 * @description 
 * 调用image min 包来处理目录文件。
 **/

var fs = require('fs'),
    path = require('path'),
    Imagemin = require('image-min');

function walk(dir, done) {
    var results = [];
    fs.readdir(dir, function (err, list) {
        if (err) {
            return done(err);
        }
        var pending = list.length;
        if (!pending) {
            return done(null, results);
        }
        list.forEach(function (file) {
            file = path.join(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function (err, res) {
                        results = results.concat(res);
                        if (!(--pending)) {
                            done(null, results);
                        }
                    });
                } else {
                    results.push(file);
                    if (!(--pending)) {
                        done(null, results);
                    }
                }
            });
        });
    });
}

function optimizeImage(filePath) {
    var u = ['png', 'tif', 'tiff'],
        ext = path.extname(filePath).slice(1),
        trans,
        imagemin;

    if (u.indexOf(ext) > -1) {
        trans = Imagemin.optipng({ optimizationLevel: 3 });
    } else if (ext === 'gif') {
        trans = Imagemin.gifsicle({ interlaced: true });
    } else if (/^jpe?g/.test(ext)) {
        trans = Imagemin.jpegtran({ progressive: true });
    }

    if (trans) {
        imagemin = new Imagemin()
            .src(filePath)
            .dest(filePath)
            .use(trans);

        imagemin.optimize(function (err, file) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('Optimized: ' + filePath);
        });
    } else {
        console.log('Not supported: ' + filePath);
    }
}

exports.optimize = function (args, options) {
    var  target;

    if (args.length === 0) {
        console.log('Please specify a folder or image file.');
        return;
    }
    target = path.join(process.cwd(), args[0]);
    var stat = fs.statSync(target);
    if (stat.isFile()) {
        optimizeImage(target);
    } else if (stat.isDirectory()) {
        walk(target, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            result.forEach(function (item) {
                optimizeImage(item);
            });
        });
    }
};