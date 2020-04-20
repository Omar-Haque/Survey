class Form{
    constructor(){        
        // Create an element for the title of the webpage
        this.title = createElement('h1', "A Survey to Bring About Change");

        // Create the input box for entering the email
        this.email = createInput("Email");

        // Create the button for starting the survey
        this.button = createButton("Start survey");

        // Create an element for the first question
        this.firstQuestion = createElement('p', "Q1. Do you think we need to have free lunch meals in our school canteen for the kids who are very poor?");

        // Create the radio buttons for the first question
        this.radio1 = createRadio();
        // Add the options for the radio button for the first question
        this.radio1.option('Yes');
        this.radio1.option('No');

        // Create an element for the second question
        this.secondQuestion = createElement('p', "Q2. Would you be willing to contribute a small amount every month for such a program?");

        // Create the radio buttons for the second question
        this.radio2 = createRadio();
        // Add the options for the radio button for the second question
        this.radio2.option('Yes');
        this.radio2.option('No');

        this.emailIndex = null;
    }

    display(){
        this.title.position(500, 100);
        this.email.position(560, 200);
        this.button.position(665, 260);
        this.firstQuestion.position(50, 200);
        this.radio1.position(45, 250);        
        this.secondQuestion.position(50, 300);
        this.radio2.position(45, 350);
    }

    style(){
        this.email.style('textAlign', 'center');
        this.email.style('textSize', '20px');
        this.email.style('fontWeight', 'bold');
        this.email.style('width', '300px');
        this.email.style('height', '20px');
        this.button.style('fontSize', '15px');
        this.button.style('backgroundColor', 'rgb(255, 255, 255)');
        this.firstQuestion.style('fontSize', '20px');
        this.radio1.style('width', '60px');
        this.radio1.style('fontSize', '20px');
        this.secondQuestion.style('fontSize', '20px');
        this.radio2.style('width', '60px');
        this.radio2.style('fontSize', '20px');
    }

    hide(){
        this.firstQuestion.hide();
        this.radio1.hide();
        this.secondQuestion.hide();
        this.radio2.hide();
    }

    updateState(){
        this.button.mousePressed(()=>{
            if(gameState === START){
                this.email.hide();
                this.button.hide();
                gameState = PLAY;
                users.push(this.email.value());
            }
            peopleCount += 1;
        });
    }

    StartSurvey(){
        if(gameState === PLAY){
            this.firstQuestion.show();
            this.radio1.show();
            this.secondQuestion.show();
            this.radio2.show();
        }
        console.log(users);
    }

    updateEmail(){
        this.emailIndex = this.email.value();
        var emailref = database.ref('emails/' + peopleCount);
        emailref.ref.update({
            email: this.emailIndex
        });
    }

    updateCount(){
        var countRef = database.ref('/');
        countRef.ref.update({
            peopleCount: peopleCount
        })
    }

    assignCount(){
        var countRef = database.ref('peopleCount');
        countRef.on("value", (data)=>{
            peopleCount = data.val();
        })
    }
}