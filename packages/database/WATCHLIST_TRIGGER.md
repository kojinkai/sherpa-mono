# Watchlist Auto-Creation Trigger

This database automatically creates a watchlist for each new user via a PostgreSQL trigger.

## How It Works

1. **Trigger Function**: `create_watchlist_for_user()` - Creates a new watchlist with default name "My Watchlist"
2. **Trigger**: `user_watchlist_trigger` - Fires AFTER INSERT on the User table
3. **Automatic Creation**: Every time a user is created, a watchlist is automatically created and linked to that user

## Database Schema

```sql
-- Trigger function
CREATE OR REPLACE FUNCTION create_watchlist_for_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO "Watchlist" (name, "userId", "createdAt", "updatedAt")
  VALUES ('My Watchlist', NEW.id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger
CREATE TRIGGER user_watchlist_trigger
  AFTER INSERT ON "User"
  FOR EACH ROW
  EXECUTE FUNCTION create_watchlist_for_user();
```

## Prisma Schema

```prisma
model User {
  id        Int        @id @default(autoincrement())
  email     String     @unique
  name      String?
  watchlist Watchlist?  // One-to-one relationship
}

model Watchlist {
  id           Int          @id @default(autoincrement())
  name         String       @default("My Watchlist")
  userId       Int          @unique
  user         User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  stockSymbols StockSymbol[] // Many-to-many relationship
  createdAt    DateTime     @default(now())
  updatedAt    DateTime     @updatedAt
  
  /// Automatically created via database trigger when a User is created
}
```

## Testing the Trigger

Run the test script to verify the trigger works:

```bash
cd packages/database
npx tsx test-trigger.ts
```

## Benefits

- **Automatic**: No need to remember to create watchlists in application code
- **Reliable**: Works regardless of how users are created (API, direct DB, etc.)
- **Atomic**: Watchlist creation is part of the same transaction as user creation
- **Consistent**: Every user gets a watchlist with the same default structure

## Notes

- The trigger creates a watchlist with the name "My Watchlist"
- Users can only have one watchlist (enforced by `@unique` constraint)
- Watchlists can contain up to 5 stock symbols (enforced in application logic)
- When a user is deleted, their watchlist is automatically deleted (CASCADE)
