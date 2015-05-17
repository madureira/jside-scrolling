/**
 * This function is responsible to generate the namespace dynamically.
 *
 * @author madureira
 *
 * @param string object name
 * @param string namespace
 * @param object the object function
 *
 * @return void
 */
Game.define = Game.define || function(clazz, namespace, object) {

    /**
     * Generates an object based on array.
     * # Example
     *      Given: array([0] => 'a', [1] => 'b')
     *      Return: Object({ a: { b: {} } });
     *
     * @param list Array
     *
     * @return object
     */
    function generatesObjectByArray(list) {
        var namespaceTree = {};
        var rootPackage = list[0];

        list.reverse();

        for (var i=0; list.length > i; i++) {
            var tmp = {};

            if (i === 0) {
                var implementation = {};

                switch(rootPackage) {
                    default:
                        implementation = object(function(){});
                }

                tmp[list[i]] = implementation;
            } else {
                tmp[list[i]] = namespaceTree;
            }

            namespaceTree = tmp;
        }

        return namespaceTree;
    }

    /**
     * Creates a namespace or merge if it exist on namespace container tree.
     *
     * @param namespace object
     * @param context object
     *
     * @return object
     */
    function createNamespace(namespace, context) {
        return Game.Helpful.mergeObjects(namespace, context);
    }

    var namespaceList = namespace.split('/');
    namespaceList.push(clazz);

    var newNamespaceObject = generatesObjectByArray(namespaceList);

    Game = createNamespace(newNamespaceObject, Game);

};
