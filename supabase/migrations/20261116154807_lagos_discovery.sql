-- Non-transactional discovery foundation. No payment, order, wallet, or escrow data.
-- Deploy only to a CoopCart-specific Supabase project after data/privacy review.

create extension if not exists pgcrypto;

create type public.area_launch_state as enum ('waitlist', 'active', 'paused');
create type public.offer_publication_state as enum ('draft', 'published', 'paused', 'ended');

create table public.service_areas (
  id uuid primary key default gen_random_uuid(),
  lga_name text not null unique,
  state_name text not null default 'Lagos',
  launch_state public.area_launch_state not null default 'waitlist',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint service_areas_lagos_only check (state_name = 'Lagos')
);

-- Seed geography only. No LGA is represented as served until CoopCart verifies
-- real supplier, captain, pickup/delivery, and support coverage for it.
insert into public.service_areas (lga_name) values
  ('Agege'), ('Ajeromi-Ifelodun'), ('Alimosho'), ('Amuwo-Odofin'),
  ('Apapa'), ('Badagry'), ('Epe'), ('Eti-Osa'), ('Ibeju-Lekki'),
  ('Ifako-Ijaiye'), ('Ikeja'), ('Ikorodu'), ('Kosofe'), ('Lagos Island'),
  ('Lagos Mainland'), ('Mushin'), ('Ojo'), ('Oshodi-Isolo'), ('Shomolu'),
  ('Surulere');

create table public.public_offers (
  id uuid primary key default gen_random_uuid(),
  service_area_id uuid not null references public.service_areas(id),
  title text not null check (char_length(title) between 3 and 100),
  description text not null check (char_length(description) <= 1000),
  category text not null check (char_length(category) between 2 and 50),
  product_specification text not null check (char_length(product_specification) between 3 and 300),
  unit_label text not null check (char_length(unit_label) between 1 and 50),
  price_kobo bigint not null check (price_kobo > 0),
  comparator_price_kobo bigint check (comparator_price_kobo is null or comparator_price_kobo > 0),
  comparator_description text,
  comparator_checked_at timestamptz,
  comparator_evidence_url text,
  supplier_display_name text not null check (char_length(supplier_display_name) between 2 and 100),
  pickup_description text,
  fulfillment_date date,
  publication_state public.offer_publication_state not null default 'draft',
  offer_expires_at timestamptz,
  -- Approval must be recorded by a future trusted operator workflow.
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint comparator_fields_consistent check (
    comparator_price_kobo is null or
    (comparator_description is not null and comparator_checked_at is not null)
  )
);

create index public_offers_area_state_expiry_idx
  on public.public_offers (service_area_id, publication_state, offer_expires_at);

create or replace function public.touch_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger service_areas_touch_updated_at
  before update on public.service_areas
  for each row execute function public.touch_updated_at();
create trigger public_offers_touch_updated_at
  before update on public.public_offers
  for each row execute function public.touch_updated_at();

alter table public.service_areas enable row level security;
alter table public.public_offers enable row level security;

-- Anonymous/authenticated clients may read the area status and verified published
-- offers only. No public insert/update/delete policy exists. Publishing is not
-- enabled until a trusted server-side operator workflow is designed and tested.
create policy "service areas are publicly readable"
  on public.service_areas for select to anon, authenticated using (true);
create policy "active offers in active areas are publicly readable"
  on public.public_offers for select to anon, authenticated using (
    publication_state = 'published'
    and (offer_expires_at is null or offer_expires_at > now())
    and exists (
      select 1 from public.service_areas a
      where a.id = public_offers.service_area_id
        and a.launch_state = 'active'
    )
  );

revoke insert, update, delete on public.service_areas from anon, authenticated;
revoke insert, update, delete on public.public_offers from anon, authenticated;
grant select on public.service_areas, public.public_offers to anon, authenticated;
