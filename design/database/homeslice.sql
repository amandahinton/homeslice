CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" varchar,
  "firstName" varchar,
  "lastName" varchar,
  "email" varchar,
  "phone" varchar,
  "password" varchar,
  "createdAt" timestamp,
  "updatedAt" timestamp
);

CREATE TABLE "homes" (
  "id" SERIAL PRIMARY KEY,
  "street" varchar,
  "city" varchar,
  "state" varchar,
  "zipcode" varchar,
  "userId" int,
  "sqft" integer,
  "beds" integer,
  "baths" integer,
  "yearBuilt" integer,
  "createdAt" timestamp,
  "updatedAt" timestamp
);

CREATE TABLE "events" (
  "id" SERIAL PRIMARY KEY,
  "title" varchar,
  "description" text,
  "image" varchar,
  "icon" varchar,
  "repeatInDays" integer,
  "createdAt" timestamp,
  "updatedAt" timestamp
);

CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,
  "type" varchar,
  "createdAt" timestamp,
  "updatedAt" timestamp
);

CREATE TABLE "events_categories" (
  "id" SERIAL PRIMARY KEY,
  "eventId" integer,
  "categoryId" integer,
  "createdAt" timestamp,
  "updatedAt" timestamp
);

CREATE TABLE "bookings" (
  "id" SERIAL PRIMARY KEY,
  "homeId" integer,
  "eventId" integer,
  "createdAt" timestamp,
  "updatedAt" timestamp
);

ALTER TABLE "events_categories" ADD FOREIGN KEY ("eventId") REFERENCES "events" ("id");

ALTER TABLE "events_categories" ADD FOREIGN KEY ("categoryId") REFERENCES "categories" ("id");

ALTER TABLE "bookings" ADD FOREIGN KEY ("homeId") REFERENCES "homes" ("id");

ALTER TABLE "bookings" ADD FOREIGN KEY ("eventId") REFERENCES "events" ("id");

ALTER TABLE "homes" ADD FOREIGN KEY ("userId") REFERENCES "users" ("id");
