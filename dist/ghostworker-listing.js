(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (factory());
}(this, (function () { 'use strict';

document.addEventListener("DOMContentLoaded", function (event) {

    listContent('#notes-list ul', 'ghostworker-content-v0.1');
});

function listContent(selector, cacheName) {
    var ul = document.querySelector(selector);
    caches.open(cacheName).then(function (cache) {
        cache.keys().then(function (keys) {
            keys.forEach(function (request, index, array) {

                var newRequest = request.clone();
                window.caches.match(newRequest).then(function (response) {
                    if (response) {
                        var clonedResponse = response.clone();
                        clonedResponse.text().then(function (body) {
                            var json = JSON.parse(body);

                            var li = document.createElement('li');
                            li.classList.add();
                            var a = document.createElement('a');
                            var title = json.replacements[0].content[0].replace('<title>', '').replace('</title>', '');
                            a.appendChild(document.createTextNode(title));
                            a.href = request.url;
                            li.appendChild(a);

                            if (newRequest.headers) {
                                var isodate = request.headers.get('X-Ghost-Worker-Cache-Date');
                                var time = document.createElement('time');
                                time.setAttribute('datetime', isodate);
                                var formatted = moment(isodate).format('Do MMMM YYYY - hh:mm:ss');

                                time.appendChild(document.createTextNode(formatted));
                                li.appendChild(document.createTextNode(' '));
                                li.appendChild(time);
                            }

                            ul.appendChild(li);
                        });
                    } else {}
                });
            });
        });
    });
}

})));
//# sourceMappingURL=ghostworker-listing.js.map
