/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * foo.js ~ 2014/04/01 11:10:53
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 * edp seed foo command
 **/
exports.cli = {
    description: 'jpegtran,optipng优化图片',
    options: [ 'hello', 'world:' ],
    main: function( args, opts ) {
        require('../../lib/img-opt').optimize(args, opts);
    }
}




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
