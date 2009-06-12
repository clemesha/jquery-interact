/*

Interact
========
Create well defined API points to plug/mix-and-match:
    * Input type (Javascript OR Python / Sage )
    * Plotting Type [Client (e.g. flot) or Server (e.g. matplotlib)]

All Input Forms and Sliders *must* be created in Client (javascript).


Interact for Javascript
=======================

Example 
--------

--------- Javascript -----------
<pre id="elem">

function bar(a, x) {
  return Math.sin(x*(1 + a*x));
}
interact(plot(bar, {"x":[0, 6]}), "a":[0, 2]})

</pre>

--------- Javascript -----------
$("#elem").interact({language:javascript"});


Steps need to create interact
------------------------------
#1 inspect of definition args => find function by 'interact' call. 
#2 inspect callee args: === MUST be Object?, must have at least 1 var be list==== 
#3 cache vals from #1,#2
#4 create Input Forms and Sliders based on #1 and set vals with #2
#5 set event handlers on #4
#6 handle events be re-evaluting cache input function with new args+ranges


Interact for Python
===================

TODO



*/

Function.prototype.method = function(name, func) {
    this.prototype[name] = func;
    return this;
};

Function.method('before', function(beforeFunc) {
    var that = this;
    o = arguments;
    console.log(" == before == ", this, arguments);
    return function() {
        /*var result = 
        console.log(" == result == ", result);*/
        beforeFunc.apply(null, arguments);
        return that.apply(null, arguments);
    };
});

Function.method('after', function(afterFunc) {
    var that = this;
    return function() {
        var result = that.apply(null, arguments);
        afterFunc.apply(null, arguments);
        return result;
    };
});


/*

*/

(function($) {

    function Interact(target, options_) {
        var options = {
            language: "javascript" 
        };
        var inid = target.attr("id") + "_interact_input";
        var evalid = target.attr("id") + "_interact_eval";
        var outid = target.attr("id") + "_interact_output";
        /* public functions */
        this.plot = _plot;
        this.interact = _interact;
    
        /* initialize */
        init(target, options_);

        function init(target, opts){
            $.extend(options, opts); //update default options with user options.
            createInput(target); //IO elements, XXX make more general
            bindEvents();
        };
    
        function createInput(target){ //XXX temporary - will generalize
            target.append($("<textarea rows='4' cols='50'>").attr("id", inid));
            target.append($("<p>&nbsp;</p>"));
            target.append($("<textarea rows='1' cols='50'>").attr("id", evalid));
            target.append($("<div>").attr("id", outid));
        };

        function bindEvents(){
            $("#"+inid).dblclick(inspect);
            $("#"+evalid).dblclick(do_interact);
        };

        function plot(func, args) {
            console.log("plot args: ", arguments);
            console.log(typeof(func), typeof(args));
            return function(){}
        };

        function func_data_list(func, min, max, step) {
            /* Return list of (i, func(i)) for
            a given range, with a given step size*/
            var data = []; 
            for (var i = min; i < max; i += step) {
                data.push([i, func(i)]); 
            };
            return data;
        };

        function _interact() {
            console.log("interact args: ", arguments);
        };

        function do_interact(evt){
            var f = $(evt.target).val();
            console.log("do_interact", evt);
            console.log("newf", newf);
            console.log("getargspec ", getargspec(newf));
        };

        function getargspec(func){
            /* Inspect arguments of the function func */
            var reg = /\(([\s\S]*?)\)/;
            var params = reg.exec(func);
            if (params) {
                var param_names = params[1].split(',');
            } else {
                return [];
            }
            return param_names;
        };

        function inspect(evt){
            var f = $(evt.target).val();
            try {
                eval("newf = "+f); //XXX eval and inspect namespace to get name
            } catch(exception){
                console.warn("eval failed.  exception: ", exception);
            }
        };

    }
        
    $.fn.interact = function(options) {
        var interact = new Interact(this, options);
        return interact;
    };

})(jQuery);
