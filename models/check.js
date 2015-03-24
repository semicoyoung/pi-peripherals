module.exports = function() {
    var self = this;

    this.adjustments = 0;
    this.items = [];
    this.payment = {
        change: 0,
        tip: 0
    };
    this.subtotal = 0;
    this.taxes = [];
    this.taxTotal = function(self) {
        var sum = 0;
        self.taxes.forEach(function(t) {
            sum += t.amount;
        });

        return sum;
    }
    this.total = 0;
}
