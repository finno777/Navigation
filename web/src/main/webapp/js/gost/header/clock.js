/* This file is generated — do not edit by hand! */
/* eslint-disable */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* global $, headerConstants */

function pad(num, width) {
    var numAsString = '' + num;
    var padLength = width - numAsString.length + 1;
    return numAsString.length >= width ? numAsString : new Array(padLength).join('0') + numAsString;
}

var TimeSync = function () {
    function TimeSync() {
        var _this = this;

        _classCallCheck(this, TimeSync);

        this.correction = 0;
        this.serverUrl = headerConstants.cr + '/commons/getTime.action';

        this.sync();
        setInterval(function () {
            _this.sync();
        }, 30 * 1000);
    }

    _createClass(TimeSync, [{
        key: 'sync',
        value: function sync() {
            var _this2 = this;

            var headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            };

            $.ajax({
                dataType: 'json',
                headers: headers,
                type: 'GET',
                url: this.serverUrl,
                success: function success(data) {
                    _this2.correction = new Date() - new Date(data.currentTime);
                }
            });
        }
    }, {
        key: 'serverTime',
        get: function get() {
            return new Date(new Date() - this.correction);
        }
    }]);

    return TimeSync;
}();

if (document.querySelector('[data-clock="date"]') !== null) {
    var TimeRenderer = function () {
        function TimeRenderer() {
            _classCallCheck(this, TimeRenderer);

            this.timeSync = new TimeSync();
            this.hourEl = document.querySelector('[data-clock="h"]');
            this.minutesEl = document.querySelector('[data-clock="m"]');
            this.secondsEl = document.querySelector('[data-clock="s"]');
            this.mSecondsEl = document.querySelector('[data-clock="ms"]');

            this.dateEl = document.querySelector('[data-clock="date"]');
            this.dayEl = document.querySelector('[data-clock="dayOfWeek"]');

            this.daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

            this.months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        }

        _createClass(TimeRenderer, [{
            key: 'init',
            value: function init() {
                var _this3 = this;

                this.updateCalendar(this.timeSync.serverTime);
                setInterval(function () {
                    return _this3.updateClock(_this3.timeSync.serverTime);
                }, 20);
                setInterval(function () {
                    return _this3.updateCalendar(_this3.timeSync.serverTime);
                }, 1000);
                $('.datetime.uninitialized').removeClass('uninitialized');
            }
        }, {
            key: 'updateCalendar',
            value: function updateCalendar(now) {
                this.dateEl.textContent = this.computeDateString(now);
                this.dayEl.textContent = this.daysOfWeek[now.getDay()];
            }
        }, {
            key: 'updateClock',
            value: function updateClock(now) {
                this.hourEl.innerHTML = pad(now.getHours(), 2);
                this.minutesEl.innerHTML = pad(now.getMinutes(), 2);
                this.secondsEl.innerHTML = pad(now.getSeconds(), 2);
                this.mSecondsEl.innerHTML = pad(now.getMilliseconds(), 3);
            }
        }, {
            key: 'computeDateString',
            value: function computeDateString(date) {
                var day = date.getDate();
                var month = this.months[date.getMonth()];
                var year = date.getFullYear();

                return day + ' ' + month + ' ' + year;
            }
        }]);

        return TimeRenderer;
    }();

    var renderer = new TimeRenderer();
    renderer.init();
}
//# sourceMappingURL=../maps/header/clock.js.map
