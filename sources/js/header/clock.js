/* global $, headerConstants */

function pad(num, width) {
    const numAsString = `${num}`;
    const padLength = (width - numAsString.length) + 1;
    return numAsString.length >= width ? numAsString : new Array(padLength).join('0') + numAsString;
}

class TimeSync {
    constructor() {
        this.correction = 0;
        this.serverUrl = `${headerConstants.cr}/commons/getTime.action`;

        this.sync();
        setInterval(() => {
            this.sync();
        }, 30 * 1000);
    }

    sync() {
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };

        $.ajax({
            dataType: 'json',
            headers,
            type: 'GET',
            url: this.serverUrl,
            success: data => {
                this.correction = new Date() - new Date(data.currentTime);
            },
        });
    }

    get serverTime() {
        return new Date(new Date() - this.correction);
    }
}

if (document.querySelector('[data-clock="date"]') !== null) {
    class TimeRenderer {
        constructor() {
            this.timeSync = new TimeSync();
            this.hourEl = document.querySelector('[data-clock="h"]');
            this.minutesEl = document.querySelector('[data-clock="m"]');
            this.secondsEl = document.querySelector('[data-clock="s"]');
            this.mSecondsEl = document.querySelector('[data-clock="ms"]');

            this.dateEl = document.querySelector('[data-clock="date"]');
            this.dayEl = document.querySelector('[data-clock="dayOfWeek"]');

            this.daysOfWeek = [
                'Воскресенье',
                'Понедельник',
                'Вторник',
                'Среда',
                'Четверг',
                'Пятница',
                'Суббота',
            ];

            this.months = [
                'января',
                'февраля',
                'марта',
                'апреля',
                'мая',
                'июня',
                'июля',
                'августа',
                'сентября',
                'октября',
                'ноября',
                'декабря',
            ];
        }

        init() {
            this.updateCalendar(this.timeSync.serverTime);
            setInterval(() => this.updateClock(this.timeSync.serverTime), 20);
            setInterval(() => this.updateCalendar(this.timeSync.serverTime), 1000);
            $('.datetime.uninitialized').removeClass('uninitialized');
        }

        updateCalendar(now) {
            this.dateEl.textContent = this.computeDateString(now);
            this.dayEl.textContent = this.daysOfWeek[now.getDay()];
        }

        updateClock(now) {
            this.hourEl.innerHTML = pad(now.getHours(), 2);
            this.minutesEl.innerHTML = pad(now.getMinutes(), 2);
            this.secondsEl.innerHTML = pad(now.getSeconds(), 2);
            this.mSecondsEl.innerHTML = pad(now.getMilliseconds(), 3);
        }

        computeDateString(date) {
            const day = date.getDate();
            const month = this.months[date.getMonth()];
            const year = date.getFullYear();

            return `${day} ${month} ${year}`;
        }
    }

    const renderer = new TimeRenderer();
    renderer.init();
}
