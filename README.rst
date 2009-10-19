===================================================================
A jQuery plugin implementation of Sage's ``interact`` functionality
===================================================================

``interact`` is a way to dynamically manipulate functions (inputs 
and parameters) and instantly see the results.
See many excellent examples here: http://wiki.sagemath.org/interact

This goal of ``jquery-interact`` is to have:
    - A stand-alone jQuery plugin version of ``interact``
    - Support local JavaScript (<canvas> html5 element based) usage.
    - Support remote Codenode / Sage / etc usage.

All Input Forms and Sliders *must* be created in the browser with
jQuery's DOM functions, as to have no dependence on a backend 
(webserver) process.
This is motivated by 1) supporting the pure 'javascript only' 
usage (no backend server executing code) and
2) to have a clear separation of concerns between components.


Demo
====
    - Open the file 'demo.html' to see the (simple) demo.   
    - The jQuery plugin is located at: "static/js/interact.js".


Example Usage and API (WORK IN PROGRESS / PROPOSED USAGE)
=========================================================

``jquery-interact`` for language="javascript"
---------------------------------------------

Given an html snippet of this form::

    <div id="jsdemo">
        function bar(a, x) {
          return Math.sin(x*(1 + a*x));
        }
        interact(plot(bar, {"x":[0, 6]}), "a":[0, 2]})
    </div>

The API usage would be::

    $("#jsdemo").interact({language:"javascript"});


``jquery-interact`` for language="Python" or language="Sage"
------------------------------------------------------------

Given many html snippets (with class="cell") of the form::

    <div class="cell">
        @interact
        def _(a=(0,2)):
            show(plot(sin(x*(1+a*x)), (x,0,6)), figsize=4)
    </div>

The API usage would be::

    $(".cell").interact({language:"Python", url:"/notebook/interact"});

And the Codenode / SageNB / etc ``url`` would be the single Resource that the 
``jquery-interact`` plugin would call to get all data for the ``@interact`` cell.



LICENSE
-------
GPL (change to BSD after OK from Sage devs)

``interact`` was originally created by William Stein, 
with work by Jason Grout.  See: http://wiki.sagemath.org/interact
