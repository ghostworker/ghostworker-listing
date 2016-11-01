# ghostworker-listing

A set of tools for GhostWorker library to list offline content.


HTML needed for the javascript to work
``` html
<h2>Notes</h2>
<ul></ul>
<script type="text/javascript" src="/javascript/moment.js"></script>
<script type="text/javascript" src="/ghostworker-dom.js"></script>
<script type="text/javascript" src="/ghostworker-listing.js"></script>

<script>
    document.addEventListener("DOMContentLoaded", function(event) {
        GhostWorkerListing.listContent( '#notes-list ul', 'notes' );
    });
</script>
```


Using promise to return data used to build the listing
``` html
<h2>Notes</h2>
<ul></ul>
<script type="text/javascript" src="/javascript/moment.js"></script>
<script type="text/javascript" src="/ghostworker-dom.js"></script>
<script type="text/javascript" src="/ghostworker-listing.js"></script>

<script>
    document.addEventListener("DOMContentLoaded", function(event) {
        GhostWorkerListing.listContent( '#notes-list ul', 'notes' )
            .then(function(results){
                // do something with result
            })
    });
</script>
```




## Rollup build

``` bash
$ ./node_modules/.bin/rollup -c rollup.config.js
```