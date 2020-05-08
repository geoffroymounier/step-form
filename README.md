This project allow an user to go through a simple registration form with several steps.

### Data

It uses a single json data as source of form rendering, with the form of
``` js
// ./src/data/userForm.json
[
  [ // a subArray is for a step of the form
    name : // the name of the step
    field : // object containing the props for each field of the form
      {
        id : String
        label : String
        required  : bool
        field : oneOf(['input','checkbox'])
        extraProps : // set of extra props according to the field chosen
          {
            placeholder : String
            type : oneOf(['text','email','password']) // type of text input
            regex : String // string regex pattern
            regexError : String // custom error displayed  on error
          }
      }
  ]
]
```
Eventually the data is mapped to split form step with available fields structures :
- Checkbox
- Inputs


Eventually the data is stored as a json element in redux, for sake of accessing it through the app.

the user data object is console logged in the final step "Done"

## Style
sass files were preferred over Styled-component due to the size of the file and because there is few transformation of style depending on props.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Test
Run jest tests with enzyme on all components.
Unit test and integration tests. Store mocked
Redux reducer is tested.

## Available Scripts

In the project directory, you can run:

- `yarn start`

- `yarn test`

- `yarn build`
