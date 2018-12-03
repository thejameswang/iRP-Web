# User

Used to create user from First name, Last name, Phone OS, and Email

**URL** : `/api/user`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "fname": "[valid non-empty first name]",
    "lname": "[valid non-empty last name]",
    "email": "[valid email address]",
    "os": "[valid Phone OS]"
}
```

```json
{
  "os": "[Can only have 3 responses: IOS, Android, or Other]"
}
```

**Data example**

```json
{
  "fname": "James",
  "lname": "Wang",
  "email": "james@whereto.com",
  "os": "IOS"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "success": "Feedback was a success!",
    "response": "{
                  _id: 5bee759bb8a3661bf0d7213a,  
                  user: 'You',  
                  feedback: 'testing feedback',
                  __v: 0
                  }"
}
```

## Error Response

**Condition** : Feedback is less than 5 characters or empty

**Code** : `401 BAD REQUEST`

**Content** :

```json
{
  "error": "Missing feedback or feedback was less than 5 characters"
}
```
