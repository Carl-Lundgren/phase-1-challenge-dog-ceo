//console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', () => {
    const dogImages = document.querySelector('#dog-image-container');
    const dogBreeds = document.querySelector('#dog-breeds');
    const selectBreed = document.querySelector('#breed-dropdown');

    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'

    let sorted = 0;

    const fetchCompiler = (target, callBack) => {
        fetch(`${target}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            callBack(json);
        });
    }

    const compileDogImage = (json) => {
        for(const number in json.message) {
            const image = document.createElement('img');
            image.src = `${json.message[number]}`;
            image.alt = 'Cute dog';
            image.height = 250;
            dogImages.append(image);
        }
    }

    function compileBreed(target) {
        for (const key in target.message) {
            const li = document.createElement('li');
            li.innerText = `${key}`;
            if (typeof target === 'object' && target.message[key].length !==0) {
                for (num of target.message[key]) {
                    const nestedUl = document.createElement('ul');
                    const variant = document.createElement('li');
                    variant.innerText = `${num}`
                    nestedUl.append(variant);
                    li.append(nestedUl);
                    colorChanger(variant, '#0000FF');
                }
            }
            if (sorted <= 1){
                dogBreeds.append(li);
            } else if (key.charAt(0) === selectBreed.value){
                dogBreeds.append(li);
            }
            colorChanger(li, '#FF0000');
        }
    } 
    
    function colorChanger(target, newColor) {
        target.addEventListener('click', (e) => {
            target.style.color = `${newColor}`;
        });
    }

    selectBreed.addEventListener('change', () => {
        dogBreeds.innerHTML = '';
        sorted = 2;
        fetchCompiler(breedUrl, compileBreed);
    });
        

    fetchCompiler(imgUrl, compileDogImage);
    fetchCompiler(breedUrl, compileBreed);
});

