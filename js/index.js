
const body = document.querySelector('body');
const footer = document.createElement('footer');


body.appendChild(footer);


const today = new Date();
const thisYear = today.getFullYear();


const copyright = document.createElement('p');

copyright.innerHTML = `&copy; Naomi Rodriguez ${thisYear}`;


footer.appendChild(copyright);




const skills = ['JavaScript', 'HTML', 'CSS', 'Git', 'GitHub'];


const skillsSection = document.querySelector('#skills');
const skillsList = skillsSection.querySelector('ul');


for (let i = 0; i < skills.length; i++) {
    const skill = document.createElement('li');
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
}



const messageForm = document.forms['leave_message'];


messageForm.addEventListener('submit', function(event) {
    
    event.preventDefault();

  
    const nameValue = event.target.userName.value;
    const emailValue = event.target.userEmail.value;
    const messageValue = event.target.userMessage.value;

    
    console.log('Form Submitted:', { nameValue, emailValue, messageValue });

  

    
    const messageSection = document.querySelector('#messages');
    
    const messageList = messageSection.querySelector('ul');

    
    const newMessage = document.createElement('li');

   
    newMessage.innerHTML = `
        <a href="mailto:${emailValue}">${nameValue}</a> 
        <span>wrote: ${messageValue}</span>
    `;

    
    const removeButton = document.createElement('button');
    removeButton.innerText = 'remove';
    removeButton.setAttribute('type', 'button');

    
    removeButton.addEventListener('click', function(e) {
        
        const entry = e.target.parentNode;
        
        entry.remove();
    });

    
    newMessage.appendChild(removeButton);

    
    messageList.appendChild(newMessage);

    
    messageForm.reset();
});
