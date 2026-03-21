export const checkValidData = (name, emails, password) => {

  const Name = /^[a-zA-Z]+([ \-'][a-zA-Z]+)*$/.test(name);

 const isEmailsValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emails);

 const passwords = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(password);

 if(!isEmailsValid) return "Emaild id is not valid";
 if(!passwords) return "password is not valid";
 if(!Name) return "Namm is not valid";
 

 return null;

}