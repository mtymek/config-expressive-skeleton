const getNamesFromContext = context => {
    return context.keys().map(path => {
        const name = context(`${path}`);

        return name.default ? name.default : name.moduleName;
    });
};

const featuresContext = require.context(".", true, /index$/);
const servicesContext = require.context("./services", true, /^((?!test).)*.js$/);
const modelsContext = require.context("./models", true, /^((?!test).)*.js$/);
const filtersContext = require.context("./filters", true, /^((?!test).)*.js$/);
const directivesContext = require.context("./directives", true, /^((?!test).)*.js$/);
const componentsContext = require.context("./components", true, /component$/);

const featureNames = getNamesFromContext(featuresContext);
const serviceNames = getNamesFromContext(servicesContext);
const modelNames = getNamesFromContext(modelsContext);
const filterNames = getNamesFromContext(filtersContext);
const directiveNames = getNamesFromContext(directivesContext);
const componentNames = getNamesFromContext(componentsContext);

export {
    featureNames,
    serviceNames,
    modelNames,
    filterNames,
    directiveNames,
    componentNames
};