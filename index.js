const newMemberInput = document.querySelector('#participantInput');
const addMemberBtn = document.querySelector('#addMemberBtn');
const membersDisplay = document.querySelector('#membersDisplay')
const decreaseTeamNum = document.querySelector('#decreaseTeamNum')
const increaseTeamNum = document.querySelector('#increaseTeamNum')
const teamCardsDisplay = document.querySelector('#teamCardsDisplay');
const assignBtn = document.querySelector('#assignBtn')
const currentParticipants = [];
const currentTeamsArray = [];
let currentTeamsNum = 0;

const renderParticipants = (arr) => {
    membersDisplay.innerHTML = '';
    for(participant of currentParticipants) {
        membersDisplay.innerHTML += `<li class='list-item'>${participant}</li>`
    }
}

const renderTeamCards = (teamsArr) => {
    teamCardsDisplay.innerHTML = '';
    if(teamsArr.members) {

    }
    for(team of teamsArr) {
        const newCard = document.createElement('div')
        newCard.classList.add('team-card')
        newCard.innerHTML = `<p class="team-display">Team <span class="teamNumberDisplay">${team.teamNumber}</span>`
        const membersList = document.createElement('div')
        membersList.classList.add('team-members-container')

        if(team.members) {
            for(member of team.members) {
                const newMember = document.createElement('li');
                newMember.classList.add('list-item')
                newMember.innerText = member;

                membersList.appendChild(newMember);
            }
        }

        newCard.appendChild(membersList);
        teamCardsDisplay.appendChild(newCard)
    }

}

const addTeamCard = (teamsNum) => {
    teamCardsDisplay.innerHTML = '';

    currentTeamsArray.push({teamNumber: currentTeamsNum, members: [], leader: null})
    renderTeamCards(currentTeamsArray)
}

const removeTeamCard = () => {
    currentTeamsArray.pop();
    renderTeamCards(currentTeamsArray)
}

const assignToTeam = (participant) => {
    const randomTeam = Math.floor(Math.random() * currentTeamsArray.length);

    if(!(currentTeamsArray[randomTeam].members.length >= 3)) {
        currentTeamsArray[randomTeam].members.push(participant)
    } else {
        assignToTeam(participant)
    }
}

addMemberBtn.onclick = () => {
    const inputValue = newMemberInput.value;
    currentParticipants.push(inputValue);
    console.log(currentTeamsArray)
    renderParticipants(currentParticipants)    
}

increaseTeamNum.onclick = () => {
    currentTeamsNum++;
    addTeamCard(currentTeamsNum)
}

decreaseTeamNum.onclick = () => {
    currentTeamsNum--
    removeTeamCard();
}

assignBtn.onclick = () => {
    const removed = currentParticipants.pop()
    renderParticipants()

    assignToTeam(removed)
    renderTeamCards(currentTeamsArray)
}