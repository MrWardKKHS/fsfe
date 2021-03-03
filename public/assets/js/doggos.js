const BREEDS_URL = "https://dog.ceo/api/breed/vizsla/images/random";
const firebaseConfig = {
  apiKey: "AIzaSyC7taWwom7gZQ8I6ehtobvm7ckXdID_oro",
  authDomain: "push-vizsla.firebaseapp.com",
  projectId: "push-vizsla",
  storageBucket: "push-vizsla.appspot.com",
  messagingSenderId: "362382911555",
  appId: "1:362382911555:web:14bdd3fe091545b5420cf6",
  measurementId: "G-340DS2RYF4",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const whenSignedIn = document.querySelector("#whenSignedIn");
const whenSignedOut = document.querySelector("#whenSignedOut");

const signInBtn = document.querySelector("#signInBtn");
const signOutBtn = document.querySelector("#signOutBtn");

const provider = new firebase.auth.GoogleAuthProvider();

signInBtn.onclick = () => auth.signInWithPopup(provider);

signOutBtn.onclick = () => auth.signOut();

const createThing = document.querySelector("#createThing");
const thingsList = document.querySelector("#thingsList");
let thingsRef;
let unsubscribe;

auth.onAuthStateChanged((user) => {
  if (user) {
    thingsRef = db.collection("things");

    createThing.onclick = () => {
      const { serverTimestamp } = firebase.firestore.FieldValue;

      thingsRef.add({
        uid: user.uid,
        name: faker.commerce.productName(),
        createdAt: serverTimestamp(),
      });
    };
    unsubscribe = thingsRef
      .where("uid", "==", user.uid)
      .orderBy("createdAt")
      .onSnapshot((querySnapshot) => {
        const items = querySnapshot.docs.map((doc) => {
          return `<li> ${doc.data().name}</li>`;
        });
        thingsList.innerHTML = items.join("");
      });
  } else {
    unsubscribe && unsubscribe();
  }
});

auth.onAuthStateChanged((user) => {
  if (user) {
    //signed in
    console.log(user);
    whenSignedIn.hidden = false;
    whenSignedOut.hidden = true;
    userDetails.innerHTML = `<h3> Hello ${user.displayName}!</h3><p>User ID ${user.uid}</p>`;
  } else {
    // not signed in
    whenSignedIn.hidden = true;
    whenSignedOut.hidden = false;
    userDetails.innerHTML = ``;
  }
});

function addDoggo() {
  console.log("btn clicked");
  fetch(BREEDS_URL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const img = document.createElement("img");
      img.src = data.message;
      img.alt = "Cute doggo";

      document.querySelector(".doggos").appendChild(img);
    });
}

document.querySelector(".add-doggo").addEventListener("click", addDoggo);
