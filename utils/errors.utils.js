module.exports.signUpErrors = (err) => {
    let errors = { username: "", email: "", password: "" };
  console.log(err.message);
    if (err.message.includes("username"))
      errors.username = "This username is already taken";
  
    if (err.message.includes("email")) errors.email = "Email incorrect";
  
    if (err.message.includes("password"))
      errors.password = "The password must be at least 6 characters long";
  
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("username"))
      errors.username = "This username is already taken";
  
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
      errors.email = "This email is already registered";
  
    return errors;
  };
  
  module.exports.signInErrors = (err) => {
    let errors = { email: '', password: ''}
  
    if (err.message.includes("email")) 
      errors.email = "Email inconnu";
    if (err.message.includes('password'))
      errors.password = "Le mot de passe ne correspond pas"
    if (err.message.includes('accepted'))
      errors.password = "L'utilisateur n'est pas accepté"
    console.log(err.message)
    return errors;
  }
  
  module.exports.uploadErrors = (err) => {
    let errors = { format: '', maxSize: ""};
  
    if (err.message.includes('invalid file'))
      errors.format = "Format incompatabile";
  
    if (err.message.includes('max size'))
      errors.maxSize = "Le fichier dépasse 500ko";
  
    return errors
  }