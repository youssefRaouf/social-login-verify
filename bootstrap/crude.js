import {promises as fs} from 'fs';

String.prototype.replaceAll = function(match, val) {
    let str = this;
    str = str.split(match).join(val);
    return str;
}
const routesPath = `${__dirname}/../src/routes`;
const controllersPath = `${__dirname}/../src/controllers`;
const modelsPath = `${__dirname}/../src/models`;

export default class Crude {
    constructor(app){
        app.post('/crude', async (req, res) => {
           const {name, props} = req.body;
           const nameCapital = name[0].toUpperCase()+ name.split(name[0])[1];
           // routes
           const routesContent = await fs.readFile(`${routesPath}/entity.js`, {encoding: 'utf-8'})
           const routes = routesContent.replaceAll('entity', name.toLowerCase()).replaceAll('Entity', nameCapital)
           await fs.writeFile(`${routesPath}/${name.toLowerCase()}.js`, routes, {encoding: 'utf-8'});
           // controller
           const controllerContent = await fs.readFile(`${controllersPath}/entity.js`, {encoding: 'utf-8'})
           const controller = controllerContent.replaceAll('entity', name.toLowerCase()).replaceAll('Entity', nameCapital)
           await fs.writeFile(`${controllersPath}/${name.toLowerCase()}.js`, controller, {encoding: 'utf-8'});
           // model
           const modelContent = await fs.readFile(`${modelsPath}/entity.js`, {encoding: 'utf-8'})
           const model = modelContent.replaceAll('entity', name.toLowerCase()).replaceAll('Entity', nameCapital).replaceAll('{}', JSON.stringify(props));
           await fs.writeFile(`${modelsPath}/${name.toLowerCase()}.js`, model, {encoding: 'utf-8'});
           res.json({success: true});
        });
    }
}
