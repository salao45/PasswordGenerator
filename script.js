const passDisplay = document.querySelector("[data-password-display]");
const lengthPass = document.querySelector("[passwordLengthController]");
const lengthNum = document.querySelector("[passwordlengthNumber]");
const displayPass = document.querySelector("[data-password-display]");
const copytext = document.querySelector("[data-copyMsg]");
const copyTextbtn = document.querySelector("[copyContentbtn]");
const checkUpperCase = document.querySelector("#upperCase");
const checkLowerCase = document.querySelector("#lowerCase");
const checkNumber = document.querySelector("#number");
const checkSymbol = document.querySelector("#symbol");
const AllCheckBox = document.querySelectorAll("input[type = checkbox]");
const generateBtn = document.querySelector(".generateBtn");
let symbols = '~!@#$%^&*()_-+={[}]|\:;<,>.?/';
let passlen = 10;

let checkCount = 0;
let password = "";
function sliderController(){
    lengthNum.innerText= passlen; 
}
  
sliderController();
function shufflePassword(Array) { 
    for (x = Array.length -1; x > 0; x--) { 
       var y = Math.floor(Math.random() * x+1) 
       var temp = Array[x] 
       Array[x] = Array[y] 
       Array[y] = temp 

    } 
    let str ="";
    Array.forEach((e)=> {
         str += e;
    });
    return str;
}

function randomint(min,max){
    
    return Math.floor(Math.random() * (max - min)) + min;
   
}

function randomNum(){
    return randomint(0,9);
}
function randomlowercase(){
    return String.fromCharCode(randomint(97,123));
}
function randomuppercase(){
    return String.fromCharCode(randomint(65,91));
}
function randomSymbol(){
    const randomInt = randomint(0,symbols.length)
    return symbols.charAt(randomInt);
}

async function copyContent(){
       try { 
        await navigator.clipboard.writeText(displayPass)
        copytext.innerText = "copied";
        
       } catch (e) {
        copytext.innerText = "Failed";
       }
       copytext.classList.add("active");

       setTimeout(() => {
        copytext.classList.remove("active");
       }, 2000);
};
lengthPass.addEventListener("input", (e) =>{
    passlen = e.target.value;
    sliderController();
});

copyTextbtn.addEventListener('click', (e)=>{
    if(passDisplay.value)
       copyContent();
});
function handleCheckBox(){
    checkCount = 0;
    AllCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
          
    })
    console.log(checkCount)

    if(checkCount>passlen){
        passlen = checkCount;
        sliderController();
    }
        
  }
AllCheckBox.forEach( (checkbox)=>{
     checkbox.addEventListener('change', handleCheckBox);
})

generateBtn.addEventListener('click', ()=>{
    if(checkCount<=0)
      return;
    if(checkCount>passlen){
        passlen = checkCount;
        sliderController();
    }
    password = "";
   
    let funArr=[];
    if(checkUpperCase.checked)
       funArr.push(randomuppercase);
    if(checkLowerCase.checked)
       funArr.push(randomlowercase); 
    if(checkNumber.checked)
       funArr.push(randomNum);
    if(checkSymbol.checked)
       funArr.push(randomSymbol);

    for(let i = 0; i<funArr.length;i++){
        password += funArr[i]();
    }
    for(let i = 0; i<passlen-checkCount;i++){
        let num = randomint(0,funArr.length);
        password += funArr[num]();
    }

    password = shufflePassword(Array.from(password))
    displayPass.value = password;
    

});
console.log("a" + password)
console.log(passlen)
console.log(checkCount)