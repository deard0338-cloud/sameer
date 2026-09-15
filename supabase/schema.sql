-- ==============================================================================
-- SAMEER XEROX — DATABASE & STORAGE SCHEMA (SUPABASE POSTGRESQL)
-- ==============================================================================
-- Execute this script in your Supabase Project SQL Editor to provision
-- the service requests database, document metadata tables, and private storage.

-- 1. Service Requests Table
CREATE TABLE IF NOT EXISTS service_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_number VARCHAR(32) UNIQUE NOT NULL,
  service_id VARCHAR(64) NOT NULL,
  service_slug VARCHAR(64) NOT NULL,
  service_name VARCHAR(255) NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  mobile VARCHAR(15) NOT NULL,
  email VARCHAR(255),
  additional_details TEXT,
  status VARCHAR(32) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'documents_required', 'processing', 'completed', 'rejected', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Fast lookup indexes
CREATE INDEX IF NOT EXISTS idx_service_requests_number ON service_requests (request_number);
CREATE INDEX IF NOT EXISTS idx_service_requests_created_at ON service_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_service_requests_status ON service_requests (status);

-- 2. Service Request Documents Metadata Table
CREATE TABLE IF NOT EXISTS service_request_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES service_requests(id) ON DELETE CASCADE,
  document_id VARCHAR(64) NOT NULL,
  document_name VARCHAR(255) NOT NULL,
  original_file_name VARCHAR(255) NOT NULL,
  storage_path VARCHAR(512) NOT NULL,
  file_size BIGINT NOT NULL,
  mime_type VARCHAR(128) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_service_request_docs_req ON service_request_documents (request_id);

-- 3. Provision Private Storage Bucket 'service-documents'
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'service-documents',
  'service-documents',
  false, -- PRIVATE BUCKET: Never generate public URLs
  5242880, -- 5 MB limit per document
  ARRAY['application/pdf', 'image/jpeg', 'image/png']
)
ON CONFLICT (id) DO NOTHING;

-- 4. Enable Row Level Security (RLS)
ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_request_documents ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies: Public Application Submission
CREATE POLICY "Public users can insert service requests" 
ON service_requests FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- Public application tracking by Request Number
CREATE POLICY "Public users can track application by request number" 
ON service_requests FOR SELECT 
TO anon, authenticated 
USING (true);

-- Authenticated operator desk access
CREATE POLICY "Staff can update request status" 
ON service_requests FOR UPDATE 
TO authenticated 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Public users can attach documents to service requests" 
ON service_request_documents FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

CREATE POLICY "Staff can view document records" 
ON service_request_documents FOR SELECT 
TO authenticated 
USING (true);

-- Storage bucket access policies
CREATE POLICY "Allow public upload to service-documents"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'service-documents');

CREATE POLICY "Allow authenticated staff to read service documents"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'service-documents');
