document.addEventListener('DOMContentLoaded', () => {

    let page = 1
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(response => response.json())
    .then(monsterArr => {
        monsterArr.forEach( monsterData => renderMonster(monsterData))
    })

    let monsterContainer = document.querySelector('#monster-container')

    function renderMonster(monsterData) {
        let nameP = document.createElement('p')
        nameP.innerHTML = `Monster: ${monsterData.name}`
        let ageP = document.createElement('p')
        ageP.innerHTML = `Age: ${monsterData.age}`
        let descP = document.createElement('p')
        descP.innerHTML = `Description: ${monsterData.description}`
        let monsterLi = document.createElement('li')
        monsterLi.dataset.id = monsterData.id
        monsterLi.append(nameP, ageP, descP)
        monsterContainer.appendChild(monsterLi)
    }

    const fwdBtn = document.querySelector('#forward')
    fwdBtn.addEventListener('click', (e) => {
        ++page
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then(response => response.json())
        .then(monsterArr => {
        monsterArr.forEach( monsterData => renderMonster(monsterData))
        })
    })

    const backBtn = document.querySelector('#back')
    backBtn.addEventListener('click', (e) => {
        // fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        // .then(response => response.json())
        // .then(monsterArr => {
        // monsterArr.forEach( monsterData => renderMonster(monsterData))
        // })
        for(let i = 0; i < 50; i++) {
            let last = monsterContainer.lastChild;
            last.remove()
        }
    --page
    })

    let form = document.querySelector('#create-monster form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        fetch(`http:localhost:3000/monsters`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json"
            },
            body: JSON.stringify({
                name: `${e.target.name.value}`,
                age: `${e.target.age.value}`,
                description: `${e.target.desc.value}`,
            })
        })
        .then(response => response.json())
        .then(monsterData => {
            alert("What have you done? You've created another monster!");
            renderMonster(monsterData)
        })
        form.reset();
    })




















})//------------------dom load event listener closure