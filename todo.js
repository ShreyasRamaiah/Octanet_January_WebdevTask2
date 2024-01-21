function addTask() {
    const taskInput = document.getElementById('task-input');
    const prioritySelect = document.getElementById('priority-select');
    const deadlineInput = document.getElementById('deadline-input');
    const labelInput = document.getElementById('label-input');

    if (taskInput.value.trim() === '') {
        alert('Please enter a task.');
        return;
    }

    const taskList = document.getElementById('task-list');

    const li = document.createElement('li');
    const progressInput = document.createElement('input');
    progressInput.type = 'range';
    progressInput.value = 0;
    progressInput.max = 100;
    progressInput.addEventListener('input', () => updateProgressBar(li, progressInput));

    li.innerHTML = `
        <input type="checkbox" class="checkbox" onchange="updateProgress(this)">
        <span>${taskInput.value}</span>
        <span>Priority: ${prioritySelect.value}</span>
        <span>Deadline: ${deadlineInput.value}</span>
        <span>Label: ${labelInput.value}</span>
        <button onclick="deleteTask(this)">Delete</button>
        <div class="progress-bar">
            <div class="progress" style="width: 0;"></div>
        </div>
        <div>
            ${progressInput.outerHTML}
            <span class="progress-percent">0%</span>
        </div>
    `;

    taskList.appendChild(li);

    taskInput.value = '';
    prioritySelect.value = 'low';
    deadlineInput.value = '';
    labelInput.value = '';
}

function deleteTask(li) {
    const ul = li.parentNode;
    ul.removeChild(li);
}

function updateProgressBar(li, progressInput) {
    const progressBar = li.querySelector('.progress');
    const progressPercent = li.querySelector('.progress-percent');

    const progressValue = progressInput.value;
    progressBar.style.width = `${progressValue}%`;
    progressPercent.textContent = `${progressValue}%`;
}

function updateProgress(checkbox) {
    const li = checkbox.parentNode;
    const progressBar = li.querySelector('.progress');
    const progressInput = li.querySelector('input[type="range"]');
    const progressPercent = li.querySelector('.progress-percent');


    if (checkbox.checked) {
        progressBar.style.width = '100%';
        progressInput.value = 100;
        progressPercent.textContent = '100% Progress ✅';
        setTimeout(() => deleteTask(li), 1500); 
    }
    else{
        progressBar.style.width = '0';
        progressInput.value = 0;
        progressPercent.textContent = '0% Progress';
    }
}

document.addEventListener('input', function(event) {
    const target = event.target;

    if (target && target.type === 'range') {
        const li = target.closest('li');
        if (li) {
            updateProgressBar(li, target);
        }
    }
});

function getRandomSoftColor() {
    const letters = '789abc';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 6)];
    }
    return color;
}

function setRandomBackgroundColor() {
    const body = document.body;
    body.style.transition = 'background-color 1s ease';
    const randomColor = getRandomSoftColor();
    body.style.backgroundColor = randomColor;
}

setRandomBackgroundColor();
setInterval(setRandomBackgroundColor, 5000); 