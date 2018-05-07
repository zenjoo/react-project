
import TestModel from 'bundle-loader?lazy&name=test!./test';

let TestRoutes = [
    {
        path: '/qinpu/test',
        component: TestModel
    }
]
TestRoutes=TestRoutes.concat();

export default TestRoutes;


