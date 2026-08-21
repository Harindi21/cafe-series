CREATE TABLE site_content (
    id UUID PRIMARY KEY,
    brand_name VARCHAR(120) NOT NULL,
    tagline VARCHAR(240) NOT NULL,
    hero_note VARCHAR(300) NOT NULL,
    menu_note VARCHAR(300) NOT NULL,
    about_title VARCHAR(160) NOT NULL,
    version BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE site_about_paragraph (
    id UUID PRIMARY KEY,
    site_content_id UUID NOT NULL
        REFERENCES site_content(id) ON DELETE CASCADE,
    body VARCHAR(2000) NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0 CHECK (sort_order >= 0),
    active BOOLEAN NOT NULL DEFAULT TRUE,
    version BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_site_about_paragraph_public_order
    ON site_about_paragraph(site_content_id, active, sort_order);

CREATE TABLE site_feature (
    id UUID PRIMARY KEY,
    site_content_id UUID NOT NULL
        REFERENCES site_content(id) ON DELETE CASCADE,
    icon VARCHAR(32) NOT NULL DEFAULT '',
    title VARCHAR(120) NOT NULL,
    text VARCHAR(500) NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0 CHECK (sort_order >= 0),
    active BOOLEAN NOT NULL DEFAULT TRUE,
    version BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_site_feature_public_order
    ON site_feature(site_content_id, active, sort_order);

CREATE TABLE contact_profile (
    id UUID PRIMARY KEY,
    address VARCHAR(500) NOT NULL,
    phone VARCHAR(80) NOT NULL,
    email VARCHAR(320) NOT NULL,
    map_embed_url VARCHAR(1000) NOT NULL,
    whatsapp_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    whatsapp_number_e164 VARCHAR(32),
    whatsapp_prefill VARCHAR(500) NOT NULL DEFAULT '',
    version BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT ck_contact_whatsapp_number
        CHECK (
            whatsapp_enabled = FALSE
            OR whatsapp_number_e164 IS NOT NULL
        )
);

CREATE TABLE opening_hour (
    id UUID PRIMARY KEY,
    contact_profile_id UUID NOT NULL
        REFERENCES contact_profile(id) ON DELETE CASCADE,
    day_label VARCHAR(120) NOT NULL,
    time_label VARCHAR(120) NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0 CHECK (sort_order >= 0),
    active BOOLEAN NOT NULL DEFAULT TRUE,
    version BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_opening_hour_public_order
    ON opening_hour(contact_profile_id, active, sort_order);

CREATE TABLE social_link (
    id UUID PRIMARY KEY,
    contact_profile_id UUID NOT NULL
        REFERENCES contact_profile(id) ON DELETE CASCADE,
    platform VARCHAR(40) NOT NULL,
    url VARCHAR(1000) NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0 CHECK (sort_order >= 0),
    active BOOLEAN NOT NULL DEFAULT TRUE,
    version BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT uq_social_link_platform
        UNIQUE (contact_profile_id, platform)
);

CREATE INDEX idx_social_link_public_order
    ON social_link(contact_profile_id, active, sort_order);