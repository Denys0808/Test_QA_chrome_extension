// This script gets injected into any opened page
// whose URL matches the pattern defined in the manifest
// (see "content_script" key).
// Several foreground scripts can be declared
// and injected into the same or different pages.

console.log("This prints to the console of the page (injected only if the page url matched)")

// Using load event
window.addEventListener("load", function() {
    qArray = []
    aArray = []

    questions = this.document.getElementsByClassName("question_text user_content enhanced");

    for(let i = 0 ; i < questions.length ; i ++)
    {
        let question = questions[i];
        let answer = question.nextElementSibling;

        let qtext = question.innerText.trim();
        let answers = answer.querySelectorAll("div.answer");
        let atext = []

        for(let j = 0 ; j < answers.length ; j ++)
            atext.push(answers[j].innerText.trim())

        qArray.push(qtext)
        aArray.push(atext)

        question.innerHTML = '<div class="getAnswerLMKButton" data-id="' + i + '" style="display: flex; cursor: pointer; width: 63px; height: 29px; justify-content: center; align-items: center; padding: 2px 5px; border-radius: 6px;background: linear-gradient(46deg, #710DC1 0%, #6068C5 100%);color: #FFF; font-family: Proxima Nova; font-size: 14px; font-style: normal; font-weight: 900; line-height: 16px; border: none;"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M11.6782 5.81696L10.9416 4.96112C10.8007 4.79862 10.687 4.49529 10.687 4.27862V3.35779C10.687 2.78362 10.2157 2.31237 9.64156 2.31237H8.72073C8.50948 2.31237 8.20073 2.19862 8.03823 2.05779L7.1824 1.32112C6.80865 1.00154 6.19656 1.00154 5.8174 1.32112L4.96698 2.06321C4.80448 2.19862 4.49573 2.31237 4.28448 2.31237H3.3474C2.77323 2.31237 2.30198 2.78362 2.30198 3.35779V4.28404C2.30198 4.49529 2.18823 4.79862 2.05281 4.96112L1.32156 5.82237C1.0074 6.19612 1.0074 6.80279 1.32156 7.17654L2.05281 8.03779C2.18823 8.20029 2.30198 8.50362 2.30198 8.71487V9.64112C2.30198 10.2153 2.77323 10.6865 3.3474 10.6865H4.28448C4.49573 10.6865 4.80448 10.8003 4.96698 10.9411L5.82281 11.6778C6.19656 11.9974 6.80865 11.9974 7.18781 11.6778L8.04365 10.9411C8.20615 10.8003 8.50948 10.6865 8.72615 10.6865H9.64698C10.2211 10.6865 10.6924 10.2153 10.6924 9.64112V8.72029C10.6924 8.50904 10.8061 8.20029 10.947 8.03779L11.6836 7.18196C11.9978 6.80821 11.9978 6.19071 11.6782 5.81696ZM8.75323 5.47571L6.13698 8.09196C6.06081 8.16803 5.95755 8.21077 5.8499 8.21077C5.74224 8.21077 5.63899 8.16803 5.56281 8.09196L4.25198 6.78112C4.17643 6.70467 4.13406 6.60152 4.13406 6.49404C4.13406 6.38656 4.17643 6.28341 4.25198 6.20696C4.40906 6.04987 4.66906 6.04987 4.82615 6.20696L5.8499 7.23071L8.17906 4.90154C8.33615 4.74446 8.59615 4.74446 8.75323 4.90154C8.91031 5.05862 8.91031 5.31862 8.75323 5.47571Z" fill="white"/></svg><span>LMK</span></div>' + question.innerHTML;
    }

    // Get all elements with class name "getAnswerLMKButton"
    const buttons = this.document.querySelectorAll('.getAnswerLMKButton');

    // Loop through each button and add the click event listener
    buttons.forEach(button => {
        const ids = button.getAttribute('data-id');
        button.addEventListener('click', function() {
            // console.log(qArray[ids], aArray[ids])
            var params = {
                question: qArray[ids],
                answers: aArray[ids]
            };
              
            var requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            };
            
            fetch('https://octopus-app-jmoaz.ondigitalocean.app/api', requestOptions)
                .then(function(response) {
                    if (response.ok) {
                        return response.json();
                    } else {
                        console.log('Error: ' + response.status);
                    }
                })
                .then(function(data) {
                    let aIndexes = data["answers"]

                    let qelement = this.document.getElementsByClassName("question_text user_content enhanced")[ids];
                    let aelement = qelement.nextElementSibling;
                    let aInputs = aelement.querySelectorAll("input.question_input");

                    for(let i = 0 ; i < aInputs.length ; i ++)
                    {
                        if(aIndexes.includes(i + 1))
                            aInputs[i].checked = true
                        else
                            aInputs[i].checked = false
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        });
    });
});