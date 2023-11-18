export default value => {
    let validate = true;
    if (value.length < 8) {
      validate = false
    }
    else if (!/[a-zA-Z]/.test(value))
    {
      validate = false
    }
    else if (!/[0-9]/.test(value))
    {
      validate = false
    }
    //else if (!/[?!@#\$%\^&\*[{}\]]/.test(value)){
    //  validate = false
    //}
    
    return validate;
  };
  