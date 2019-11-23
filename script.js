// the call up girl data 
const imgUrl1 = "blob/master/img/happy.png";
const imgUrl2 = "blob/master/img/help.png";
const imgUrl3 = "blob/master/img/nice.png";

const dialogues = [
    {imgsrc:imgUrl2,posLeft:"150px",posTop:"40px",
    msg:'Hi! I am mona <br/> I am here to help you <br/>let us begin our journey.<br/> first let us know you.'},
    {imgsrc:imgUrl3,posLeft:"150px",posTop:"30px",
    msg:"Let us know your company better <br/> if you want to include your employees families <br/> just press yes."},
    {imgsrc:imgUrl3,posLeft:"150px",posTop:"0px",
    msg:"Please provide us for <br/> the range of the <br/>employees number. "},
    {imgsrc:imgUrl3,posLeft:"150px",posTop:"30px",
    msg:"Enter in egyptian pound <br/> please enter the annual coverage <br/>for every person and every dependent"},
    {imgsrc:imgUrl3,posLeft:"160px",posTop:"50px",
    msg:"If you have time to just<br/> upload our template full of ages <br/> press full data or for quick result <br/> jsut choose the average. "},
    {imgsrc:imgUrl1,posLeft:"250px",posTop:"90px",
    msg:"Provide us for the average <br/> note that it's just an expected value <br/> and it's not completly true.<br>you are about to complete."},
    {imgsrc:imgUrl1,posLeft:"250px",posTop:"90px",
    msg:"Download our tempate <br/> and just paste your employee ages <br/> then upload it again <br/>we are waiting for you.<br>you are about to complete."},   
]


// end of the call up girl data 





//***important note that every specefic question has to be after options directly */

var questions = [
  {question:"Name",type:'text'}, 
  {question:"Do you want the plans to include the dependents?",type:"options",options:['Yes','No']},
//   {question:"What's your email?", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/},
   {question:"Employees number",type:'options',options:['10 - 14','15 - 19','20 - 49','+50']},
//   {question:"Create your password", type: "password"}
{question:"Annual maximum coverage for every member.",type:'options',options:['25K - 30K','50K - 75K','100k - 150k']},
{question:"",type:"options",options:['Enter average age values for estimated prices','Enter full data to get the actual price']},
{question:"Average age.",type:"specefic",type2:"text",circle:0,questionIndex:4}, //means show this question for people who choose the 0 index option at question index 4
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
        inputField.style.color = 'black';
        transform(0, 0); // ie hack to redraw
        if (e.keyCode == 13) validate()
    })

    previousButton.addEventListener('click', function(e) {
        if (position === 0) return
        var currentpos = position;
        position -= 1

        //back to first not specefic type question 
        for(let pos=position;pos>0;pos--){
             if(questions[pos].type=='specefic'){
                 position--;
             }else{
                 break;
             }
        }

        hideCurrent(putQuestion,currentpos);
    })


    // functions
    // --------------

    // load the next question
    function putQuestion() {
        // console.log(questions[position]);
        if(questions[position].type=='specefic'){
            if(questions[position].circle!=questions[questions[position].questionIndex].answer){
                // inputField.value = "fakevaluetopassvalidation";
                validate();
                 return;
            }else{

                questions[position].type = questions[position].type2 || null;
               
                putQuestion();
                return;
            }
        }
                ///////////
                if(questions[position].type=='fileupload'){
                              //make these disappear 
                      inputLabel.style.display = "none";
                 forwardButton.style.display = "";
                      inputProgress.style.display = "none";
                      inputField.style.display = "none";


                       var fileuploadcontainer = document.createElement("div");
                       fileuploadcontainer.className = "image-upload";
                       fileuploadcontainer.setAttribute("id","fileuploadcontainer");

                      var label = document.createElement("label");
                      label.setAttribute("for","file-input");

                      var img = document.createElement("img");
                      img.setAttribute("src","https://goo.gl/pB9rpQ");

                      label.appendChild(img);

                      var uploadfile = document.createElement("input");
                      uploadfile.setAttribute("type","file");
                      uploadfile.setAttribute("id","file-input"); 


                      fileuploadcontainer.appendChild(label);

                      fileuploadcontainer.appendChild(uploadfile);

                     
                      inputContainer.appendChild(fileuploadcontainer);

                    //   inputField.value = "fakevaluetopassvalidation";

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

            // inputField.value = "fakevaluetopassvalidation";

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


        // show up call up girl 
        msg.innerHTML = dialogues[position].msg;

        person.innerHTML = `<img src=${dialogues[position].imgsrc}/>`;

        callupContainer.style.top = dialogues[position].posTop;
        callupContainer.style.left = dialogues[position].posLeft;


        
        callupContainer.style.display = 'block';
        // end of show up call up girl 

    }

    // when submitting the current question
    function validate() {

        // var validateCore = function() {      
        //   return inputField.value.match(questions[position].pattern || /.+/)
        // }

        // if (!questions[position].validate) questions[position].validate = validateCore

        // check if the pattern matches
        // if (!questions[position].validate()) wrong(inputField.focus.bind(inputField))


        

        if(inputField.value=='' && questions[position].type=='text')  wrong(inputField.focus.bind(inputField))
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

        if(questions[pos].type2 == questions[pos].type){
            questions[pos].type = 'specefic';
        }
       if(questions[pos].type=="options" || questions[pos].type2=="options"){
                    //removeoptionform 

                typeof textQuestion!=="undefined"?textQuestion.remove():'';

                document.querySelectorAll('.optionBtn').forEach(function(btn) {
                     btn.remove();
                });
        }
         if(questions[pos].type=="fileupload" || questions[pos].type2=="fileupload"){
            typeof fileuploadcontainer!=="undefined"?fileuploadcontainer.remove():'';
        }



        // hide call up girl 
        callupContainer.style.display = '';


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
