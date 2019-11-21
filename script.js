/**********

  This Pen uses no libraries except fonts and should 
  work on all modern browsers
  
  The answers are stored in the `questions` array
  with the key `answer`. 
  

 **********/

var questions = [
  {question:"What's your full name?"},
  {question:"Do you want the plans to include the dependents?",type:"options",options:['Yes','No']},
//   {question:"What's your email?", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/},
   {question:"Enter employee number?"},
//   {question:"Create your password", type: "password"}
{question:"Enter your annual coverage maximum for every member."},
{question:"",type:"options",options:['Enter average age values for estimated prices','Enter full data to get the actual price']},
{question:"Enter the average age.",type:"specefic",circle:0,questionIndex:4},
{question:"Upload the template",type:"specefic",type2:"fileupload",circle:1,questionIndex:4}
]

/*
  do something after the questions have been answered
*/
var onComplete = function() {

    var h1 = document.createElement('h1')
    h1.appendChild(document.createTextNode('Thanks ' + questions[0].answer + ', We will email you.'))
    setTimeout(function() {
      register.parentElement.appendChild(h1)
      setTimeout(function() { h1.style.opacity = 1 }, 50)
    }, 1000)
}

;(function(questions, onComplete) {

    var tTime = 100 // transition transform time from #register in ms
    var wTime = 200 // transition width time from #register in ms
    var eTime = 1000 // transition width time from inputLabel in ms

    // init
    // --------------
    if (questions.length == 0) return

    var position = 0 //iterator through questions 

    putQuestion()

    forwardButton.addEventListener('click', validate)
    inputField.addEventListener('keyup', function(e) {
        transform(0, 0) // ie hack to redraw
        if (e.keyCode == 13) validate()
    })

    previousButton.addEventListener('click', function(e) {
        if (position === 0) return
        position -= 1
        hideCurrent(putQuestion,position+1)
    })



    // functions
    // --------------

    // load the next question
    function putQuestion() {
        if(questions[position].type=='specefic'){
            if(questions[position].circle!=questions[questions[position].questionIndex].answer){
                inputField.validate = "fakevaluetopassvalidation";
                validate();
                return;
            }else{
                if(questions[position].type2=='fileupload'){
                              //make these disappear 
                      inputLabel.style.display = "none";
                 forwardButton.style.display = "";
                      inputProgress.style.display = "none";
                      inputField.style.display = "none";



                       var container = document.createElement("div");
                       container.className = "image-upload";

                      var label = document.createElement("label");
                      label.setAttribute("for","file-input");

                      var img = document.createElement("img");
                      img.setAttribute("src","https://goo.gl/pB9rpQ");

                      label.appendChild(img);

                      var uploadfile = document.createElement("input");
                      uploadfile.setAttribute("type","file");
                      uploadfile.setAttribute("id","file-input"); 


                      container.appendChild(label);

                     container.appendChild(uploadfile);



                     
                      inputContainer.appendChild(container);

                      inputField.validate = "fakevaluetopassvalidation";

                }
            }
        }
        else if (questions[position].type == "options") {
          //add optional question with button like yes or no questions

          //make these disappear 
          inputLabel.style.display = "none";
          forwardButton.style.display = "none";
          inputProgress.style.display = "none";
          inputField.style.display = "none";


          var textQuestion = document.createElement("h3");
          var textNode = document.createTextNode(questions[position].question); // Create a text node
          textQuestion.appendChild(textNode); 
          textQuestion.setAttribute("id","textQuestion");
          inputContainer.appendChild(textQuestion);
           inputContainer.style.textAlign =  "center";

           //add options as buttons 
           questions[position].options.forEach((option,i)=>{
            var tempButton = document.createElement("button");
            var textButtonNode = document.createTextNode(option); // Create a text node
            tempButton.appendChild(textButtonNode); 

            tempButton.classList.add("optionBtn");

            tempButton.setAttribute("id",i); //put id as key option 

            inputContainer.appendChild(tempButton);


            //user took action to choose 
            tempButton.addEventListener("click",function(e){
            
            questions[position].answer = e.target.id; 

            inputField.validate = "fakevaluetopassvalidation";


              validate();

            })
            

           })
          
        } else {
          inputLabel.innerHTML = questions[position].question;
          inputField.type = questions[position].type || "text";
          inputField.value = questions[position].answer || "";
          
          inputField.focus();

          showCurrent()

        }

        // set the progress of the background
        progress.style.width = position * 100 / questions.length + '%'

        previousButton.className = position ? 'ion-android-arrow-back' : 'ion-person'

        inputContainer.style.opacity = 1

    }

    // when submitting the current question
    function validate() {

        // var validateCore = function() {      
        //   return inputField.value.match(questions[position].pattern || /.+/)
        // }

        // if (!questions[position].validate) questions[position].validate = validateCore

        // check if the pattern matches
        // if (!questions[position].validate()) wrong(inputField.focus.bind(inputField))
        if(inputField.value=='')  wrong(inputField.focus.bind(inputField))
        else ok(function() {

            // execute the custom end function or the default value set
            if (questions[position].done) questions[position].done()
            else questions[position].answer = questions[position].type=="options"
            ?questions[position].answer:
            inputField.value   //put the answer in js object 

            ++position

            // if there is a new question, hide current and load next
            if (questions[position]) hideCurrent(putQuestion,position-1)
            else hideCurrent(function() {
                // remove the box if there is no next question
                register.className = 'close'
                progress.style.width = '100%'

                onComplete()
              
            },position-1)

        })

    }


    // helper
    // --------------

    function hideCurrent(callback,pos) {

        if(questions[pos].type=="options"){
                    //removeoptionform 
                textQuestion.remove();

                document.querySelectorAll('.optionBtn').forEach(function(btn) {
                                btn.remove();
                });
        }
        

        inputContainer.style.opacity = 0
        inputLabel.style.marginLeft = 0
        inputProgress.style.width = 0
        inputProgress.style.transition = 'none'
        inputContainer.style.border = null
        setTimeout(callback, wTime)
    }

    function showCurrent(callback) {
        inputLabel.style.display = "";
        forwardButton.style.display = "";
         inputProgress.style.display = "";
        inputField.style.display = "";

        inputProgress.style.transition = ''
        inputProgress.style.width = '100%'
        setTimeout(callback, wTime)
    }

 

    function transform(x, y) {
        register.style.transform = 'translate(' + x + 'px ,  ' + y + 'px)'
    }

    function ok(callback) { //if the answer is ok 
        register.className = ''
        setTimeout(transform, tTime * 0, 0, 10)
        setTimeout(transform, tTime * 1, 0, 0)
        setTimeout(callback, tTime * 2)
    }

    function wrong(callback) {
        register.className = 'wrong'
        for (var i = 0; i < 6; i++) // shaking motion
            setTimeout(transform, tTime * i, (i % 2 * 2 - 1) * 20, 0) //goes from 20 to -20 and from -20 to 20
        setTimeout(transform, tTime * 6, 0, 0) //back again to current state which is zero 
        setTimeout(callback, tTime * 7) //
    }

}(questions, onComplete))
