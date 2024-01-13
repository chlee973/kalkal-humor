CREATE SCHEMA IF NOT EXISTS quote;
CREATE TABLE quote.post (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  nickname VARCHAR(20) NOT NULL,
  content TEXT NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE,
  upvote_count INTEGER DEFAULT 0,
  downvote_count INTEGER DEFAULT 0
);
CREATE TABLE quote.comment (
  id SERIAL PRIMARY KEY,
  nickname VARCHAR(20) NOT NULL,
  content TEXT NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE,
  post_id INTEGER REFERENCES quote.post(id)
);
CREATE OR REPLACE FUNCTION quote.update_updated_at() RETURNS TRIGGER AS $$BEGIN NEW.updated_at = CURRENT_TIMESTAMP;
RETURN NEW;
END;
$$LANGUAGE plpgsql;
CREATE TRIGGER trigger_update_updated_at BEFORE
UPDATE ON quote.post FOR EACH ROW EXECUTE FUNCTION quote.update_updated_at ();
CREATE TRIGGER trigger_update_updated_at BEFORE
UPDATE ON quote.comment FOR EACH ROW EXECUTE FUNCTION quote.update_updated_at ();