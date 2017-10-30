let DefaultValidators =  require('./defaultValidators');
let Validators=DefaultValidators;
let Settings = {
    debug: false
};
class Property {
    constructor(name,defaultValue,type,validators){
        if(typeof(name)==='string'){
            this.Name = name;
        }else{
            throw Error("Name property has to be a string");
        }
        if(typeof(type)==='function' || type==='any'){
            this.Type = type;
        }else{
            throw Error("type not recongised")
        }
        if(typeof(Validators)==='object'){
            this.Validators = validators;
        }else{
            throw Error("Validators must be an array");
        }

    }
}
class ModelGenerator {
    constructor(Structure)
    {
        this.Structure=Structure;
        Structure.properties.forEach(function(prop) {
            this['_' + prop.Name]=undefined;
            this[prop.Name + 'Type']=prop.Type;
            this[prop.Name + "Validators"] = prop.Validators;
            Object.defineProperties(this, {
                [prop.Name] : {
                    "get": function() {
                        return this['_' + prop.Name];
                    },
                    "set": function(value) {

                    // convert data
                    let result = converter(value, this[prop.Name + 'Type'], prop.Name);
                    if(result !== false){
                        (Settings.debug)? console.log("Changing " + value + " to " + result + " for " + prop.Name): null;
                        value = result;
                    }

                    let isRequired = false;
                    for (let validator in this[prop.Name + "Validators"]) {
                        if(this[prop.Name + "Validators"][validator].Name == "Required"){
                            isRequired = true;
                        }
                    }
                    if(!isRequired && (value === undefined || value === null)){
                        (Settings.debug)? console.log("Skipped " + prop.Name + " because not required and empty."): null;
                    }else{
                        // type checking
                        checkType(value,this[prop.Name + 'Type'],prop.Name);

                        // validator looping
                        for (let validator in this[prop.Name + "Validators"]) {
                            if (this[prop.Name + "Validators"].hasOwnProperty(validator)) {
                                this[prop.Name + "Validators"][validator].Validate(value,prop.Name);
                            }
                        }
                    }

                    this['_' + prop.Name]=value;
                     }
                }
            });
        }, this);

        // returns clean model that can be returned to the front end
        this.getCleanModel = () =>{
            let ModelToReturn={};
            Structure.properties.forEach(function(prop) {
                ModelToReturn[prop.Name]=this[prop.Name];
            }, this);
            return ModelToReturn;
        }
    }
}

function converter(valueToCheck,type,propName){
    if(type===Date && valueToCheck !== "" && valueToCheck !== null && valueToCheck !== undefined){
        if(valueToCheck instanceof Date){
            return false;
        }else{
            let date = new Date(valueToCheck);
            if(date != "Invalid Date"){
                return date;
            }else{
                throw Error("The value you are trying to set can not be to converted to a date. Date is required for "+ propName +" property.");
            }
        }
    }
    return false;
}

function checkType (valueToCheck,type,propName) {
    if (type==='any'){
        return true;
    }
    if (type===String){
        if(typeof(valueToCheck)==='string'){
            return true;
        }else{
            throw Error("Value you are trying to set is not a string! String is required for "+ propName +" property.");
        }
    }
    if (type===Number){
        if(typeof(valueToCheck)==='number'){
            return true;
        }else{
            throw Error("Value you are trying to set is not a number. Number is required for "+ propName +" property.");
        }
    }
    if (type===Boolean){
        if(typeof(valueToCheck)==='boolean' || valueToCheck === 0 || valueToCheck === 1 || valueToCheck == "0" || valueToCheck == "1"){
            return true;
        }else{
            throw Error("Value you are trying to set is not a boolean. Boolean is required for "+ propName +" property.");
        }
    }
    if (type===undefined){
        if(valueToCheck===undefined){
            return true;
        }else{
            throw Error("Value you are trying to set is not a undefined. Undefined is required for "+ propName +" property.");
        }
    }
    if (type===Symbol){
        if(typeof(valueToCheck)==='symbol'){
            return true;
        }else{
            throw Error("Value you are trying to set is not a symbol. Symbol is required for "+ propName +" property.");
        }
    }
    if (type===null){
        if(valueToCheck===null){
            return true;
        }else{
            throw Error("Value you are trying to set is not a null. Null is required for "+ propName +" property.");
        }
    }

    if(type===Date){
        if(valueToCheck instanceof Date){
            return true;
        }else{
            throw Error("Value you are trying to set is not a date. Date is required for "+ propName +" property.");
        }
    }



    // check this last!!!!!!!!
    if (type===Object){
        if(typeof(valueToCheck)==='object'){
            return true;
        }else{
            throw Error("Value you are trying to set is not a object. Object is required for "+ propName +" property.");
        }
    }

}
function registerValidator(Validator){
    if(typeof(Validator.Name)==='string' && typeof(Validator.Validate) === 'function'){
        Validators[Validator.Name]=Validator;
    }
}
let Cast = (json,Model) => {
    let model = new Model();
    model.Structure.properties.forEach(function(prop){
        if(json[prop.Name]!==undefined || json[prop.Name]!==null){
            model[prop.Name]=json[prop.Name];
        }
    });
    return model;
};
let CastArray= (jsonArray,Model) => {
    let array;
    jsonArray.forEach(function(json){
        array.push(Cast(json,Model));
    },this);
    return array;
};

module.exports = function(settings){
    if(settings !== undefined){
        if(typeof settings.debug === 'boolean'){
            Settings.debug = settings.debug;
        }else{
            throw("Debug setting requires a boolean.");
        }
    }
    return {
        ModelGenerator: ModelGenerator,
        Property: Property,
        registerValidator: registerValidator,
        Validators: Validators,
        Cast: Cast,
        CastArray: CastArray
    };
};