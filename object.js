//create object using literal syntax
const personalLiteral = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    occupation: "Developer"
    fullName: function() {
        return this.firstName + " " + this.lastName;
    }
};
console.log("Object Literal:",);
console.log(personalLiteral.fullName());
console.log(personalLiteral.age);

//create object by creating an instance directly

const personalInstance = new Object();
personalInstance.firstName = "Jane";
personalInstance.lastName = "Smith";
personalInstance.age = 25;
personalInstance.occupation = "Designer";
personalInstance.fullName = function() {
    return this.firstName + " " + this.lastName;
};
console.log('\n Creating Instance;');
console.log(personalInstance.fullName());
console.log(personalInstance.occupation);


function Personal(firstName, lastName, age, occupation) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.occupation = occupation;
    this.fullName = function() {
        return this.firstName + " " + this.lastName;
    };
}

