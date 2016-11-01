
var GhostWorkerListing = {};

var GhostWorkerListing = {};

GhostWorkerListing.listContent = function (selector, cacheName) {

    var self = this;
    var cacheName = this.buildCacheName(cacheName);
    var parentNode = document.querySelector(selector);

    return caches.open(cacheName).then(function (cache) {
        return cache.keys().then(function (keys) {
            return Promise.all(keys.map(self.readCacheItem)).then(function (results) {
                //console.log(results.length);

                results.sort(self.sortBy('cachedDate', true));
                results.forEach(function (item) {
                    if (!item.error) {
                        self.renderItem(item.body, item.response, item.request, parentNode);
                    }
                });
                return results;
            });
        });
    });
};

GhostWorkerListing.readCacheItem = function (request) {

    var clonedRequest = request.clone();
    return window.caches.match(clonedRequest).then(function (response) {

        if (response) {
            var clonedResponse = response.clone();
            return clonedResponse.text().then(function (body) {

                var out = {
                    'body': body,
                    'response': clonedResponse,
                    'request': clonedRequest
                };

                if (request.headers) {
                    var isodate = request.headers.get('X-Ghost-Worker-Cache-Date');
                    if (isodate) {
                        out.cachedDate = isodate;
                    }
                }
                return out;
            });
        } else {
            return { 'error': 'No response object found for cache item' };
        }
    });
};

GhostWorkerListing.renderItem = function (body, response, request, parentNode) {

    var json = JSON.parse(body);

    var li = document.createElement('li');
    li.classList.add('cache-item');
    var a = document.createElement('a');
    var title = json.replacements[0].content[0].replace('<title>', '').replace('</title>', '');

    a.appendChild(document.createTextNode(title));
    a.href = this.urlRemovePathElement(request.url, '-json');
    li.appendChild(a);

    if (request.headers) {
        var isodate = request.headers.get('X-Ghost-Worker-Cache-Date');
        var timeContainer = document.createElement('span');
        var timeLabel = document.createElement('span');
        timeContainer.classList.add('cache-item-time-container');
        timeLabel.classList.add('cache-item-time-label');
        var time = document.createElement('time');
        time.setAttribute('datetime', isodate);
        var formatted = moment(isodate).format('Do MMMM YYYY - hh:mm:ss');

        time.appendChild(document.createTextNode(formatted));
        timeLabel.appendChild(document.createTextNode('Last cached: '));
        li.appendChild(document.createTextNode(' '));

        timeContainer.appendChild(timeLabel);
        timeContainer.appendChild(time);
        li.appendChild(timeContainer);
    }

    parentNode.appendChild(li);
};

GhostWorkerListing.urlRemovePathElement = function (url, pathElement) {
    url = new URL(url);
    url.pathname = url.pathname.replace(pathElement, '');
    return url.toString();
};

GhostWorkerListing.buildCacheName = function (name) {
    return 'ghostworker-' + name + '-v0.1';
};

GhostWorkerListing.sortBy = function (field, reverse, primer) {

    var key = primer ? function (x) {
        return primer(x[field]);
    } : function (x) {
        return x[field];
    };

    reverse = !reverse ? 1 : -1;

    return function (a, b) {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    };
};

export default GhostWorkerListing;

