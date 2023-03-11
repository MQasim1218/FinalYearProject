module.exports = async function getResolvedObjs(Objs) {
    let resolvedObjs = [];
    for await (let obj of Objs) {
        resolvedObjs.push(obj);
        
    }
    return resolvedObjs;
}