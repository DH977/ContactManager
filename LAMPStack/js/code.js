const urlBase = 'http://group3cop4331.xyz/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";

function doLogin() {
    userId = 0;
    firstName = "";
    lastName = "";
    
    let login = document.getElementById("loginName").value.trim();
    let password = document.getElementById("loginPassword").value.trim();
    
    document.getElementById("loginResult").innerHTML = "";

    let loginField = document.getElementById("loginName");
    let passwordField = document.getElementById("loginPassword");
    let loginError = document.getElementById("loginNameError");
    let passwordError = document.getElementById("loginPasswordError");

    // Clear existing error messages
    loginError.textContent = "";
    passwordError.textContent = "";

    // Validate required fields
    if (login === '') {
        loginError.textContent = "Please enter your username.";
        loginField.classList.add("invalid");
    } else {
        loginField.classList.remove("invalid");
    }

    if (password === '') {
        passwordError.textContent = "Please enter your password.";
        passwordField.classList.add("invalid");
    } else {
        passwordField.classList.remove("invalid");
    }

    // Check if any validation errors exist
    if (login === '' || password === '') {
        return; // Exit the function if there are validation errors
    }

	let tmp = {login:login,password:password};
	//var tmp = {login:login,password:hash};
	let jsonPayload = JSON.stringify( tmp );
	
	let url = urlBase + '/Login.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
				sessionStorage.setItem('userId', userId);
		
				if( userId < 1 )
				{		
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();
	
				window.location.href = "searchContacts.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function signUp()
{

        let firstName = document.getElementById("firstName").value.trim();
        let lastName = document.getElementById("lastName").value.trim();
        let loginName = document.getElementById("loginName").value.trim();
        let loginPassword = document.getElementById("loginPassword").value.trim();

        let firstNameField = document.getElementById("firstName");
        let lastNameField = document.getElementById("lastName");
        let loginNameField = document.getElementById("loginName");
        let loginPasswordField = document.getElementById("loginPassword");

        // Validate required fields
        if (firstName === '') {
            document.getElementById("firstNameError").textContent = "Please enter your first name.";
            firstNameField.classList.add("invalid");
        } else {
            document.getElementById("firstNameError").textContent = "";
            firstNameField.classList.remove("invalid");
        }

        if (lastName === '') {
            document.getElementById("lastNameError").textContent = "Please enter your last name.";
            lastNameField.classList.add("invalid");
        } else {
            document.getElementById("lastNameError").textContent = "";
            lastNameField.classList.remove("invalid");
        }

        if (loginName === '') {
            document.getElementById("loginNameError").textContent = "Please select a username.";
            loginNameField.classList.add("invalid");
        } else {
            document.getElementById("loginNameError").textContent = "";
            loginNameField.classList.remove("invalid");
        }

        if (loginPassword === '') {
        document.getElementById("loginPasswordError").textContent = "Please select a password.";
        loginPasswordField.classList.add("invalid");
    } else if (loginPassword.length < 8) {
        document.getElementById("loginPasswordError").textContent = "Password must be at least 8 characters long.";
        loginPasswordField.classList.add("invalid");
    } else {
        document.getElementById("loginPasswordError").textContent = "";
        loginPasswordField.classList.remove("invalid");
    }

        // Check if any validation errors exist
        if (document.querySelectorAll('.invalid').length > 0) {
            return; // Exit the function if there are validation errors
        }

	let tmp = {firstName: firstName, lastName: lastName, Login: loginName, Password: loginPassword};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/SignUp.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		
	}

	window.location.href = 'http://group3cop4331.xyz/index.html'
	
}

function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "login.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "Select a Contact to Edit or Delete";
	}
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function addColor()
{
	let newColor = document.getElementById("colorText").value;
	document.getElementById("colorAddResult").innerHTML = "";

	let tmp = {color:newColor,userId,userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/AddContacts.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorAddResult").innerHTML = "Color has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorAddResult").innerHTML = err.message;
	}
	
}

function searchContact() {
    let srch = document.getElementById("inputSearchPage").value;

    let colorList = document.getElementById("tableB");
    colorList.innerHTML = ""; // Clear the table content

    let tmp = { search: srch, userId: userId };
    let jsonPayload = JSON.stringify(tmp);

    let url = `${urlBase}/SearchContactsTest.${extension}`;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);
                tableClear();

            

// Modified loop
for (let i = 0; i < jsonObject.results.length; i++) {
    // Create a new table row
    let tRow = document.createElement("tr");

    // Create an anchor element with a unique link based on userId
    let link = `http://group3cop4331.xyz/contacts.html?firstName=${encodeURIComponent(jsonObject.results[i].firstName)}&lastName=${encodeURIComponent(jsonObject.results[i].lastName)}&phone=${encodeURIComponent(jsonObject.results[i].Phone)}&email=${encodeURIComponent(jsonObject.results[i].Email)}&contactId=${encodeURIComponent(jsonObject.results[i].ID)}`;
    let atagFirst = document.createElement("a");
    atagFirst.setAttribute("href", link);
    atagFirst.textContent = `${jsonObject.results[i].firstName}`// Use textContent to set only the first name
    atagFirst.style.textDecoration = "none";
    atagFirst.style.color = "inherit";
    atagFirst.title = "Click here to edit or delete contact!"

	let atagLast = document.createElement("a");
    atagLast.setAttribute("href", link);
    atagLast.textContent = `${jsonObject.results[i].lastName}`// Use textContent to set only the first name
    atagLast.style.textDecoration = "none";
    atagLast.style.color = "inherit";
    atagLast.title = "Click here to edit or delete contact!"

	let atagPhone = document.createElement("a");
    atagPhone.setAttribute("href", link);
    atagPhone.textContent = `${jsonObject.results[i].Phone}`// Use textContent to set only the first name
    atagPhone.style.textDecoration = "none";
    atagPhone.style.color = "inherit";
    atagPhone.title = "Click here to edit or delete contact!"
	
	let atagEmail = document.createElement("a");
    atagEmail.setAttribute("href", link);
    atagEmail.textContent = `${jsonObject.results[i].Email}`// Use textContent to set only the first name
    atagEmail.style.textDecoration = "none";
    atagEmail.style.color = "inherit";
    atagEmail.title = "Click here to edit or delete contact!"
	

    // Create table cells for the rest of the contact data
    let tDataFirstName = document.createElement("td");
	tDataFirstName.className = "table-cell";
    let tDataLastName = document.createElement("td");
	tDataLastName.className = "table-cell";
    let tDataPhone = document.createElement("td");
	tDataPhone.className = "table-cell";
    let tDataEmail = document.createElement("td");
	tDataEmail.className = "table-cell";

    // Set the content of each table cell
    tDataFirstName.appendChild(atagFirst); // Append the anchor to the first name cell
    tDataLastName.appendChild(atagLast);
    tDataPhone.appendChild(atagPhone);
    tDataEmail.appendChild(atagEmail);

    // Append the table cells to the table row

    tRow.appendChild(tDataFirstName);
    tRow.appendChild(tDataLastName);
    tRow.appendChild(tDataPhone);
    tRow.appendChild(tDataEmail);

    // Append the table row to the table body
    colorList.appendChild(tRow);

    if (i < jsonObject.results.length - 1) {
        colorList.innerHTML += "<br />\r\n";
    }
}



            }
        };
        xhr.send(jsonPayload);
    } catch (err) {
        
    }
}

function addContact()
{
	let firstName = document.getElementById("firstName").value;
	let lastName = document.getElementById("lastName").value;
	let phoneNumber = document.getElementById("phoneNumber").value;
	let email = document.getElementById("email").value;
	userId = sessionStorage.getItem('userId');

	let tmp = { UserId: userId, firstName: firstName, lastName: lastName, Phone: phoneNumber, Email: email};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/AddContacts.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		
	}
	window.location.href = 'http://group3cop4331.xyz/searchContacts.html';
}



function searchPageLoad(){
	readCookie();
	let hRow = document.createElement("tr");
	let hTableFirst = document.createElement("th");
	let hTableLast = document.createElement("th");
	let hTablePhone = document.createElement("th");
	let hTableEmail = document.createElement("th");

	tableHeader = document.getElementById("table");

	hTableFirst.textContent = "First name";
	hRow.appendChild(hTableFirst);

	hTableLast.textContent = "Last name";
	hRow.appendChild(hTableLast);

	hTablePhone.textContent = "Phone";
	hRow.appendChild(hTablePhone);

	hTableEmail.textContent = "Email";
	hRow.appendChild(hTableEmail);

	tableHeader.appendChild(hRow);
	
	searchContact();
}

function tableClear(){
	let tableSpace = document.getElementById("tableB");
	tableSpace.innerHTML = '';

}