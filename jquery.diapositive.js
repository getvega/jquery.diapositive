$.Diapositive = function (options, element) {
    this.$el = $(element);
    this._init(options);
};

$.Diapositive.defaults = {
    count: 1,
    frameRate: 150
}

$.Diapositive.prototype = {
    _init: function (options) {
        this.options = $.extend(true, {}, $.Diapositive.defaults, options);
        this.timeouts = [];

        var self = this;
        this.$el.mouseenter(function () {
            self.clearTimeouts();
            for (var i = 1; i < self.options.count; i++)
                self.motor.call(self, i, i);
        });
        this.$el.mouseleave(function () {
            self.clearTimeouts();
            for (var i = self.options.count - 1, j = 0; i >= 0, j < self.options.count; i--, j++)
                self.motor.call(self, i, j);
        });
        $(self.$el).css('background-image', "url('" + this.options.src + "')");
    },
    motor: function (i, timer) {
        var self = this;
        var timeout = setTimeout(function () {
            var offset = -self.options.shift * i;
            $(self.$el).css('background-position', offset + 'px 0')
        }, self.options.frameRate * timer);
        this.timeouts.push(timeout);
    },
    clearTimeouts: function () {
        for (var i = 0; i < this.timeouts.length; i++)
            clearTimeout(this.timeouts[i]);
    }
}

$.fn.diapositive = function (options) {
    this.each(function () {
        var instance = $.data(this, 'diapositive');
        if (instance)
            instance._init(options);
        else
            $.data(this, 'diapositive', new $.Diapositive(options, this));
    });
    return this;
}