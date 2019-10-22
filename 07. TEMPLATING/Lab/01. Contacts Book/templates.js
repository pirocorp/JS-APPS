//IIFE attaches templates module to given context
(function(scope) {
    const templateStringsCache = {};
    
    //convention: all templates are in dir templates
    //all templates names ends with: -template.hbs
    //this function makes AJAX call for template
    const getTemplateString = async (name) => {
        if(!templateStringsCache[name]){
            const path = `./templates/${name}-template.hbs`;
            const response = await fetch(path);
            const templateString = await response.text();
            templateStringsCache[name] = templateString;
        }

        return templateStringsCache[name];
    };

    //regName is the name by which handlebars will associate current partial
    const registerPartial = async (partialName, templateName) => {
        const templateString = await getTemplateString(templateName);
        Handlebars.registerPartial(partialName, templateString);
    }

    const getTemplateFunc = async (name) => {
        const templateString = await getTemplateString(name);
        return Handlebars.compile(templateString);
    };

    scope.templates = {
        registerPartial,
        getTemplateFunc
    };
})(window);