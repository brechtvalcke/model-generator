# Model generator
 Model generator is a simple model generator tool that enables you to create models with types and validators.
## How to use
### install model-generator
Run install command to install model-generator.

``` npm install model-generator ```
### import model-generator

The module has differend exports. Best practice is to put these in differend variables.


``` javascript

let ModelGeneratorModule = require('model-generator');
let ModelGenerator = ModelGeneratorModule.ModelGenerator;
let Property = ModelGeneratorModule.Property;
let Validators = ModelGeneratorModule.Validators;
```
### Create your model
Create a class and extend it with the ModelGenerator class. Create a constructor and then call super(<=StructureForYourModel=>).
``` javascript

class ExampleModel extends ModelGenerator {
    constructor() {
        super(StructureForYourModel);
    }
}
```
### Structure
 Model generator generates a model using a structure. A structure is how your model will be generated.
 A structure takes an array of type Property.
 Example structure:
``` javascript

const ExampleModelStructure = {
    // array of all properties you want in your model
    properties: [
        new Property(
            'UserEmail',// property name
            undefined, // default value
            String, // type
            [Validators.Required, Validators.Email] // Array of validators
        ),
        new Property(
            'Test',
            undefined,
            Number,
            []
        )
    ]
};
``` 

### Property
This module has an exported class Property.
Property class can be used in the structure to define a property.

Property takes 4 arguments:
1. Name : name of the property that needs to be generated
2. Default value: the default value the property gets when you initialize the object.
3. Type: Type of property(String , Number ,...)
4. Validators : An array of all validators that need to run when you set a value on the property.
#### Property setting and getting
Properties are normal properties that automaticly run all validators and type checking. Use it like you would a normal property

``` javascript

Model.Property = "value"; // setting property runs all validators in the background
let model = Model.Property;

```
### Validator

Validator is a check that needs to happen when a value is set on a property. Validators Need 2 Properties to work:
* Name: Name of the validator is the name you can use in the validators array. (example : Validators.Email has name 'Email') Must be a string!
* Validate : This function gets called when the validator is used. This function returns true or throws error.
#### Default validators
Here is a list of all validators that are available in the Validators array by default:
* Required : Makes sure the property is required
* Email : Makes sure the property is an email
* Name : Alphabetic letters with accents
* DefaultPassword : Length: 8 to 128, with at least 1 lowercase, 1 capital, 1 number and/or symbol. https://goo.gl/dufj6t
* LettersOnly : Alphabetic letters, lowercase or uppercase
* NumbersOnly : Only numbers
* Base64 : Lowercase, uppercase, hyphen and underscore
* NationalRegistryNumberBE : National registry number for in belgium
#### Register a custom validator
Need more validators? No problem you can inject your own validator using registerValidator.

``` javascript

let ModelGeneratorModule = require('model-generator');
// create validator
NotNegativeValidator = {
    Name : 'NotNegative',
    Validate : (value) => {
       if(value<=0){
           throw Error("Value can not be negative");
       }
       return true;
    }

}
// register Validator
ModelGeneratorModule.registerValidator(NotNegativeValidator);

```
When you add a validator it gets added to the ```ModelGeneratorModule.Validators```
The example above can be used like this:
``` javascript

New Property(
    'TestNumber',
    0,
    Number,
    [Validators.NotNegative]
)
```
## Get clean model in json format

The generated model is bloated with properties and functions. Sometimes you need to return a model that is a clean javascript object without setters and getters. The getCleanModel is a function set on the generated model that returns the json model.

## Casting in model
You can cast a json format into a Model using the exported member Cast.
The function will throw error if it fails and return a model if it succeeds.

``` javascript
let Cast = require('./ModelGeneratorModule').Cast;
let Model = <= Insert your model here =>
json = {
    Prop1:1,
    Prop2:'test',
}
Cast(json,Model)
```



## Full example of a model
``` javascript

let ModelGeneratorModule = require('./ModelGeneratorModule');
let ModelGenerator = ModelGeneratorModule.ModelGenerator;
let Property = ModelGeneratorModule.Property;
let Validators = ModelGeneratorModule.Validators;

const ExampleModelStructure = {
    properties: [
        new Property(
            'UserEmail',//property name
            undefined, // default value
            String, // type
            [Validators.Required, Validators.Email] // Array of validators
        ),
        new Property(
            'Test',
            undefined,
            Number,
            []
        )
    ]
};
class ExampleModel extends ModelGenerator {
    constructor() {
        super(ExampleModelStructure);
    }
}
```
