const person = {
    name: 'Василий',
    age: 20,

    work: {
        position: 'Программист',
        solary: 5000
        },

    relatives : {
        father : 'Антон',
        mother: 'Наталья',
        childs : ['Леонид','Марфа']
    }
}
// result = '${person.age} и ${person.age}';
console.log(`Анкета: ${person.name}, ${person.age} лет`);
console.log(`Родители: отец ${person.relatives.father}, мать ${person.relatives.mother}`);
console.log(`Дети: ${person.relatives.childs.join( ' и ')}`);
console.log(`Профессия: ${person.work.position}, зарплата ${person.work.solary} рублей`);

const buttonElement = document.getElementById('button');

buttonElement.addEventListener("mouseover", () => {
    console.log("click");
});

const inputNameElement = document.getElementById('name');

inputNameElement.addEventListener('input', () => {
    console.log('input');
});

