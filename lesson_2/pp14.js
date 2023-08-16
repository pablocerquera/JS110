let obj = {
  grape: { type: 'fruit', colors: ['red', 'green'], size: 'small' },
  carrot: { type: 'vegetable', colors: ['orange'], size: 'medium' },
  apple: { type: 'fruit', colors: ['red', 'green'], size: 'medium' },
  apricot: { type: 'fruit', colors: ['orange'], size: 'medium' },
  marrow: { type: 'vegetable', colors: ['green'], size: 'large' },
};

let cap = word => word[0].toUpperCase() + word.slice(1);

let values = Object.values(obj);

console.log(values.map(ele => {
  if (ele['type'] === 'fruit') {
    return ele['colors'].map(char => cap(char));
  } else {
    return ele['size'].toUpperCase();
  }
}));