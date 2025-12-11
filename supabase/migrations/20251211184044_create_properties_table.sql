/*
  # Create Properties Management System

  1. New Tables
    - `properties`
      - `id` (uuid, primary key) - Unique identifier for each property
      - `title` (text) - Property title
      - `description` (text) - Detailed property description
      - `price` (numeric) - Property price
      - `location` (text) - Property location/address
      - `bedrooms` (integer) - Number of bedrooms
      - `bathrooms` (integer) - Number of bathrooms
      - `area` (numeric) - Property area in sq ft
      - `property_type` (text) - Type of property (villa, apartment, plot, etc.)
      - `image_url` (text) - Main image URL
      - `gallery_urls` (text array) - Additional image URLs
      - `is_featured` (boolean) - Whether property is featured on home page
      - `status` (text) - Property status (available, sold, rented)
      - `amenities` (text array) - List of amenities
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
      - `created_by` (uuid) - Reference to admin user who created it

  2. Security
    - Enable RLS on `properties` table
    - Add policy for authenticated admin users to manage all properties
    - Add policy for public users to view available properties only

  3. Indexes
    - Index on `is_featured` for efficient featured property queries
    - Index on `status` for filtering by availability
*/

CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL,
  location text NOT NULL,
  bedrooms integer DEFAULT 0,
  bathrooms integer DEFAULT 0,
  area numeric DEFAULT 0,
  property_type text NOT NULL,
  image_url text NOT NULL,
  gallery_urls text[] DEFAULT '{}',
  is_featured boolean DEFAULT false,
  status text DEFAULT 'available',
  amenities text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view available properties"
  ON properties
  FOR SELECT
  USING (status = 'available' OR auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert properties"
  ON properties
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update properties"
  ON properties
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete properties"
  ON properties
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(is_featured);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON properties(created_at DESC);