const btn1 = document.querySelectorAll('.wrapperBtn .parentBtn .click');
const btn2 = document.querySelectorAll('.wrapperBtn2 .parentBtn2 .click');
const select = document.querySelectorAll('.selectCurrency');
const arrowPicture = document.querySelector('.arrowPicture');
const preLoader = document.querySelector('.preLoader');
let inputCurrAmount = document.querySelector('.wrapperInpt input');
inputCurrAmount.value = 1;
let inputCurrRates = document.querySelector('.wrapperInpt2 input');
let textInInpt1 = document.querySelector('.wrapperBtn  .textInBottom1');
let textInInpt2 = document.querySelector('.wrapperBtn2 .textInBottom2');
let value1 = 'RUB';
let value2 = 'USD';

function changeBtnTab(btn, side) {
    btn.forEach((item) => {
        item.addEventListener('click', (event) => {
            if (side === 1) {
                value1 = item.innerHTML;
            } else {
                value2 = item.innerHTML;
            }

            preLoader.style.display = 'flex';
            fetch(`https://api.exchangerate.host/latest?base=${value1}&symbols=${value2}&amount=${inputCurrAmount.value}`)
                .then((res) => {
                    return res.json()
                })

                .then((data) => {
                    preLoader.style.display = 'none';
                    const rates = data.rates;
                    inputCurrRates.value = rates[value2];
                    let res1 = rates[value2];
                    textInInpt1.innerText = `${value1} = ${res1 / inputCurrAmount.value}`;
                    textInInpt2.innerText = `${value2} = ${inputCurrAmount.value / res1}`;
                })

            btn.forEach((item) => {
                item.style.backgroundColor = 'white';
            })

            event.target.style.backgroundColor = '#833AE0';
            select[side - 1].style.backgroundColor = 'white';
        })
    })
}

changeBtnTab(btn1, 1);
changeBtnTab(btn2, 2);

const currencies = ['HKD', 'IDR', 'ILS', 'DKK', 'INR', 'CHF', 'MXN', 'CZK', 'SGD', 'THB', 'HRK', 'MYR', 'NOK', 'CNY', 'PHP', 'SEK', 'PLN', 'ZAR', 'CAD', 'ISK',
    'BRL', 'RON', 'NZD', 'TRY', 'JPY', 'KRW', 'HUF', 'AUD'
];

currencies.forEach((elem) => {
    let option = document.createElement('option');
    option.innerHTML = elem;
    select[0].append(option);
})

currencies.forEach((elem) => {
    let option = document.createElement('option');
    option.innerHTML = elem;
    select[1].append(option);
})

preLoader.style.display = 'flex';
fetch(`https://api.exchangerate.host/latest?base=${value1}&symbols=${value2}&amount=${inputCurrAmount.value}`)
    .then((res) => {
        return res.json()
    })

    .then((data) => {
        preLoader.style.display = 'none';
        const rates = data.rates;
        inputCurrRates.value = rates[value2];
    })

inputCurrAmount.addEventListener('keyup', (event) => {
    if (inputCurrAmount.value > 1) {
        let rate = 0;
        preLoader.style.display = 'flex';
        fetch(`https://api.exchangerate.host/latest?base=${value1}&symbols=${value2}&amount=${inputCurrAmount.value}`)
            .then((res) => {
                return res.json();
            })
            .then((obj) => {
                preLoader.style.display = 'none';
                rate = obj.rates;
                const result = rate[value2];
                inputCurrRates.value = result;
            })
    }
})

select.forEach((item, index) => {
    item.addEventListener('change', (event) => {

        if (event.target.name === 'selectCurrency') {
            value1 = event.target.value;
        } else if (event.target.name === 'selectCurrency2') {
            value2 = event.target.value;
        }

        preLoader.style.display = 'flex';
        fetch(`https://api.exchangerate.host/latest?base=${value1}&symbols=${value2}`)

            .then((res) => {
                return res.json();
            })

            .then((data) => {
                preLoader.style.display = 'none';
                inputCurrRates.value = data.rates[value2];
                let res1 = data.rates[value2];
                textInInpt1.innerText = `${value1} = ${res1 / inputCurrAmount.value}`;
                textInInpt2.innerText = `${value2} = ${inputCurrAmount.value / res1}`;
            })

        item.style.backgroundColor = '#833AE0';

        if (index === 0) {
            btn1.forEach((buttonOfRightSide) => {
                buttonOfRightSide.style.backgroundColor = 'white';
            })
        } else if (index === 1) {
            btn2.forEach((buttonOfLeftSide) => {
                buttonOfLeftSide.style.backgroundColor = 'white';
            })
        }
    })

})

arrowPicture.addEventListener('click', (event) => {

    let newVal = value2
    value2 = value1;
    value1 = newVal;

    preLoader.style.display = 'flex';
    fetch(`https://api.exchangerate.host/latest?base=${value1}&symbols=${value2}&amount=${inputCurrAmount.value}`)
    .then((res) => {
        return res.json();
    })
    .then((obj) => {
        preLoader.style.display = 'none';
        rate = obj.rates;
        const result = rate[value2];
        inputCurrRates.value = result;
    })

    if(select[0].style.backgroundColor === 'rgb(131, 58, 224)' && select[1].style.backgroundColor === 'rgb(131, 58, 224)'){
        let newVal = select[0].value
        select[0].value = select[1].value
        select[1].value = newVal
    }
    else if(select[0].style.backgroundColor === 'rgb(131, 58, 224)'){
        select[1].value = select[0].value
        select[0].style.backgroundColor = 'white'
        select[1].style.backgroundColor = 'rgb(131, 58, 224)'
    } else if (select[1].style.backgroundColor === 'rgb(131, 58, 224)') {
        select[0].value = select[1].value
        select[1].style.backgroundColor = 'white'
        select[0].style.backgroundColor = 'rgb(131, 58, 224)' 
    }


    btn1.forEach((item) => {
        item.style.backgroundColor = 'white';
        if(item.innerHTML === value1)
            item.style.backgroundColor = '#833AE0';   
    })

    btn2.forEach((item) => {
        item.style.backgroundColor = 'white';
        if(item.innerHTML === value2)
            item.style.backgroundColor = '#833AE0';   
    })

})