"use strict";
var DATE_REGEXP = new RegExp('^(\\d{4}):(\\d{2}):(\\d{2}) (\\d{2}):(\\d{2}):(\\d{2})' +
    '(?:\\.(\\d{1,3}))?(?:([zZ])|([-+])(\\d{2}):(\\d{2}))?$');
function pad(num, length) {
    if (length === void 0) { length = 2; }
    var value = num.toString();
    var len = length - value.length;
    while (len > 0) {
        len -= 1;
        value = "0" + value;
    }
    return value;
}
function parse(value) {
    var m = DATE_REGEXP.exec(value);
    if (m == null) {
        return new Date(NaN);
    }
    var date = new Date();
    var offset = m[8] ? 0 : (m[9] ? ((Number(m[10]) * 60 + Number(m[11])) * (m[9] === '+' ? 1 : -1)) : 0);
    date.setUTCFullYear(Number(m[1]));
    date.setUTCMonth(Number(m[2]) - 1);
    date.setUTCDate(Number(m[3]));
    date.setUTCHours(Number(m[4]));
    date.setUTCMinutes(Number(m[5]) + offset);
    date.setUTCSeconds(Number(m[6]));
    date.setUTCMilliseconds(Number(m[7]) || 0);
    return date;
}
// exports.parse = parse;
function format(value, subsecond, timezone) {
    if (isNaN(value.getTime())) {
        return '';
    }
    var date = pad(value.getUTCFullYear(), 4) + ":" + pad(value.getUTCMonth() + 1) + ":" + pad(value.getUTCDate());
    var time = pad(value.getUTCHours()) + ":" + pad(value.getUTCMinutes()) + ":" + pad(value.getUTCSeconds());
    var suffix = subsecond ? "." + Math.round(value.getUTCMilliseconds() / 10) : '';
    var zone = timezone ? 'Z' : '';
    return date + " " + time + suffix + zone;
}
// exports.format = format;

var exifdate = {
    parse,
    format
};
//# sourceMappingURL=index.js.map