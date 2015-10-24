/**
 * This unit test is only an example to check if karma is working.
 * @param  {[type]} 'hello'   [description]
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
describe('hello', function() {
    it('should say hello', function() {
        expect(hello()).toEqual("Hello");
    });

    function hello() {
        return "Hello";
    }
});
