let DefaultValidators =  require('./defaultValidators');
let Validators=DefaultValidators;
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
                    // type checking
                    checkType(value,this[prop.Name + 'Type']);
                    // validator looping

                    for (var validator in this[prop.Name + "Validators"]) {
                        if (this[prop.Name + "Validators"].hasOwnProperty(validator)) {
                            this[prop.Name + "Validators"][validator].Validate(value);
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

function  checkType (valueToCheck,type) {
    if (type==='any'){
        return true;
    }
    if (type===String){
        if(typeof(valueToCheck)==='string'){
            return true;
        }else{
            throw Error("Value you are trying to set is not a string! String is required for this property.");
        }
    }
    if (type===Number){
        if(typeof(valueToCheck)==='number'){
            return true;
        }else{
            throw Error("Value you are trying to set is not a number. Number is required for this property.");
        }
    }
    if (type===Boolean){
        if(typeof(valueToCheck)==='boolean'){
            return true;
        }else{
            throw Error("Value you are trying to set is not a boolean. Boolean is required for this property.");
        }
    }
    if (type===undefined){
        if(valueToCheck===undefined){
            return true;
        }else{
            throw Error("Value you are trying to set is not a undefined. Undefined is required for this property.");
        }
    }
    if (type===Symbol){
        if(typeof(valueToCheck)==='symbol'){
            return true;
        }else{
            throw Error("Value you are trying to set is not a symbol. Symbol is required for this property.");
        }
    }
    if (type===null){
        if(valueToCheck===null){
            return true;
        }else{
            throw Error("Value you are trying to set is not a null. Null is required for this property.");
        }
    }

    if(type===Date){
        if(valueToCheck instanceof Date){
            return true;
        }else{
            throw Error("Value you are trying to set is not a date. Date is required for this property.");
        }
    }



    // check this last!!!!!!!!
    if (type===Object){
        if(typeof(valueToCheck)==='object'){
            return true;
        }else{
            throw Error("Value you are trying to set is not a object. Object is required for this property.");
        }
    }

}
function registerValidator(Validator){
    if(typeof(Validator.Name)==='string' && typeof(Validator.Validate) === 'function'){
        Validators[Validator.Name]=Validator;
    }
}
var Cast = (json,Model) => {
    let model = new Model();
    model.Structure.properties.forEach(function(prop){
        model[prop.Name]=json[prop.Name];
    });
    return model;
}

//exports
module.exports.ModelGenerator = ModelGenerator;
module.exports.Property = Property;
module.exports.registerValidator = registerValidator;
module.exports.Validators=Validators;
module.exports.Cast = Cast;