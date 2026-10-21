-- Run this in the Supabase SQL editor before enabling production persistence.
create table if not exists public.orders (
  id text primary key,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text not null,
  customer_email text not null,
  customer_phone text not null,
  data jsonb not null
);

create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_status_idx on public.orders (status);

create table if not exists public.product_prices (
  product_id text primary key,
  amount numeric(12, 2),
  unit text not null default 'per pack',
  updated_at timestamptz not null default now()
);

alter table public.orders enable row level security;
alter table public.product_prices enable row level security;

-- No anonymous policies are created. Server routes use the service role and
-- public clients can only access the constrained application APIs.
