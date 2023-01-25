console.log(firebase.auth())

var email = document.getElementById("email")
var password = document.getElementById("password")
var name1 = document.getElementById("name")

var signin = document.getElementById("signin")
var role = document.getElementsByName("user")
var getrole = ""



signin.addEventListener("click", function () {
    event.preventDefault()
    console.log(email.value)
    console.log(password.value)
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((userdata) => {
            console.log(userdata.user.uid)
            firebase.database().ref("Admin/").child(userdata.user.uid)
            .once("value", (snap) => {
                console.log(snap.toJSON())
                if (snap.toJSON() == null) {
                    firebase.database().ref("user/").child(userdata.user.uid).once("value", (snap) => {
                        console.log(snap.toJSON())
                        window.location.replace("user_panel.html")   
                    })
                }
                else {
                    console.log("Admin panel")
                    window.location.replace("admin_panel.html")
                }
            })
        })
        .catch((err) => {
            // console.log(err)
            alert(err)
        })
})