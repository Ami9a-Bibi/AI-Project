const toggleButton = document.getElementById('mode-toggle');
const body = document.body;

toggleButton.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    body.classList.toggle('dark-mode');

    // Update button text based on the current mode
    if (body.classList.contains('light-mode')) {
        toggleButton.textContent = 'Switch to Night Mode';
    } else {
        toggleButton.textContent = 'Switch to Day Mode';
    }
});

// Initialize button text based on the default mode
if (body.classList.contains('light-mode')) {
    toggleButton.textContent = 'Switch to Night Mode';
} else {
    toggleButton.textContent = 'Switch to Day Mode';
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('case-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const caseType = document.getElementById('case-type').value;
        const lawyerDetails = document.getElementById('lawyer-details');

        // Mock data for demonstration purposes
        const lawyers = {
            'child-labor': [
                { name: 'John Doe', winRate: '80%', experience: '10 years' },
                { name: 'James Thompson', winRate: '92%', experience: '16 years' },
                { name: 'Jane Smith', winRate: '75%', experience: '8 years' }
            ],
            'civil-rights': [
                { name: 'Mike Johnson', winRate: '85%', experience: '12 years' },
                { name: 'Emily Davis', winRate: '78%', experience: '9 years' }
            ],
            'criminal-defense': [
                { name: 'Robert Brown', winRate: '90%', experience: '15 years' },
                { name: 'Laura Wilson', winRate: '82%', experience: '11 years' }
            ],
            'family-law': [
                { name: 'William White', winRate: '88%', experience: '13 years' },
                { name: 'Olivia Martin', winRate: '80%', experience: '10 years' }
            ],
            'intellectual-property': [
                { name: 'James Thompson', winRate: '92%', experience: '16 years' },
                { name: 'Sophia Garcia', winRate: '85%', experience: '14 years' }
            ]
        };

        lawyerDetails.innerHTML = '';
        if (lawyers[caseType]) {
            lawyers[caseType].forEach(lawyer => {
                const lawyerDiv = document.createElement('div');
                lawyerDiv.className = 'lawyer';
                lawyerDiv.innerHTML = `
                    <h3>${lawyer.name}</h3>
                    <p>Win Rate: ${lawyer.winRate}</p>
                    <p>Experience: ${lawyer.experience}</p>
                `;
                lawyerDetails.appendChild(lawyerDiv);
            });
        } else {
            lawyerDetails.innerHTML = '<p>No lawyers found for this case type.</p>';
        }
    });
});
