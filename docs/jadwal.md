# Address API Spec

## Create Address API

Endpoint : POST /api/dokter/:dokterId/jadwal

Headers :

- Authorization : token

Request Body :

```json
{
  "day": "monday",
  "date": "2023-06-15 15:51:55",
  "date_range": "2023-06-15 15:51:55",
  "time_start": "",
  "time_finish": "",
  "quota": 0,
  "status": true
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "dokter_id": 6,
    "day": "monday",
    "date": "2023-06-15 15:51:55",
    "date_range": "2023-06-15 15:51:55",
    "time_start": "",
    "time_finish": "",
    "quota": 0,
    "status": true
  }
}
```

Response Body Error :

```json
{
  "errors": "Country is required"
}
```

## Update Address API

Endpoint : PUT /api/dokter/:dokterId/jadwal/:jadwalId

Headers :

- Authorization : token

Request Body :

```json
{
  "dokter_id": 6,
  "day": "monday",
  "date": "2023-06-15 15:51:55",
  "date_range": "2023-06-15 15:51:55",
  "time_start": "",
  "time_finish": "",
  "quota": 0,
  "status": true
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "dokter_id": 6,
    "day": "monday",
    "date": "2023-06-15 15:51:55",
    "date_range": "2023-06-15 15:51:55",
    "time_start": "",
    "time_finish": "",
    "quota": 0,
    "status": true
  }
}
```

Response Body Error :

```json
{
  "errors": "Country is required"
}
```

## Get Address API

Endpoint : GET /api/dokter/:dokterId/jadwal/:jadwalId

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "dokter_id": 6,
    "day": "monday",
    "date": "2023-06-15 15:51:55",
    "date_range": "2023-06-15 15:51:55",
    "time_start": "",
    "time_finish": "",
    "quota": 0,
    "status": true
  }
}
```

Response Body Error :

```json
{
  "errors": "contact is not found"
}
```

## List Addresses API

Endpoint : GET/api/dokter/:dokterId/jadwal/

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "dokter_id": 5,
      "day": "monday",
      "date": "2023-06-15 15:51:55",
      "date_range": "2023-06-15 15:51:55",
      "time_start": "",
      "time_finish": "",
      "quota": 0,
      "status": true
    },
    {
      "id": 2,
      "dokter_id": 5,
      "day": "monday",
      "date": "2023-06-15 15:51:55",
      "date_range": "2023-06-15 15:51:55",
      "time_start": "",
      "time_finish": "",
      "quota": 0,
      "status": true
    }
  ]
}
```

Response Body Error :

```json
{
  "errors": "contact is not found"
}
```

## Remove Address API

Endpoint : DELETE /api/dokter/:dokterId/jadwal/:jadwalId

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
  "errors": "address is not found"
}
```
