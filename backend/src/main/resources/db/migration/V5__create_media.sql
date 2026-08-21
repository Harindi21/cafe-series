CREATE TABLE media_asset (
    id UUID PRIMARY KEY,

    object_key VARCHAR(500) NOT NULL UNIQUE,

    original_filename VARCHAR(255) NOT NULL,

    content_type VARCHAR(100) NOT NULL,

    size_bytes BIGINT NOT NULL
        CHECK (size_bytes > 0),

    purpose VARCHAR(40) NOT NULL,

    alt_text VARCHAR(300) NOT NULL DEFAULT '',

    sort_order INTEGER NOT NULL DEFAULT 0
        CHECK (sort_order >= 0),

    active BOOLEAN NOT NULL DEFAULT TRUE,

    version BIGINT NOT NULL DEFAULT 0,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT ck_media_asset_purpose
        CHECK (
            purpose IN (
                'HERO',
                'ABOUT',
                'GALLERY'
            )
        )
);

CREATE INDEX idx_media_asset_public_order
    ON media_asset(purpose, active, sort_order);