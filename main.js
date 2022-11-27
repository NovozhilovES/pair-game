(() => {
    document.addEventListener('DOMContentLoaded', () => {

        let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,30,30,31,31,32,32,33,33,34,34,35,35,36,36,37,37,38,38,39,39,40,40,41,41,42,42,43,43,44,44,45,45,46,46,47,47,48,48,49,49,50,50];
        let finishedArray = [];
        let timer = null;
        const timerStorage = {};
        let firstCard = null;
        let secondCard = null;

        function createPairGame() {
            const headerText = document.createElement('h1');
            const input = document.createElement('input');
            const container = document.createElement('div');
            const containerCard = document.createElement('div');
            const buttonGo = document.createElement('button');
            const form = document.createElement('form');
            const btnReset = document.createElement('button');
            const timerGame = document.createElement('div');
            timerGame.classList.add('timer-style');
            btnReset.classList.add('btn-reset');
            container.classList.add('container');
            containerCard.classList.add('container-card');
            headerText.innerHTML = 'Игра в пары';
            document.body.append(container);
            container.append(form);
            container.append(containerCard);
            container.append(btnReset);
            form.append(headerText);
            form.append(input);
            form.append(timerGame);
            form.append(buttonGo);
            input.placeholder = 'Кол-во карточек по вертикали / горизонтали';
            buttonGo.textContent = 'Играть!'
            btnReset.textContent = 'Играть снова!'
            return {
                headerText,
                form,
                input,
                buttonGo,
                container,
                containerCard
            };
        }

        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
              let j = Math.floor(Math.random() * (i + 1));
              [array[i], array[j]] = [array[j], array[i]];
            }
        }

        const createGame = createPairGame();

        function createArray(finished) {
            let finishNumber = finished;
            let amountNumber = null;
            if(2 <= finishNumber <= 10 && finishNumber % 2 == 0) {
                amountNumber = finishNumber**2;
            } else {
                amountNumber = 4**2;
            }
            for(x = 0; x < numbers.length; x++) {
                if(x < amountNumber) {
                    finishedArray.push(numbers[x]);
                }
            }
            return;
        }

        function createCard() {
            createGame.form.addEventListener('submit', (e) => {
                e.preventDefault();
                let inputValue = createGame.input.value;
                let amountCard = null;
                if(2 <= inputValue && inputValue <= 10 && inputValue % 2 == 0) {
                    amountCard = inputValue**2;
                } else {
                    amountCard = 4**2;
                }
                for(i = 0; i <= amountCard - 1; i++) {
                    let card = document.createElement('div');
                    card.classList.add('card-style');
                    createGame.containerCard.append(card);
                }
                createGame.input.value = ' ';
                createGame.input.disabled = true;
                createArray(inputValue);
                scatterNumber();
                timerGame();
            });
        }

        function scatterNumber() {
            const findCard = document.querySelectorAll('.card-style');
            shuffle(finishedArray);
            const getNumberOfCard = Math.sqrt(finishedArray.length);
            let i = -1;
            findCard.forEach(item => {
                const createNumber = document.createElement('p');
                createNumber.classList.add('card-number-style');
                item.append(createNumber);
                i++;
                createNumber.textContent = finishedArray[i];
                if(getNumberOfCard == 6) {
                    item.classList.add('card-six');
                } else if (getNumberOfCard == 8) {
                    item.classList.add('card-eight');
                } else if (getNumberOfCard == 10) {
                    item.classList.add('card-ten');
                }
                checkCard();
            });
            console.log(finishedArray);
        }

        function checkCard() {
            const clickCard = document.querySelectorAll('.card-style');
            let result = [];
            for (const item of clickCard) {
                item.addEventListener('click', (e) => {
                    result.push(item);
                    item.classList.add('open-card');
                    if(result.length >= 2) {
                        firstCard = result[0].innerText;
                        secondCard = result[1].innerText;
                        if(result.length == 2 && firstCard == secondCard) {
                            result[0].classList.add('open-save-card');
                            result[1].classList.add('open-save-card');
                            result.length = 0;
                        } else if (result.length == 3) {
                            result[0].classList.remove('open-card');
                            result[1].classList.remove('open-card');
                            result[0] = result[2];
                            result.splice(1,2);
                        }
                    }
                    finishGame();    
                });   
            }
        }
        createCard();

        function finishGame() {
            const checkOpenCard = document.querySelectorAll('.open-save-card');
            const allCard = document.querySelectorAll('.card-style');
            const containerReset = document.querySelector('.container');
            const btnResetVisibility = document.querySelector('.btn-reset');
            if(checkOpenCard.length == allCard.length || timerStorage.number == 0) {
                setTimeout(() => {
                        document.body.style.overflow = 'hidden';
                        containerReset.classList.add('reset-game');
                        btnResetVisibility.classList.add('visibility');
                        btnResetVisibility.addEventListener('click', () => {
                        location.reload();
                    }, 500);
                });
            };
        }

        function timerGame() {
            const timerCountdown = document.querySelector('.timer-style');
            timerCountdown.textContent = '960';
            timer = setInterval(() => {
                if(timerCountdown.textContent > 0) {
                    timerCountdown.textContent -=1;
                    timerStorage.number = timerCountdown.textContent;
                } else {
                    clearInterval(timer);
                    finishGame();
                }
            }, 1000);
        }
    })
})();
