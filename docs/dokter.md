# Contact API Spec

## Create Contact API

Endpoint : POST /api/dokter

Headers :

- Authorization : token

Request Body :

```json
{
  "dokter_name": "junaidi",
  "email": "test",
  "phone": "0809000000043534534543534534543535345435435"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "dokter_name": "junaidi",
    "email": "test",
    "phone": "0809000000043534534543534534543535345435435"
  }
}
```

Response Body Error :

```json
{
  "errors": "Email is not valid format"
}
```

## Update Contact API

Endpoint : PUT /api/dokter/:id

Headers :

- Authorization : token

Request Body :

```json
{
  " dokter_name": "ismail",
  "email": "test",
  "phone": "0809000000043534534543534534543535345435435"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    " dokter_name": "ismail",
    "email": "test",
    "phone": "0809000000043534534543534534543535345435435"
  }
}
```

Response Body Error :

```json
{
  "errors": "Email is not valid format"
}
```

## Get Contact API

Endpoint : GET /api/dokter/:id

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "dokter_name": "ismail",
    "email": "test",
    "phone": "0809000000043534534543534534543535345435435"
  }
}
```

Response Body Error :

```json
{
  "errors": "Contact is not found"
}
```

## Search Contact API

Endpoint : GET /api/dokter

Headers :

- Authorization : token

Query params :

- name : Search by first_name or last_name, using like, optional
- email : Search by email using like, optional
- phone : Search by phone using like, optional
- page : number of page, default 1 for pagination
- size : size per page, default 10 for pagination

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "dokter_name": "hiyahiya",
      "email": "test",
      "phone": "0809000000043534534543534534543535345435435"
    },
    {
      "id": 2,
      "dokter_name": "siapa",
      "email": "test",
      "phone": "0809000000043534534543534534543535345435435"
    }
  ],
  "paging": {
    "page": 1,
    "total_page": 3,
    "total_item": 30
  }
}
```

Response Body Error :

## Remove Contact API

Endpoint : DELETE /api/dokter/:id

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Error :

```json
{
  "errors": "Contact is not found"
}
```
