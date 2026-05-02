# Event Booking System

A NestJS + TypeORM practice project covering the core ORM patterns you'll use in production: relation loading, QueryBuilder, transactions, soft deletes, and the N+1 problem.

## Setup

### Prerequisites

- Node.js 18+
- PostgreSQL running locally

### 1. Create the database

```bash
createdb eventbooking
```

### 2. Configure environment

Create a `.env` file in the project root:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=your_password
DB_NAME=eventbooking
```

### 3. Install and run

```bash
npm install
npm run start:dev
```

TypeORM will auto-sync the schema on first boot (`synchronize: true`). SQL queries are logged to the console so you can observe what the ORM generates.

---

## Endpoints

### Events

```bash
# List all events with bookings and users
curl http://localhost:3000/events

# Get one event with its bookings and attendees
curl http://localhost:3000/events/<event-uuid>

# Events with seats still available
curl http://localhost:3000/events/available

# Events with average rating above a threshold
curl "http://localhost:3000/events/top-rated?min=4"

# Search by title and date range
curl "http://localhost:3000/events/search?q=concert&from=2025-01-01&to=2025-12-31"

# Paginated event list (0-indexed pages)
curl "http://localhost:3000/events/paginated?page=0&size=10"

# Create an event
curl -X POST http://localhost:3000/events \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Jazz Night",
    "description": "Live jazz at the downtown venue",
    "date": "2025-09-15T20:00:00.000Z",
    "capacity": 200,
    "price": 45,
    "categoryId": 1,
    "tagIds": [1, 2]
  }'
```

### Bookings

```bash
# Create a booking (capacity check runs inside a transaction)
curl -X POST http://localhost:3000/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "eventId": "<event-uuid>",
    "seats": 2,
    "totalPrice": 90
  }'

# Cancel a booking
curl -X DELETE http://localhost:3000/bookings/<booking-uuid>

# Transfer a booking to another user
curl -X POST http://localhost:3000/bookings/<booking-id>/transfer/<to-user-id>
```

### Users

```bash
# Top 5 users by total bookings
curl http://localhost:3000/users/top-bookers

# All bookings for a specific user
curl http://localhost:3000/users/<user-uuid>/bookings
```

---

## Key Concepts

### Relation Loading
`find()` with the `relations` option eagerly loads associated entities in a single JOIN query. Nested relations like `bookings.user` traverse two levels in one shot.

### N+1 Problem
`GET /events` has both a `badEventList` and `goodEventList` implementation. The bad version fires one query per event to fetch its bookings. The good version loads everything in one query. Watch the SQL logs to see the difference.

### QueryBuilder
Used for aggregations that `find()` can't express: `AVG`, `COUNT`, `GROUP BY`, `HAVING`, `ILIKE`, `BETWEEN`, and `COALESCE`. See `EventsService` and `UsersService`.

### Transactions
Booking creation and cancellation both run inside `dataSource.transaction()` to guarantee atomicity — the capacity check and the insert happen together or not at all. PostgreSQL unique-constraint violations (`err.code === '23505'`) are caught and converted to readable 400 errors.

### Soft Delete
The `Event` entity has a `@DeleteDateColumn()` field (`deletedAt`). TypeORM automatically filters soft-deleted rows from all queries and sets the timestamp instead of issuing a `DELETE`.
