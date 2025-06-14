
-- FlowState Database Schema
-- This file contains the SQL commands to set up the database structure

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE template_category AS ENUM ('productivity', 'marketing', 'sales', 'support', 'development', 'finance', 'hr', 'other');
CREATE TYPE workflow_status AS ENUM ('active', 'paused', 'error', 'draft');
CREATE TYPE execution_status AS ENUM ('running', 'completed', 'failed', 'cancelled');

-- Templates table - stores workflow templates
CREATE TABLE templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category template_category NOT NULL DEFAULT 'other',
    tags TEXT[], -- Array of tags for filtering
    workflow_data JSONB NOT NULL, -- n8n workflow JSON
    thumbnail_url TEXT,
    author_id UUID REFERENCES auth.users(id),
    is_public BOOLEAN DEFAULT true,
    usage_count INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User workflows table - stores user's actual workflows
CREATE TABLE user_workflows (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    template_id UUID REFERENCES templates(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status workflow_status DEFAULT 'draft',
    workflow_data JSONB NOT NULL, -- n8n workflow JSON
    n8n_workflow_id TEXT, -- ID in n8n instance
    settings JSONB DEFAULT '{}', -- User-specific settings
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_executed_at TIMESTAMP WITH TIME ZONE
);

-- Workflow executions table - stores execution history
CREATE TABLE workflow_executions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workflow_id UUID REFERENCES user_workflows(id) NOT NULL,
    n8n_execution_id TEXT,
    status execution_status NOT NULL,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    finished_at TIMESTAMP WITH TIME ZONE,
    execution_data JSONB,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User credentials table - stores encrypted OAuth and API credentials
CREATE TABLE user_credentials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    service_name VARCHAR(100) NOT NULL, -- e.g., 'gmail', 'slack', 'github'
    credential_type VARCHAR(50) NOT NULL, -- e.g., 'oauth2', 'api_key'
    encrypted_data BYTEA NOT NULL, -- Encrypted credential data
    metadata JSONB DEFAULT '{}', -- Non-sensitive metadata
    is_active BOOLEAN DEFAULT true,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, service_name, credential_type)
);

-- Activity log table - tracks user actions
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    action VARCHAR(100) NOT NULL, -- e.g., 'workflow_created', 'template_used'
    resource_type VARCHAR(50), -- e.g., 'workflow', 'template'
    resource_id UUID,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_templates_category ON templates(category);
CREATE INDEX idx_templates_public ON templates(is_public);
CREATE INDEX idx_templates_author ON templates(author_id);
CREATE INDEX idx_user_workflows_user ON user_workflows(user_id);
CREATE INDEX idx_user_workflows_status ON user_workflows(status);
CREATE INDEX idx_workflow_executions_workflow ON workflow_executions(workflow_id);
CREATE INDEX idx_workflow_executions_status ON workflow_executions(status);
CREATE INDEX idx_user_credentials_user ON user_credentials(user_id);
CREATE INDEX idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_created ON activity_logs(created_at);

-- Row Level Security (RLS) policies
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Templates policies
CREATE POLICY "Public templates are viewable by everyone" ON templates
    FOR SELECT USING (is_public = true);

CREATE POLICY "Users can view their own templates" ON templates
    FOR SELECT USING (auth.uid() = author_id);

CREATE POLICY "Users can create their own templates" ON templates
    FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own templates" ON templates
    FOR UPDATE USING (auth.uid() = author_id);

-- User workflows policies
CREATE POLICY "Users can only see their own workflows" ON user_workflows
    FOR ALL USING (auth.uid() = user_id);

-- Workflow executions policies
CREATE POLICY "Users can only see executions of their workflows" ON workflow_executions
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_workflows 
            WHERE user_workflows.id = workflow_executions.workflow_id 
            AND user_workflows.user_id = auth.uid()
        )
    );

-- User credentials policies
CREATE POLICY "Users can only access their own credentials" ON user_credentials
    FOR ALL USING (auth.uid() = user_id);

-- Activity logs policies
CREATE POLICY "Users can only see their own activity" ON activity_logs
    FOR ALL USING (auth.uid() = user_id);

-- Functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updating timestamps
CREATE TRIGGER update_templates_updated_at BEFORE UPDATE ON templates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_workflows_updated_at BEFORE UPDATE ON user_workflows
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_credentials_updated_at BEFORE UPDATE ON user_credentials
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
