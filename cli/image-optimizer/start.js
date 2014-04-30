/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * start.js ~ 2014/04/30 11:10:53
 * @author yankun(yankun01@baidu.com)
 * @version 0.1.0 
 * @description 
 * edp image-optimizer start 命令入口
 **/
exports.cli = {
    description: 'jpegtran,optipng优化图片',
    options: [],
    main: function( args, opts ) {
        require('../../lib/img-opt').optimize(args, opts);
    }
};




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
