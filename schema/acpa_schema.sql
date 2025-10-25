--
-- PostgreSQL database dump
--

\restrict W4g0T0bs6jqC2nRBWcqfm1CQzQahrufpShIhwJZfjxzKVp3PtFyBEdkWg1FAqwM

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: action; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.action AS ENUM (
    'insert',
    'update',
    'delete'
);


ALTER TYPE public.action OWNER TO postgres;

--
-- Name: visibility; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.visibility AS ENUM (
    'hidden',
    'archived',
    'show'
);


ALTER TYPE public.visibility OWNER TO postgres;

--
-- Name: connect_role_on_new_account(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.connect_role_on_new_account() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
INSERT INTO account_roles(account_id, role_id)
VALUES (NEW.account_id, (SELECT role_id FROM roles WHERE role_name = '"student"'));
RETURN NEW;
END;
$$;


ALTER FUNCTION public.connect_role_on_new_account() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: account_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account_roles (
    account_id uuid,
    role_id integer NOT NULL
);


ALTER TABLE public.account_roles OWNER TO postgres;

--
-- Name: account_roles_role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.account_roles_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.account_roles_role_id_seq OWNER TO postgres;

--
-- Name: account_roles_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.account_roles_role_id_seq OWNED BY public.account_roles.role_id;


--
-- Name: accounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.accounts (
    account_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    password character varying(64) NOT NULL,
    email character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.accounts OWNER TO postgres;

--
-- Name: audit_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.audit_logs (
    logs_id integer NOT NULL,
    table_name character varying(100) NOT NULL,
    action public.action NOT NULL,
    changed_at timestamp without time zone DEFAULT now(),
    changed_by character varying(255)
);


ALTER TABLE public.audit_logs OWNER TO postgres;

--
-- Name: audit_logs_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.audit_logs_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.audit_logs_logs_id_seq OWNER TO postgres;

--
-- Name: audit_logs_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.audit_logs_logs_id_seq OWNED BY public.audit_logs.logs_id;


--
-- Name: career_metrics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.career_metrics (
    career_id integer NOT NULL,
    metric_id integer NOT NULL,
    score_bias numeric(5,4),
    CONSTRAINT career_metrics_score_bias_check CHECK (((score_bias >= (0)::numeric) AND (score_bias <= (1)::numeric)))
);


ALTER TABLE public.career_metrics OWNER TO postgres;

--
-- Name: career_metrics_career_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.career_metrics_career_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.career_metrics_career_id_seq OWNER TO postgres;

--
-- Name: career_metrics_career_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.career_metrics_career_id_seq OWNED BY public.career_metrics.career_id;


--
-- Name: career_metrics_metric_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.career_metrics_metric_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.career_metrics_metric_id_seq OWNER TO postgres;

--
-- Name: career_metrics_metric_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.career_metrics_metric_id_seq OWNED BY public.career_metrics.metric_id;


--
-- Name: careers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.careers (
    career_id integer NOT NULL,
    description character varying(255) NOT NULL,
    recommended numeric(9,0) DEFAULT 0,
    career_name character varying(200) NOT NULL
);


ALTER TABLE public.careers OWNER TO postgres;

--
-- Name: careers_career_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.careers_career_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.careers_career_id_seq OWNER TO postgres;

--
-- Name: careers_career_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.careers_career_id_seq OWNED BY public.careers.career_id;


--
-- Name: exam_lists; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exam_lists (
    exam_id uuid,
    section_id uuid
);


ALTER TABLE public.exam_lists OWNER TO postgres;

--
-- Name: exams; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exams (
    exam_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    exam_name character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    is_visible public.visibility DEFAULT 'hidden'::public.visibility,
    attempts_allowed numeric(5,0)
);


ALTER TABLE public.exams OWNER TO postgres;

--
-- Name: metrics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.metrics (
    metric_id integer NOT NULL,
    metric_name character varying(100) NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.metrics OWNER TO postgres;

--
-- Name: metrics_metric_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.metrics_metric_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.metrics_metric_id_seq OWNER TO postgres;

--
-- Name: metrics_metric_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.metrics_metric_id_seq OWNED BY public.metrics.metric_id;


--
-- Name: performances; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.performances (
    performance_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    account_id uuid,
    exam_id uuid,
    date_taken timestamp without time zone NOT NULL,
    metadata jsonb NOT NULL
);


ALTER TABLE public.performances OWNER TO postgres;

--
-- Name: questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.questions (
    question_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    content jsonb NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    question_name character varying(255) NOT NULL
);


ALTER TABLE public.questions OWNER TO postgres;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    role_id integer NOT NULL,
    role_name character varying(30) NOT NULL,
    access_level integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_role_id_seq OWNER TO postgres;

--
-- Name: roles_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_role_id_seq OWNED BY public.roles.role_id;


--
-- Name: section_assigments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.section_assigments (
    section_id uuid,
    question_id uuid
);


ALTER TABLE public.section_assigments OWNER TO postgres;

--
-- Name: sections; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sections (
    section_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    section_name character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    description character varying(255)
);


ALTER TABLE public.sections OWNER TO postgres;

--
-- Name: subject_metrics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subject_metrics (
    subject_id integer NOT NULL,
    metric_id integer NOT NULL,
    score_bias numeric(5,4),
    CONSTRAINT subject_metrics_score_bias_check CHECK (((score_bias >= (0)::numeric) AND (score_bias <= (1)::numeric)))
);


ALTER TABLE public.subject_metrics OWNER TO postgres;

--
-- Name: subject_metrics_metric_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subject_metrics_metric_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.subject_metrics_metric_id_seq OWNER TO postgres;

--
-- Name: subject_metrics_metric_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subject_metrics_metric_id_seq OWNED BY public.subject_metrics.metric_id;


--
-- Name: subject_metrics_subject_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subject_metrics_subject_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.subject_metrics_subject_id_seq OWNER TO postgres;

--
-- Name: subject_metrics_subject_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subject_metrics_subject_id_seq OWNED BY public.subject_metrics.subject_id;


--
-- Name: subjects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subjects (
    subject_id integer NOT NULL,
    subject_name character varying(100)
);


ALTER TABLE public.subjects OWNER TO postgres;

--
-- Name: subjects_subject_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subjects_subject_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.subjects_subject_id_seq OWNER TO postgres;

--
-- Name: subjects_subject_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subjects_subject_id_seq OWNED BY public.subjects.subject_id;


--
-- Name: account_roles role_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_roles ALTER COLUMN role_id SET DEFAULT nextval('public.account_roles_role_id_seq'::regclass);


--
-- Name: audit_logs logs_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_logs ALTER COLUMN logs_id SET DEFAULT nextval('public.audit_logs_logs_id_seq'::regclass);


--
-- Name: career_metrics career_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.career_metrics ALTER COLUMN career_id SET DEFAULT nextval('public.career_metrics_career_id_seq'::regclass);


--
-- Name: career_metrics metric_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.career_metrics ALTER COLUMN metric_id SET DEFAULT nextval('public.career_metrics_metric_id_seq'::regclass);


--
-- Name: careers career_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.careers ALTER COLUMN career_id SET DEFAULT nextval('public.careers_career_id_seq'::regclass);


--
-- Name: metrics metric_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metrics ALTER COLUMN metric_id SET DEFAULT nextval('public.metrics_metric_id_seq'::regclass);


--
-- Name: roles role_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN role_id SET DEFAULT nextval('public.roles_role_id_seq'::regclass);


--
-- Name: subject_metrics subject_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subject_metrics ALTER COLUMN subject_id SET DEFAULT nextval('public.subject_metrics_subject_id_seq'::regclass);


--
-- Name: subject_metrics metric_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subject_metrics ALTER COLUMN metric_id SET DEFAULT nextval('public.subject_metrics_metric_id_seq'::regclass);


--
-- Name: subjects subject_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subjects ALTER COLUMN subject_id SET DEFAULT nextval('public.subjects_subject_id_seq'::regclass);


--
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (account_id);


--
-- Name: audit_logs audit_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_pkey PRIMARY KEY (logs_id);


--
-- Name: careers careers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.careers
    ADD CONSTRAINT careers_pkey PRIMARY KEY (career_id);


--
-- Name: exams exams_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exams
    ADD CONSTRAINT exams_pkey PRIMARY KEY (exam_id);


--
-- Name: metrics metrics_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metrics
    ADD CONSTRAINT metrics_pkey PRIMARY KEY (metric_id);


--
-- Name: performances performances_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.performances
    ADD CONSTRAINT performances_pkey PRIMARY KEY (performance_id);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (question_id);


--
-- Name: questions questions_question_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_question_name_key UNIQUE (question_name);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role_id);


--
-- Name: sections sections_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sections
    ADD CONSTRAINT sections_pkey PRIMARY KEY (section_id);


--
-- Name: subjects subjects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT subjects_pkey PRIMARY KEY (subject_id);


--
-- Name: accounts after_account_insert; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER after_account_insert AFTER INSERT ON public.accounts FOR EACH ROW EXECUTE FUNCTION public.connect_role_on_new_account();


--
-- Name: account_roles account_roles_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_roles
    ADD CONSTRAINT account_roles_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.accounts(account_id) ON DELETE CASCADE;


--
-- Name: account_roles account_roles_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_roles
    ADD CONSTRAINT account_roles_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(role_id);


--
-- Name: career_metrics career_metrics_career_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.career_metrics
    ADD CONSTRAINT career_metrics_career_id_fkey FOREIGN KEY (career_id) REFERENCES public.careers(career_id);


--
-- Name: career_metrics career_metrics_metric_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.career_metrics
    ADD CONSTRAINT career_metrics_metric_id_fkey FOREIGN KEY (metric_id) REFERENCES public.metrics(metric_id);


--
-- Name: exam_lists exam_lists_exam_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exam_lists
    ADD CONSTRAINT exam_lists_exam_id_fkey FOREIGN KEY (exam_id) REFERENCES public.exams(exam_id);


--
-- Name: exam_lists exam_lists_section_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exam_lists
    ADD CONSTRAINT exam_lists_section_id_fkey FOREIGN KEY (section_id) REFERENCES public.sections(section_id);


--
-- Name: performances fk_performances; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.performances
    ADD CONSTRAINT fk_performances FOREIGN KEY (account_id) REFERENCES public.accounts(account_id);


--
-- Name: section_assigments section_assigments_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.section_assigments
    ADD CONSTRAINT section_assigments_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.questions(question_id) ON DELETE CASCADE;


--
-- Name: section_assigments section_assigments_section_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.section_assigments
    ADD CONSTRAINT section_assigments_section_id_fkey FOREIGN KEY (section_id) REFERENCES public.sections(section_id) ON DELETE CASCADE;


--
-- Name: subject_metrics subject_metrics_metric_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subject_metrics
    ADD CONSTRAINT subject_metrics_metric_id_fkey FOREIGN KEY (metric_id) REFERENCES public.metrics(metric_id);


--
-- Name: subject_metrics subject_metrics_subject_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subject_metrics
    ADD CONSTRAINT subject_metrics_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES public.subjects(subject_id);


--
-- PostgreSQL database dump complete
--

\unrestrict W4g0T0bs6jqC2nRBWcqfm1CQzQahrufpShIhwJZfjxzKVp3PtFyBEdkWg1FAqwM

