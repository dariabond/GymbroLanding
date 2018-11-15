/**
 * Created by dariabondarchuk on 11/13/18.
 */
const NAME_FIELD_ID = "name";
const EMAIL_FIELD_ID = "email";
function subscribe(e) {
    e.preventDefault();
    const name = document.getElementById(NAME_FIELD_ID).value;
    const email = document.getElementById(EMAIL_FIELD_ID).value;
    if (!name || !email) {
        if (!name) {
            markAsRequired(NAME_FIELD_ID);
        } 
        if (!email) {
            markAsRequired(EMAIL_FIELD_ID);
        }
        return;
    }
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    const initParams = {
        method: "POST",
        cache: "default",
        mode: "cors",
        headers: headers,
        body: JSON.stringify({"firstname" : name, "email" : email})
    };
    fetch("http://localhost:5656/gymbro/subscribe", initParams)
        .then((response) => response.json())
        .then((body) => {
            if (body.err) {
                displaySubscriptionError();
            } else {
                cleanUpAfterSubscribe();
            }
        })
        .catch(function(error) {
            displaySubscriptionError();
        });
}

function markAsRequired(fieldId) {
    let element = document.getElementById(fieldId);
    element && element.classList.add("inputRequired");
}

function markAsNotRequired(fieldId) {
    let element = document.getElementById(fieldId);
    element && element.classList.remove("inputRequired");
}

function cleanUpAfterSubscribe() {
    document.getElementById("sub_error_message").style.display = "none";
    document.getElementById("subscriptionForm").style.display = "none";
    document.getElementById("after_sub_text").style.display = "block";
}

function displaySubscriptionError() {
    document.getElementById("sub_error_message").style.display = "block";
}

function onChangeInput(fieldId) {
    markAsNotRequired(fieldId);
}