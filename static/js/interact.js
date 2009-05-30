Function.prototype.method = function(name, func) {
    this.prototype[name] = func;
    return this;
};

Function.method('before', function(beforeFunc) {
    var that = this;
    console.log(" == before == ", this, arguments);
    return function() {
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
    
        function createInput(target){
            target.append($("<textarea rows='10' cols='50'>").attr("id", inid));; //XXX temp
            target.append($("<div>").attr("id", outid));
        };

        function bindEvents(){
            var inid = target.attr("id") + "_interact_input";
            console.log(inid);
            $("#"+inid).dblclick(inspect);
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
