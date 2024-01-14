let voteCounts = {
    candidate1: 0,
    candidate2: 0,
    candidate3: 0
};


for (const [candidateId, count] of Object.entries(voteCounts)) {
    createCandidateElement(candidateId, `Candidate ${candidateId.charAt(candidateId.length - 1)}`, `images/candidate${candidateId.charAt(candidateId.length - 1)}.jpg`);
}

function addCandidate() {
    const candidateNameInput = document.getElementById('newCandidateInput');
    const candidateName = candidateNameInput.value.trim();

    if (candidateName) {
        const candidateId = `candidate${Object.keys(voteCounts).length + 1}`;
        voteCounts[candidateId] = 0;
        createCandidateElement(candidateId, candidateName);
        updateVoteCounts();
        candidateNameInput.value = ''; 
    } else {
        alert('Please enter a valid candidate name.');
    }
}

function selectCandidate(candidateId) {
    voteCounts[candidateId]++;
    updateVoteCounts();
}

function submitVote() {
    alert('Please select a candidate before voting.');
}

function updateVoteCounts() {
    const voteCountContainer = document.getElementById('voteCountContainer');
    voteCountContainer.innerHTML = '<p>Vote Counts:</p>';

    let totalVotes = 0;

    for (const count of Object.values(voteCounts)) {
        totalVotes += count;
    }

    for (const [candidateId, count] of Object.entries(voteCounts)) {
        const candidateName = document.getElementById(candidateId).getAttribute('data-name');
        const percentage = totalVotes === 0 ? 0 : (count / totalVotes) * 100;
        const voteCountText = `${count} votes for ${candidateName} (${percentage.toFixed(2)}%)`;
        const voteCountParagraph = document.createElement('p');
        voteCountParagraph.textContent = voteCountText;
        voteCountContainer.appendChild(voteCountParagraph);

        const progressBar = document.getElementById(candidateId + '-progress');
        progressBar.style.width = `${percentage}%`;
    }
}

function createCandidateElement(candidateId, candidateName, imageUrl) {
    const candidatesContainer = document.getElementById('candidatesContainer');
    const candidateElement = document.createElement('div');
    candidateElement.className = 'candidate';
    candidateElement.id = candidateId;
    candidateElement.setAttribute('data-name', candidateName);
    candidateElement.onclick = function () {
        selectCandidate(candidateId);
    };

    
    const progressBarContainer = document.createElement('div');
    progressBarContainer.className = 'progress-container';

    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.id = candidateId + '-progress';

    const candidateNameElement = document.createElement('p');
    candidateNameElement.textContent = candidateName;

  
    if (candidateId === 'candidate1') {
        candidateNameElement.textContent = 'PUBG';
    } else if (candidateId === 'candidate2') {
        candidateNameElement.textContent = 'PollProwess';
    } else if (candidateId === 'candidate3') {
        candidateNameElement.textContent = 'BoteValor';
    }

    progressBarContainer.appendChild(progressBar);

    candidateElement.appendChild(candidateNameElement);
    candidateElement.appendChild(progressBarContainer);

    candidatesContainer.appendChild(candidateElement);
}