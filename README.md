# ⁉️ Answers as a Service (Pronounced **AssAss**)

A simple API for getting your answers to life's hard htiting questions.

## 🧈AssAss
**A**n**s**wer**s** **as** a **S**ervice

Fair warning. It can be vulgar at times. But not excessively.

## ⚒️ Usage

All endpoints are `GET` only.

### `/`

**Method:** `GET`
**Summary:** Returns a random answer.
**Possible values:** `yes`, `no`, `maybe`

#### Query Parameters

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `yes` | `boolean` | No | Include or exclude `yes`. |
| `no` | `boolean` | No | Include or exclude `no`. |
| `maybe` | `boolean` | No | Include or exclude `maybe`. |

#### Rules

| Rule | Behavior |
| --- | --- |
| No query params | Returns a random `yes`, `no`, or `maybe`. |
| Param present with no value | Treats that answer type as included. Example: `/?yes` returns a `yes` response. |
| Param set to `false` | Excludes that answer type from the response pool. |
| Multiple exclusions | Returns a random value from whatever remains. |

#### Example Requests

```http
GET /
```

```http
GET /?yes
```

```http
GET /?no
```

```http
GET /?yes=false
```

```http
GET /?yes=false&no=false
```

#### Example Responses

| Request | Example response |
| --- | --- |
| `GET /` | (`yes` \| `no` \|`maybe`) |
| `GET /?yes` | `yes` |
| `GET /?no` | `no` |
| `GET /?yes=false` | `no` or `maybe` |
| `GET /?yes=false&no=false` | `maybe` |


### `/doc` or `/docs`

**Method:** `GET`
**Summary:** Redirects to usage docs.
