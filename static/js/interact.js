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

(function($) {

    function Interact(target, options_) {
        var options = {
            language: "javascript" 
        };
        var inid = target.attr("id") + "_interact_input";
        var evalid = target.attr("id") + "_interact_eval";
        var outid = target.attr("id") + "_interact_output";
        var plot = this;
        /* public functions */
        plot.run = run;
    
        /* initialize */
        init(target, options_);

        function run() {
            console.log("run ", this);
        };

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

        function do_interact(evt){
            console.log("do_interact", evt);
            /*  
                #1 inspect of definition args 
                #2 inspect callee args 
                #3 cache vals from #1,#2
                #4 create _input_boxs and _sliders_ based on #1 and set vals with #2
                #5 set event handlers on #4
                #6 handle events be re-evaluting cache input function with new args+ranges
            */
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
            /*
            function bar(vars) {
              return Math.sin(vars.x) + Math.cos(vars.y);
            }
        
            bar(0, 1) // display just input fields
            bar(0, 1, {q=[1, 100], r=[5, 10]}) // vars and ranges
            */
            var f = $(evt.target).val();
            try {
                eval("newf = "+f);
                console.log("getargspec ", getargspec(newf));
                console.log("inspect ", f, newf);
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
