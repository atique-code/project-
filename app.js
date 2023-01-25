console.log(firebase.auth())

var email = document.getElementById("email")
var password = document.getElementById("password")
var name1 = document.getElementById("name")
var signup = document.getElementById("Signup")

var role = document.getElementsByName("user")
var getrole = ""
signup.addEventListener("click", function () {
    event.preventDefault()
    console.log(email.value)
    console.log(password.value)
    for (var i = 0; i < role.length; i++) {
        if (role[i].checked) {
            getrole = role[i].value
            break
        }
    }
    if (getrole == "") {
        alert("select role")
    }
    else {
        console.log(getrole)
    }

    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then(async (userdata) => {
            console.log(userdata.user.uid)

            var obj = {
                username: name1.value,
                email: email.value,
                password: password.value,
                role: getrole,
                USER_UID: userdata.user.uid
            }

            await firebase.database().ref(`${getrole.toString()}/`)
            .child(userdata.user.uid.toString()).set(obj)
            alert("user reg")

        })
        .catch((err) => {
            // console.log(err)
            alert(err)
        })
})


