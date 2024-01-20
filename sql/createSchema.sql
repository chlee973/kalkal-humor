--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1 (Homebrew)
-- Dumped by pg_dump version 16.1 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: humor; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA humor;


--
-- Name: quote; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA quote;


--
-- Name: update_updated_at(); Type: FUNCTION; Schema: humor; Owner: -
--

CREATE FUNCTION humor.update_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$ BEGIN NEW.updated_at = CURRENT_TIMESTAMP;
RETURN NEW;
END;
$$;


--
-- Name: update_updated_at(); Type: FUNCTION; Schema: quote; Owner: -
--

CREATE FUNCTION quote.update_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$BEGIN NEW.updated_at = CURRENT_TIMESTAMP;
RETURN NEW;
END;
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comment; Type: TABLE; Schema: humor; Owner: -
--

CREATE TABLE humor.comment (
    id integer NOT NULL,
    nickname character varying(20) NOT NULL,
    content text NOT NULL,
    password text NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone,
    post_id integer
);


--
-- Name: comment_id_seq; Type: SEQUENCE; Schema: humor; Owner: -
--

CREATE SEQUENCE humor.comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comment_id_seq; Type: SEQUENCE OWNED BY; Schema: humor; Owner: -
--

ALTER SEQUENCE humor.comment_id_seq OWNED BY humor.comment.id;


--
-- Name: post; Type: TABLE; Schema: humor; Owner: -
--

CREATE TABLE humor.post (
    id integer NOT NULL,
    title character varying(100) NOT NULL,
    nickname character varying(20) NOT NULL,
    content text NOT NULL,
    image text,
    password text NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone,
    upvote_count integer DEFAULT 0,
    downvote_count integer DEFAULT 0
);


--
-- Name: post_id_seq; Type: SEQUENCE; Schema: humor; Owner: -
--

CREATE SEQUENCE humor.post_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: post_id_seq; Type: SEQUENCE OWNED BY; Schema: humor; Owner: -
--

ALTER SEQUENCE humor.post_id_seq OWNED BY humor.post.id;


--
-- Name: comment; Type: TABLE; Schema: quote; Owner: -
--

CREATE TABLE quote.comment (
    id integer NOT NULL,
    nickname character varying(20) NOT NULL,
    content text NOT NULL,
    password text NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone,
    post_id integer
);


--
-- Name: comment_id_seq; Type: SEQUENCE; Schema: quote; Owner: -
--

CREATE SEQUENCE quote.comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comment_id_seq; Type: SEQUENCE OWNED BY; Schema: quote; Owner: -
--

ALTER SEQUENCE quote.comment_id_seq OWNED BY quote.comment.id;


--
-- Name: post; Type: TABLE; Schema: quote; Owner: -
--

CREATE TABLE quote.post (
    id integer NOT NULL,
    title character varying(100) NOT NULL,
    nickname character varying(20) NOT NULL,
    content text NOT NULL,
    password text NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone,
    upvote_count integer DEFAULT 0,
    downvote_count integer DEFAULT 0,
    speaker character varying(20) NOT NULL
);


--
-- Name: post_id_seq; Type: SEQUENCE; Schema: quote; Owner: -
--

CREATE SEQUENCE quote.post_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: post_id_seq; Type: SEQUENCE OWNED BY; Schema: quote; Owner: -
--

ALTER SEQUENCE quote.post_id_seq OWNED BY quote.post.id;


--
-- Name: comment id; Type: DEFAULT; Schema: humor; Owner: -
--

ALTER TABLE ONLY humor.comment ALTER COLUMN id SET DEFAULT nextval('humor.comment_id_seq'::regclass);


--
-- Name: post id; Type: DEFAULT; Schema: humor; Owner: -
--

ALTER TABLE ONLY humor.post ALTER COLUMN id SET DEFAULT nextval('humor.post_id_seq'::regclass);


--
-- Name: comment id; Type: DEFAULT; Schema: quote; Owner: -
--

ALTER TABLE ONLY quote.comment ALTER COLUMN id SET DEFAULT nextval('quote.comment_id_seq'::regclass);


--
-- Name: post id; Type: DEFAULT; Schema: quote; Owner: -
--

ALTER TABLE ONLY quote.post ALTER COLUMN id SET DEFAULT nextval('quote.post_id_seq'::regclass);


--
-- Name: comment comment_pkey; Type: CONSTRAINT; Schema: humor; Owner: -
--

ALTER TABLE ONLY humor.comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (id);


--
-- Name: post post_pkey; Type: CONSTRAINT; Schema: humor; Owner: -
--

ALTER TABLE ONLY humor.post
    ADD CONSTRAINT post_pkey PRIMARY KEY (id);


--
-- Name: comment comment_pkey; Type: CONSTRAINT; Schema: quote; Owner: -
--

ALTER TABLE ONLY quote.comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (id);


--
-- Name: post post_pkey; Type: CONSTRAINT; Schema: quote; Owner: -
--

ALTER TABLE ONLY quote.post
    ADD CONSTRAINT post_pkey PRIMARY KEY (id);


--
-- Name: comment trigger_update_updated_at; Type: TRIGGER; Schema: humor; Owner: -
--

CREATE TRIGGER trigger_update_updated_at BEFORE UPDATE ON humor.comment FOR EACH ROW EXECUTE FUNCTION humor.update_updated_at();


--
-- Name: post trigger_update_updated_at; Type: TRIGGER; Schema: humor; Owner: -
--

CREATE TRIGGER trigger_update_updated_at BEFORE UPDATE ON humor.post FOR EACH ROW EXECUTE FUNCTION humor.update_updated_at();


--
-- Name: comment trigger_update_updated_at; Type: TRIGGER; Schema: quote; Owner: -
--

CREATE TRIGGER trigger_update_updated_at BEFORE UPDATE ON quote.comment FOR EACH ROW EXECUTE FUNCTION quote.update_updated_at();


--
-- Name: post trigger_update_updated_at; Type: TRIGGER; Schema: quote; Owner: -
--

CREATE TRIGGER trigger_update_updated_at BEFORE UPDATE ON quote.post FOR EACH ROW EXECUTE FUNCTION quote.update_updated_at();


--
-- Name: comment comment_post_id_fkey; Type: FK CONSTRAINT; Schema: humor; Owner: -
--

ALTER TABLE ONLY humor.comment
    ADD CONSTRAINT comment_post_id_fkey FOREIGN KEY (post_id) REFERENCES humor.post(id);


--
-- Name: comment comment_post_id_fkey; Type: FK CONSTRAINT; Schema: quote; Owner: -
--

ALTER TABLE ONLY quote.comment
    ADD CONSTRAINT comment_post_id_fkey FOREIGN KEY (post_id) REFERENCES quote.post(id);


--
-- Name: SCHEMA humor; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA humor TO kalkal;


--
-- Name: SCHEMA quote; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA quote TO kalkal;


--
-- Name: FUNCTION update_updated_at(); Type: ACL; Schema: humor; Owner: -
--

GRANT ALL ON FUNCTION humor.update_updated_at() TO kalkal;


--
-- Name: FUNCTION update_updated_at(); Type: ACL; Schema: quote; Owner: -
--

GRANT ALL ON FUNCTION quote.update_updated_at() TO kalkal;


--
-- Name: TABLE comment; Type: ACL; Schema: humor; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE humor.comment TO kalkal;


--
-- Name: SEQUENCE comment_id_seq; Type: ACL; Schema: humor; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE humor.comment_id_seq TO kalkal;


--
-- Name: TABLE post; Type: ACL; Schema: humor; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE humor.post TO kalkal;


--
-- Name: SEQUENCE post_id_seq; Type: ACL; Schema: humor; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE humor.post_id_seq TO kalkal;


--
-- Name: TABLE comment; Type: ACL; Schema: quote; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE quote.comment TO kalkal;


--
-- Name: SEQUENCE comment_id_seq; Type: ACL; Schema: quote; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE quote.comment_id_seq TO kalkal;


--
-- Name: TABLE post; Type: ACL; Schema: quote; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE quote.post TO kalkal;


--
-- Name: SEQUENCE post_id_seq; Type: ACL; Schema: quote; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE quote.post_id_seq TO kalkal;


--
-- PostgreSQL database dump complete
--

