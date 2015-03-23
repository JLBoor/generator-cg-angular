describe('The <%= _.camelize(name) %>', function() {

    var <%= _.camelize(name) %>;

    beforeEach(module('<%= appname %>'));
    beforeEach(inject(function(_<%= _.camelize(name) %>_) {
        <%= _.camelize(name) %> = _<%= _.camelize(name) %>_;
    }));

    it('should have some unit tests', function() {
        expect(true).toBe(false);
    });

});
