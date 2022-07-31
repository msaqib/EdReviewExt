function lessonSummaryViolation() {
    // Check lesson summary
    const summaryElement = document.querySelector(".summary");
    if (summaryElement) {
        const desc = summaryElement.querySelector('.fOqKyO');
        if (desc) {
            const summaryP = desc.querySelector('p');
            // return true if the lesson does not have a summary, false otherwise
            return (summaryP.innerText.length < 2)
        }
    }
}
function imageCaptionViolations() {
    // Check image captions
    const widgets = document.querySelectorAll('.widget');
    //console.log(widgets);
    let ret = {
        imageCount: 0,
        capViolationCount: 0
    }
    if (widgets) {
        widgets.forEach(function (wi) {
            console.log(wi)
            const w = wi.querySelector('object')
            if (w.getAttribute('data')) {
                if (w.getAttribute('data').includes('image')) {
                    //console.log("There's an image")
                    ret.imageCount = ret.imageCount + 1;
                    const cap = wi.querySelector('.fDAxae')
                    if (!cap) {
                        ret.capViolationCount = ret.capViolationCount + 1;
                        let newp = document.createElement('p');
                        newp.style.color = 'red';
                        newp.innerText = 'No image caption';
                        wi.appendChild(newp);
                        //console.log("There's no caption");
                    }
                }
            }
        })
    }
    return ret;
}

(() => {
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, courseId, lessonId } = obj;
        if (type == "NEW") {
            //console.log("Course: " + courseId + ", Lesson: " + lessonId);

            const imageStatus = imageCaptionViolations();
            const summaryStatus = lessonSummaryViolation();
            if (summaryStatus) {
                const msg = document.createElement('p');
                msg.innerText = "Missing summary";
                msg.style.color = 'red';
                let sum = document.querySelector('.summary');
                sum.appendChild(msg);
            }
            // Check code widget captions
            const codes = document.querySelectorAll('code-container');
        }
    })
})();